// ─── Denti Conversation Engine ────────────────────────────────────────────────
import { detectIntent, RRDCH } from "./dentiKnowledge";
import { DOCTORS, Doctor } from "@/data/doctors";
import { TimeSlot } from "@/data/slots";
import { Appointment } from "@/data/appointments";

// ── State Machine ─────────────────────────────────────────────────────────────
export type ConvStep =
  | "idle"
  | "booking:dept"
  | "booking:doctor"
  | "booking:slot"
  | "booking:name"
  | "booking:phone"
  | "booking:complaint"
  | "status:input";

export interface ConvState {
  step: ConvStep;
  booking: {
    dept?: string;
    doctor?: Doctor;
    slot?: TimeSlot;
    name?: string;
    phone?: string;
  };
}

export const INITIAL_CONV_STATE: ConvState = { step: "idle", booking: {} };

// ── Message Types ─────────────────────────────────────────────────────────────
export interface BookingConfirmation {
  token: string;
  patientName: string;
  phone: string;
  doctorName: string;
  department: string;
  date: string;
  displayTime: string;
  complaint: string;
}

export type MessageExtra =
  | { type: "quickReplies"; replies: string[] }
  | { type: "doctorList"; doctors: Doctor[] }
  | { type: "slotGrid"; slots: TimeSlot[]; doctor: Doctor }
  | { type: "confirmation"; booking: BookingConfirmation }
  | { type: "statusResult"; appointment: Appointment | null; token: string };

export interface DentiMessage {
  id: string;
  from: "denti" | "user";
  text: string;
  extra?: MessageExtra;
  time: Date;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function dentiMsg(text: string, extra?: MessageExtra): DentiMessage {
  return { id: uid(), from: "denti", text, extra, time: new Date() };
}

function generateToken(): string {
  const datePart = new Date().toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `RRDCH-${datePart}-${rand}`;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDoctorsForDept(dept: string): Doctor[] {
  const q = dept.trim().toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  return DOCTORS.filter((d) => {
    const dn = d.department.toLowerCase();
    const sn = d.specialty.toLowerCase();
    if (dn.includes(q) || sn.includes(q)) return true;
    if (words.length > 0 && words.every((w) => dn.includes(w) || sn.includes(w)))
      return true;
    return false;
  });
}

function getOpenSlots(slots: TimeSlot[], doctorId: string): TimeSlot[] {
  return slots.filter((s) => s.doctorId === doctorId && s.status === "Open");
}

// ── Department quick-reply labels ─────────────────────────────────────────────
export const DEPT_QUICK_REPLIES = [
  "Oral Medicine",
  "Oral Surgery",
  "Orthodontics",
  "Prosthodontics",
  "Periodontics",
  "Conservative Dentistry",
  "Pedodontics",
  "Oral Pathology",
  "Public Health Dentistry",
];

// ── Engine ────────────────────────────────────────────────────────────────────
export interface ProcessResult {
  messages: DentiMessage[];
  newState: ConvState;
  newAppointment?: Appointment;
  bookedSlotId?: string;
}

export function processUserInput(
  input: string,
  state: ConvState,
  slots: TimeSlot[],
  appointments: Appointment[]
): ProcessResult {
  const trimmed = input.trim();

  // Universal cancel
  if (/^(cancel|stop|reset|start\s*over|go\s*back|main\s*menu|restart)\b/i.test(trimmed)) {
    return {
      messages: [
        dentiMsg("No problem! I've reset our conversation. What else can I help you with? 😊", {
          type: "quickReplies",
          replies: ["Book Appointment", "Check Status", "Departments", "OPD Hours", "Contact Us"],
        }),
      ],
      newState: INITIAL_CONV_STATE,
    };
  }

  // ── Booking flow ────────────────────────────────────────────────────────────
  if (state.step === "booking:dept") {
    const dept = trimmed;
    const doctors = getDoctorsForDept(dept);
    if (doctors.length === 0) {
      return {
        messages: [
          dentiMsg(
            `I couldn't find doctors for **"${dept}"**. Please pick a department from below:`,
            { type: "quickReplies", replies: DEPT_QUICK_REPLIES }
          ),
        ],
        newState: state,
      };
    }
    return {
      messages: [
        dentiMsg(`Great! Here are the doctors available in **${dept}**. Tap one to select:`, {
          type: "doctorList",
          doctors,
        }),
      ],
      newState: { step: "booking:doctor", booking: { dept } },
    };
  }

  if (state.step === "booking:doctor") {
    const doctor =
      DOCTORS.find((d) => d.id === trimmed) ||
      DOCTORS.find((d) => d.name.toLowerCase() === trimmed.toLowerCase());
    if (!doctor) {
      return {
        messages: [dentiMsg("Please tap a doctor card above to select.")],
        newState: state,
      };
    }
    const openSlots = getOpenSlots(slots, doctor.id);
    if (openSlots.length === 0) {
      const deptDoctors = getDoctorsForDept(state.booking.dept || "");
      return {
        messages: [
          dentiMsg(
            `Sorry, **${doctor.name}** has no open slots today. Would you like to choose a different doctor?`,
            { type: "doctorList", doctors: deptDoctors.filter((d) => d.id !== doctor.id) }
          ),
        ],
        newState: { step: "booking:doctor", booking: state.booking },
      };
    }
    return {
      messages: [
        dentiMsg(`Here are today's open slots for **${doctor.name}**. Pick a time:`, {
          type: "slotGrid",
          slots: openSlots,
          doctor,
        }),
      ],
      newState: { step: "booking:slot", booking: { ...state.booking, doctor } },
    };
  }

  if (state.step === "booking:slot") {
    const slot = slots.find((s) => s.id === trimmed);
    if (!slot) {
      return {
        messages: [dentiMsg("Please tap a time slot from the grid above.")],
        newState: state,
      };
    }
    return {
      messages: [dentiMsg("Almost there! What's your **full name**? 📝")],
      newState: { step: "booking:name", booking: { ...state.booking, slot } },
    };
  }

  if (state.step === "booking:name") {
    if (trimmed.length < 2) {
      return {
        messages: [dentiMsg("Please enter your full name (at least 2 characters).")],
        newState: state,
      };
    }
    return {
      messages: [
        dentiMsg(`Nice to meet you, **${trimmed}**! 📱 Now please share your **mobile number**:`),
      ],
      newState: { step: "booking:phone", booking: { ...state.booking, name: trimmed } },
    };
  }

  if (state.step === "booking:phone") {
    const clean = trimmed.replace(/[\s\-\(\)+]/g, "");
    if (!/^(91)?[6-9]\d{9}$/.test(clean)) {
      return {
        messages: [
          dentiMsg("Please enter a valid 10-digit Indian mobile number (e.g., 98765 43210)."),
        ],
        newState: state,
      };
    }
    return {
      messages: [
        dentiMsg(
          "📋 Any specific **complaint or reason** for your visit?\n(Type **'None'** if it's a general checkup)"
        ),
      ],
      newState: { step: "booking:complaint", booking: { ...state.booking, phone: trimmed } },
    };
  }

  if (state.step === "booking:complaint") {
    const { doctor, slot, name, phone } = state.booking;
    if (!doctor || !slot || !name || !phone) {
      return {
        messages: [
          dentiMsg("Oops, something went wrong. Let's start over!", {
            type: "quickReplies",
            replies: ["Book Appointment"],
          }),
        ],
        newState: INITIAL_CONV_STATE,
      };
    }

    const complaint =
      !trimmed || trimmed.toLowerCase() === "none" ? "General Checkup" : trimmed;
    const token = generateToken();
    const today = new Date();

    const confirmation: BookingConfirmation = {
      token,
      patientName: name,
      phone,
      doctorName: doctor.name,
      department: doctor.department,
      date: formatDate(today),
      displayTime: slot.displayTime,
      complaint,
    };

    const newAppointment: Appointment = {
      id: `apt-${uid()}`,
      tokenId: token,
      patientName: name,
      patientPhone: phone,
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department,
      date: today.toISOString().split("T")[0],
      time: slot.time,
      displayTime: slot.displayTime,
      status: "Confirmed",
      complaint,
    };

    return {
      messages: [
        dentiMsg("🎉 Your appointment is **confirmed**! Here's your summary:", {
          type: "confirmation",
          booking: confirmation,
        }),
        dentiMsg("**Save your token number** and arrive 10 minutes early. See you soon! 😊", {
          type: "quickReplies",
          replies: ["Book Another Appointment", "Check Status", "Main Menu"],
        }),
      ],
      newState: INITIAL_CONV_STATE,
      newAppointment,
      bookedSlotId: slot.id,
    };
  }

  if (state.step === "status:input") {
    const token = trimmed.toUpperCase();
    const found = appointments.find((a) => a.tokenId.toUpperCase() === token);
    return {
      messages: [
        dentiMsg(
          found
            ? `Here are the details for **${token}**:`
            : `No appointment found for token **${token}**. Please double-check and try again.`,
          { type: "statusResult", appointment: found ?? null, token }
        ),
        dentiMsg("Anything else I can help you with?", {
          type: "quickReplies",
          replies: ["Book Appointment", "Check Another Status", "Main Menu"],
        }),
      ],
      newState: INITIAL_CONV_STATE,
    };
  }

  // ── Idle — intent detection ─────────────────────────────────────────────────
  const intent = detectIntent(trimmed);

  switch (intent) {
    case "greeting":
      return {
        messages: [
          dentiMsg("Hello! 😊 Great to see you. How can I help you today?", {
            type: "quickReplies",
            replies: ["Book Appointment", "Check Status", "Departments", "OPD Hours", "Contact Us", "Courses"],
          }),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "farewell":
      return {
        messages: [
          dentiMsg(
            "Thank you for chatting with Denti! 🦷 Take care of your dental health. Goodbye! 👋"
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "help":
      return {
        messages: [
          dentiMsg("Here's everything I can help you with:", {
            type: "quickReplies",
            replies: [
              "Book Appointment",
              "Check Status",
              "Departments",
              "OPD Hours",
              "Location",
              "Contact Us",
              "Courses",
              "Fees",
              "Emergency",
            ],
          }),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "book_appointment":
      return {
        messages: [
          dentiMsg(
            "Sure! Let's get you an appointment. 📅\nWhich **department** would you like to visit?",
            { type: "quickReplies", replies: DEPT_QUICK_REPLIES }
          ),
        ],
        newState: { step: "booking:dept", booking: {} },
      };

    case "check_status":
      return {
        messages: [
          dentiMsg(
            "Sure! Please enter your **appointment token number**:\n(e.g., RRDCH-20260416-1234)"
          ),
        ],
        newState: { step: "status:input", booking: {} },
      };

    case "about":
      return {
        messages: [
          dentiMsg(
            `**${RRDCH.name}** (RRDCH) is a premier dental institution established in **${RRDCH.established}**, located in Bengaluru.\n\nAffiliated with **${RRDCH.affiliation}** and recognized by the **${RRDCH.recognition}**.\n\nWe operate **9 specialized departments** and are proud holders of: ${RRDCH.accreditations.join(", ")}.`,
            {
              type: "quickReplies",
              replies: ["View Departments", "Courses Offered", "OPD Hours", "Location"],
            }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "hours":
      return {
        messages: [
          dentiMsg(
            `⏰ **OPD Timings**\n${RRDCH.opdHours}\n\n🚨 **Emergency**\n${RRDCH.emergency}`,
            { type: "quickReplies", replies: ["Book Appointment", "Location", "Contact Us"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "location":
      return {
        messages: [
          dentiMsg(
            `📍 **RRDCH Address**\n${RRDCH.address}\n\n🗺️ We are on **Mysore Road**, easily accessible from all parts of Bengaluru.\n\n[Open in Maps →](https://maps.google.com/?q=RajaRajeswari+Dental+College+Hospital+Bengaluru)`,
            { type: "quickReplies", replies: ["Book Appointment", "Contact Us", "OPD Hours"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "contact":
      return {
        messages: [
          dentiMsg(
            `📞 **Phone**: ${RRDCH.phone}\n\n📧 **Email**: ${RRDCH.email}\n\n🌐 **Website**: ${RRDCH.website}`,
            { type: "quickReplies", replies: ["Book Appointment", "Location", "OPD Hours"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "departments":
      return {
        messages: [
          dentiMsg(
            `🦷 **RRDCH has 9 specialized departments:**\n\n${RRDCH.departments.map((d, i) => `**${i + 1}.** ${d}`).join("\n")}`,
            { type: "quickReplies", replies: ["Book Appointment", "About RRDCH", "Courses"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "courses":
      return {
        messages: [
          dentiMsg(
            `🎓 **Courses offered at RRDCH:**\n\n${RRDCH.courses.map((c) => `• ${c}`).join("\n")}\n\nAdmissions are through **NEET-UG/PG** as per RGUHS norms.`,
            {
              type: "quickReplies",
              replies: ["Book Appointment", "Contact Us", "About RRDCH"],
            }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "fees":
      return {
        messages: [
          dentiMsg(`💰 **Fee Information**\n${RRDCH.fees}`, {
            type: "quickReplies",
            replies: ["Book Appointment", "Contact Us"],
          }),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "emergency":
      return {
        messages: [
          dentiMsg(
            `🚨 **Emergency Dental Care** is available **24/7**!\n\nPlease call us immediately:\n📞 **${RRDCH.phone.split("/")[0].trim()}**\n\n📍 Head directly to our Emergency Department:\n${RRDCH.address}`,
            { type: "quickReplies", replies: ["Get Directions", "Contact Us"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    default:
      return {
        messages: [
          dentiMsg(
            "Hmm, I didn't quite catch that. 🤔 Could you rephrase, or choose from below?",
            {
              type: "quickReplies",
              replies: ["Book Appointment", "Check Status", "Departments", "OPD Hours", "Help"],
            }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };
  }
}

// ── Welcome ────────────────────────────────────────────────────────────────────
export function getWelcomeMessages(): DentiMessage[] {
  return [
    dentiMsg(
      "Hi! 👋 I'm **Denti**, your personal RRDCH dental assistant.\n\nI can help you **book appointments**, **check status**, answer questions about **departments**, **timings**, and more!",
      {
        type: "quickReplies",
        replies: ["Book Appointment", "Check Status", "Departments", "OPD Hours", "About RRDCH"],
      }
    ),
  ];
}
