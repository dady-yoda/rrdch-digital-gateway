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
  | "status:input"
  | "cancel:input";

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

const KN_DICT: Record<string, string> = {
  "Book Appointment": "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
  "Check Status": "ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
  "Departments": "ವಿಭಾಗಗಳು",
  "OPD Hours": "OPD ಸಮಯ",
  "Contact Us": "ಸಂಪರ್ಕಿಸಿ",
  "Courses": "ಕೋರ್ಸ್‌ಗಳು",
  "Fees": "ಶುಲ್ಕ",
  "Emergency": "ತುರ್ತು",
  "Location": "ಸ್ಥಳ",
  "Main Menu": "ಮುಖ್ಯ ಮೆನು",
  "Book Another Appointment": "ಮತ್ತೊಂದು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
  "Check Another Status": "ಮತ್ತೊಂದು ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
  "View Departments": "ವಿಭಾಗಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
  "Courses Offered": "ನೀಡುವ ಕೋರ್ಸ್‌ಗಳು",
  "Oral Medicine": "ಬಾಯಿಯ ಔಷಧ",
  "Oral Surgery": "ಬಾಯಿಯ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
  "Orthodontics": "ಆರ್ಥೊಡಾಂಟಿಕ್ಸ್",
  "Prosthodontics": "ಪ್ರೋಸ್ಟೊಡಾಂಟಿಕ್ಸ್",
  "Periodontics": "ಪೆರಿಯೊಡಾಂಟಿಕ್ಸ್",
  "Conservative Dentistry": "ಸಂಪ್ರದಾಯವಾದಿ ದಂತವೈದ್ಯಶಾಸ್ತ್ರ",
  "Pedodontics": "ಪೆಡೋಡಾಂಟಿಕ್ಸ್",
  "Oral Pathology": "ಬಾಯಿಯ ರೋಗಶಾಸ್ತ್ರ",
  "Public Health Dentistry": "ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ದಂತವೈದ್ಯಶಾಸ್ತ್ರ",
  "No problem! I've reset our conversation. What else can I help you with? 😊": "ಯಾವ ತೊಂದರೆಯಿಲ್ಲ! ಸಂಭಾಷಣೆಯನ್ನು ಮರುಹೊಂದಿಸಿದ್ದೇನೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? 😊",
  "Please tap a doctor card above to select.": "ಆಯ್ಕೆ ಮಾಡಲು ದಯವಿಟ್ಟು ಮೇಲಿನ ವೈದ್ಯರ ಕಾರ್ಡ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ.",
  "Please tap a time slot from the grid above.": "ದಯವಿಟ್ಟು ಮೇಲಿನ ಗ್ರಿಡ್‌ನಿಂದ ಸಮಯದ ಸ್ಲಾಟ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ.",
  "Almost there! What's your **full name**? 📝": "ಬಹುತೇಕ ಮುಗಿದಿದೆ! ನಿಮ್ಮ **ಪೂರ್ಣ ಹೆಸರು** ಏನು? 📝",
  "Please enter your full name (at least 2 characters).": "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ (ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳು).",
  "Please enter a valid 10-digit Indian mobile number (e.g., 98765 43210).": "ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ 10-ಅಂಕಿಯ ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
  "📋 Any specific **complaint or reason** for your visit?\n(Type **'None'** if it's a general checkup)": "📋 ನಿಮ್ಮ ಭೇಟಿಗೆ ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ **ದೂರು ಅಥವಾ ಕಾರಣ** ಇದೆಯೇ?\n(ಸಾಮಾನ್ಯ ತಪಾಸಣೆಯಾಗಿದ್ದರೆ **'None'** ಎಂದು ಟೈಪ್ ಮಾಡಿ)",
  "Oops, something went wrong. Let's start over!": "ಕ್ಷಮಿಸಿ, ಏನೋ ತಪ್ಪಾಗಿದೆ. ಮೊದಲಿನಿಂದ ಪ್ರಾರಂಭಿಸೋಣ!",
  "🎉 Your appointment is **confirmed**! Here's your summary:": "🎉 ನಿಮ್ಮ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ **ಖಚಿತವಾಗಿದೆ**! ನಿಮ್ಮ ಸಾರಾಂಶ ಇಲ್ಲಿದೆ:",
  "**Save your token number** and arrive 10 minutes early. See you soon! 😊": "**ನಿಮ್ಮ ಟೋಕನ್ ಸಂಖ್ಯೆಯನ್ನು ಉಳಿಸಿ** ಮತ್ತು 10 ನಿಮಿಷ ಮುಂಚಿತವಾಗಿ ಬನ್ನಿ. ಶೀಘ್ರದಲ್ಲೇ ಭೇಟಿಯಾಗೋಣ! 😊",
  "Anything else I can help you with?": "ನಾನು ನಿಮಗೆ ಬೇರೆ ಏನಾದರೂ ಸಹಾಯ ಮಾಡಬಹುದೇ?",
  "Hello! 😊 Great to see you. How can I help you today?": "ನಮಸ್ಕಾರ! 😊 ನಿಮ್ಮನ್ನು ನೋಡಿ ಸಂತೋಷವಾಯಿತು. ನಾನು ನಿಮಗೆ ಇಂದು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  "Thank you for chatting with Denti! 🦷 Take care of your dental health. Goodbye! 👋": "ಡೆಂಟಿ ಜೊತೆ ಚಾಟ್ ಮಾಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು! 🦷 ನಿಮ್ಮ ಹಲ್ಲಿನ ಆರೋಗ್ಯವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ. ವಿದಾಯ! 👋",
  "Here's everything I can help you with:": "ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಹುದಾದ ಎಲ್ಲವೂ ಇಲ್ಲಿದೆ:",
  "Sure! Let's get you an appointment. 📅\nWhich **department** would you like to visit?": "ಖಂಡಿತ! ನಿಮಗೆ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ನೀಡೋಣ. 📅\nನೀವು ಯಾವ **ವಿಭಾಗ**ಕ್ಕೆ ಭೇಟಿ ನೀಡಲು ಬಯಸುತ್ತೀರಿ?",
  "Sure! Please enter your **appointment token number**:\n(e.g., RRDCH-20260416-1234)": "ಖಂಡಿತ! ದಯವಿಟ್ಟು ನಿಮ್ಮ **ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಟೋಕನ್ ಸಂಖ್ಯೆ**ಯನ್ನು ನಮೂದಿಸಿ:\n(ಉದಾ: RRDCH-20260416-1234)",
  "I can help you cancel your appointment. Please enter your **Token ID** (e.g., RRDCH-...):": "ನಿಮ್ಮ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಅನ್ನು ರದ್ದುಗೊಳಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡಬಹುದು. ದಯವಿಟ್ಟು ನಿಮ್ಮ **ಟೋಕನ್ ಐಡಿ** ನಮೂದಿಸಿ (ಉದಾ: RRDCH-...):",
  "Hi! 👋 I'm **Denti**, your personal RRDCH dental assistant.\n\nI can help you **book appointments**, **check status**, answer questions about **departments**, **timings**, and more!": "ನಮಸ್ಕಾರ! 👋 ನಾನು **ಡೆಂಟಿ**, ನಿಮ್ಮ ವೈಯಕ್ತಿಕ RRDCH ದಂತ ಸಹಾಯಕ.\n\nಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು, ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಲು ಮತ್ತು ವಿಭಾಗಗಳ ಬಗ್ಗೆ ಉತ್ತರಿಸಲು ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ!",
  "Hmm, I didn't quite catch that. 🤔 Could you rephrase, or choose from below?": "ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. 🤔 ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಕೇಳಬಹುದೇ, ಅಥವಾ ಕೆಳಗಿನಿಂದ ಆಯ್ಕೆ ಮಾಡಬಹುದೇ?",
  "About RRDCH": "RRDCH ಬಗ್ಗೆ",
  "Get Directions": "ನಿರ್ದೇಶನಗಳನ್ನು ಪಡೆಯಿರಿ",
  "Help": "ಸಹಾಯ",
  "I'm having trouble thinking right now. Please try again in a moment, or use the quick-reply buttons!": "ನಮಗೆ ಈಗ ಯೋಚಿಸಲು ತೊಂದರೆಯಾಗುತ್ತಿದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ತ್ವರಿತ-ಪ್ರತ್ಯುತ್ತರ ಬಟನ್‌ಗಳನ್ನು ಬಳಸಿ!",
  "I'm sorry, I couldn't generate a response. Please try again!": "ಕ್ಷಮಿಸಿ, ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ರಚಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!",
  "Sorry, I had trouble processing that. Please try again!": "ಕ್ಷಮಿಸಿ, ಅದನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು ತೊಂದರೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!",
  "I'm having trouble connecting right now. Please try the quick-reply buttons, or contact us at": "ನನಗೆ ಈಗ ಸಂಪರ್ಕಿಸಲು ತೊಂದರೆಯಾಗುತ್ತಿದೆ. ದಯವಿಟ್ಟು ತ್ವರಿತ-ಪ್ರತ್ಯುತ್ತರ ಬಟನ್‌ಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಇಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ",
};

export function translateText(text: string, lang: string): string {
  if (lang !== "kn-IN") return text;
  
  // Exact matches
  if (KN_DICT[text]) return KN_DICT[text];

  // Dynamic content handling
  if (text.startsWith("I couldn't find doctors for")) {
    const dept = text.split("**\"")[1]?.split("\"**")[0] || "";
    return `ನಮಗೆ ವೈದ್ಯರು ಕಂಡುಬಂದಿಲ್ಲ **"${dept}"**. ದಯವಿಟ್ಟು ಕೆಳಗಿನಿಂದ ವಿಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ:`;
  }
  if (text.startsWith("Great! Here are the doctors available in")) {
    const dept = text.split("**")[1] || "";
    return `ಉತ್ತಮ! ಇಲ್ಲಿ ಲಭ್ಯವಿರುವ ವೈದ್ಯರು **${dept}**. ಆಯ್ಕೆ ಮಾಡಲು ಒಂದನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ:`;
  }
  if (text.startsWith("Sorry, **")) {
    const doc = text.split("**")[1] || "";
    return `ಕ್ಷಮಿಸಿ, **${doc}** ಇಂದು ಯಾವುದೇ ಖಾಲಿ ಸ್ಲಾಟ್‌ಗಳನ್ನು ಹೊಂದಿಲ್ಲ. ನೀವು ಬೇರೆ ವೈದ್ಯರನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಬಯಸುವಿರಾ?`;
  }
  if (text.startsWith("Here are today's open slots for")) {
    const doc = text.split("**")[1] || "";
    return `ಇಂದು ಲಭ್ಯವಿರುವ ಸ್ಲಾಟ್‌ಗಳು **${doc}**. ಸಮಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ:`;
  }
  if (text.startsWith("Nice to meet you,")) {
    const name = text.split("**")[1] || "";
    return `ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದು ಸಂತೋಷ, **${name}**! 📱 ಈಗ ದಯವಿಟ್ಟು ನಿಮ್ಮ **ಮೊಬೈಲ್ ಸಂಖ್ಯೆ**ಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ:`;
  }
  if (text.startsWith("Here are the details for")) {
    const token = text.split("**")[1] || "";
    return `ಇದರ ವಿವರಗಳು ಇಲ್ಲಿವೆ **${token}**:`;
  }
  if (text.startsWith("No appointment found for token")) {
    const token = text.split("**")[1] || "";
    if (text.includes("cancel")) {
      return `ಟೋಕನ್‌ಗೆ ಯಾವುದೇ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕಂಡುಬಂದಿಲ್ಲ **${token}**. ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ಮುಖ್ಯ ಮೆನುಗೆ ಹಿಂತಿರುಗಲು 'cancel' ಎಂದು ಟೈಪ್ ಮಾಡಿ.`;
    }
    return `ಟೋಕನ್‌ಗೆ ಯಾವುದೇ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕಂಡುಬಂದಿಲ್ಲ **${token}**. ದಯವಿಟ್ಟು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.`;
  }
  if (text.includes("is already cancelled.")) {
    const token = text.split("**")[1] || "";
    return `ನಿಮ್ಮ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ **${token}** ಅನ್ನು ಈಗಾಗಲೇ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.`;
  }
  if (text.startsWith("Your appointment for")) {
    const parts = text.split("**");
    return `ನಿಮ್ಮ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ **${parts[1] || ""}** ರಂದು **${parts[3] || ""}** ಲ್ಲಿ **${parts[5] || ""}** ಯಶಸ್ವಿಯಾಗಿ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.`;
  }

  // Section specific responses (About, Timings, etc.)
  if (text.includes(" premier dental institution established in")) {
    return `**${RRDCH.name}** (RRDCH) ಒಂದು ಪ್ರಮುಖ ದಂತ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಾಗಿದ್ದು, **${RRDCH.established}** ರಲ್ಲಿ ಸ್ಥಾಪನೆಯಾಗಿದೆ. ಇದು ಬೆಂಗಳೂರಿನಲ್ಲಿದೆ.\n\n**${RRDCH.affiliation}** ಗೆ ಸಂಯೋಜಿತವಾಗಿದೆ ಮತ್ತು **${RRDCH.recognition}** ನಿಂದ ಮಾನ್ಯತೆ ಪಡೆದಿದೆ.\n\nನಾವು **9 ವಿಶೇಷ ವಿಭಾಗಗಳನ್ನು** ನಡೆಸುತ್ತಿದ್ದೇವೆ ಮತ್ತು ಈ ಕೆಳಗಿನ ಮಾನ್ಯತೆಗಳನ್ನು ಹೊಂದಿದ್ದೇವೆ: ${RRDCH.accreditations.join(", ")}.`;
  }

  if (text.includes("⏰ **OPD Timings**")) {
    return `⏰ **OPD ಸಮಯ**\n${RRDCH.opdHours}\n\n🚨 **ತುರ್ತು ಚಿಕಿತ್ಸೆ**\n${RRDCH.emergency}`;
  }

  if (text.includes("📍 **RRDCH Address**")) {
    return `📍 **RRDCH ವಿಳಾಸ**\n${RRDCH.address}\n\n🗺️ ನಾವು **ಮೈಸೂರು ರಸ್ತೆ**ಯಲ್ಲಿದ್ದೇವೆ, ಬೆಂಗಳೂರಿನ ಎಲ್ಲಾ ಭಾಗಗಳಿಂದ ಸುಲಭವಾಗಿ ತಲುಪಬಹುದು.`;
  }

  if (text.includes("📞 **Phone**")) {
    return `📞 **ಫೋನ್**: ${RRDCH.phone}\n\n📧 **ಇಮೇಲ್**: ${RRDCH.email}\n\n🌐 **ವೆಬ್‌ಸೈಟ್**: ${RRDCH.website}`;
  }

  if (text.includes("🎓 **Courses offered at RRDCH**")) {
    return `🎓 **RRDCH ನಲ್ಲಿ ನೀಡಲಾಗುವ ಕೋರ್ಸ್‌ಗಳು:**\n\n${RRDCH.courses.map((c) => `• ${c}`).join("\n")}\n\nಪ್ರವೇಶಾತಿಯು RGUHS ನಿಯಮಗಳ ಪ್ರಕಾರ **NEET-UG/PG** ಮೂಲಕ ಇರುತ್ತದೆ.`;
  }

  if (text.includes("🚨 **Emergency Dental Care**")) {
    return `🚨 **ತುರ್ತು ದಂತ ಆರೈಕೆ** ದಿನದ **24/7** ಗಂಟೆಯೂ ಲಭ್ಯವಿದೆ!\n\nದಯವಿಟ್ಟು ನಮಗೆ ತಕ್ಷಣ ಕರೆ ಮಾಡಿ:\n📞 **${RRDCH.phone.split("/")[0].trim()}**\n\n📍 ನೇರವಾಗಿ ನಮ್ಮ ತುರ್ತು ವಿಭಾಗಕ್ಕೆ ಬನ್ನಿ:\n${RRDCH.address}`;
  }

  if (text.includes("💰 **Fee Information**")) {
    return `💰 **ಶುಲ್ಕದ ಮಾಹಿತಿ**\n${RRDCH.fees}`;
  }

  if (text.includes("🦷 **RRDCH has 9 specialized departments**")) {
    return `🦷 **RRDCH 9 ವಿಶೇಷ ವಿಭಾಗಗಳನ್ನು ಹೊಂದಿದೆ:**\n\n${RRDCH.departments.map((d, i) => `**${i + 1}.** ${d}`).join("\n")}`;
  }

  if (text.startsWith("I'm having trouble connecting right now.")) {
    return `ನಮಗೆ ಈಗ ಸಂಪರ್ಕಿಸಲು ತೊಂದರೆಯಾಗುತ್ತಿದೆ. ದಯವಿಟ್ಟು ತ್ವರಿತ-ಪ್ರತ್ಯುತ್ತರ ಬಟನ್‌ಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಇಲ್ಲಿ ಸಂಪರ್ಕಿಸಿ ${RRDCH.phone}.`;
  }

  return text;
}

export function translateExtra(extra: MessageExtra | undefined, lang: string): MessageExtra | undefined {
  if (!extra) return undefined;
  if (lang !== "kn-IN") return extra;
  
  if (extra.type === "quickReplies") {
    return {
      ...extra,
      replies: extra.replies.map(r => KN_DICT[r] || r)
    };
  }
  return extra;
}

export function reverseTranslate(text: string, lang: string): string {
  if (lang !== "kn-IN") return text;
  // If the user clicked a Kannada quick-reply, map it back to the English key
  // so the intent engine and flow logic can understand it natively.
  for (const [enKey, knVal] of Object.entries(KN_DICT)) {
    if (text === knVal) {
      return enKey;
    }
  }
  return text;
}

export function dentiMsg(text: string, extra?: MessageExtra, lang: string = "en-IN"): DentiMessage {
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
  cancelledAppointmentId?: string;
  freedSlotTime?: string;
  freedSlotDoctorId?: string;
}

export function processUserInput(
  input: string,
  state: ConvState,
  slots: TimeSlot[],
  appointments: Appointment[],
  lang: string = "en-IN"
): ProcessResult {
  const trimmed = input.trim();
  
  const msg = (text: string, extra?: MessageExtra) => dentiMsg(text, extra, lang);

  const universalCancelRegex = state.step === "idle"
    ? /^(stop|reset|start\s*over|go\s*back|main\s*menu|restart)\b/i
    : /^(cancel|stop|reset|start\s*over|go\s*back|main\s*menu|restart)\b/i;

  if (universalCancelRegex.test(trimmed)) {
    return {
      messages: [
        msg("No problem! I've reset our conversation. What else can I help you with? 😊", {
          type: "quickReplies",
          replies: ["Book Appointment", "Check Status", "Departments", "OPD Hours", "Contact Us"],
        }),
      ],
      newState: INITIAL_CONV_STATE,
    };
  }

  if (state.step === "booking:dept") {
    const dept = trimmed;
    const doctors = getDoctorsForDept(dept);
    if (doctors.length === 0) {
      return {
        messages: [
          msg(
            `I couldn't find doctors for **"${dept}"**. Please pick a department from below:`,
            { type: "quickReplies", replies: DEPT_QUICK_REPLIES }
          ),
        ],
        newState: state,
      };
    }
    return {
      messages: [
        msg(`Great! Here are the doctors available in **${dept}**. Tap one to select:`, {
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
        messages: [msg("Please tap a doctor card above to select.")],
        newState: state,
      };
    }
    const openSlots = getOpenSlots(slots, doctor.id);
    if (openSlots.length === 0) {
      const deptDoctors = getDoctorsForDept(state.booking.dept || "");
      return {
        messages: [
          msg(
            `Sorry, **${doctor.name}** has no open slots today. Would you like to choose a different doctor?`,
            { type: "doctorList", doctors: deptDoctors.filter((d) => d.id !== doctor.id) }
          ),
        ],
        newState: { step: "booking:doctor", booking: state.booking },
      };
    }
    return {
      messages: [
        msg(`Here are today's open slots for **${doctor.name}**. Pick a time:`, {
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
        messages: [msg("Please tap a time slot from the grid above.")],
        newState: state,
      };
    }
    return {
      messages: [msg("Almost there! What's your **full name**? 📝")],
      newState: { step: "booking:name", booking: { ...state.booking, slot } },
    };
  }

  if (state.step === "booking:name") {
    if (trimmed.length < 2) {
      return {
        messages: [msg("Please enter your full name (at least 2 characters).")],
        newState: state,
      };
    }
    return {
      messages: [
        msg(`Nice to meet you, **${trimmed}**! 📱 Now please share your **mobile number**:`),
      ],
      newState: { step: "booking:phone", booking: { ...state.booking, name: trimmed } },
    };
  }

  if (state.step === "booking:phone") {
    const clean = trimmed.replace(/[\s\-\(\)+]/g, "");
    if (!/^(91)?[6-9]\d{9}$/.test(clean)) {
      return {
        messages: [
          msg("Please enter a valid 10-digit Indian mobile number (e.g., 98765 43210)."),
        ],
        newState: state,
      };
    }
    return {
      messages: [
        msg(
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
          msg("Oops, something went wrong. Let's start over!", {
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
        msg("🎉 Your appointment is **confirmed**! Here's your summary:", {
          type: "confirmation",
          booking: confirmation,
        }),
        msg("**Save your token number** and arrive 10 minutes early. See you soon! 😊", {
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
        msg(
          found
            ? `Here are the details for **${token}**:`
            : `No appointment found for token **${token}**. Please double-check and try again.`,
          { type: "statusResult", appointment: found ?? null, token }
        ),
        msg("Anything else I can help you with?", {
          type: "quickReplies",
          replies: ["Book Appointment", "Check Another Status", "Main Menu"],
        }),
      ],
      newState: INITIAL_CONV_STATE,
    };
  }

  if (state.step === "cancel:input") {
    const token = trimmed.toUpperCase();
    const foundIndex = appointments.findIndex((a) => a.tokenId.toUpperCase() === token);
    
    if (foundIndex === -1) {
      return {
        messages: [
          msg(`No appointment found for token **${token}**. Please double-check and try again, or type 'cancel' to go back to the main menu.`),
        ],
        newState: state,
      };
    }
    
    const found = appointments[foundIndex];
    if (found.status === "Cancelled") {
      return {
        messages: [
          msg(`Your appointment **${token}** is already cancelled.`, {
            type: "quickReplies", replies: ["Main Menu"]
          })
        ],
        newState: INITIAL_CONV_STATE
      };
    }
    
    return {
      messages: [
        msg(`Your appointment for **${found.patientName}** on **${found.date}** at **${found.displayTime}** has been successfully cancelled.`),
        msg("Anything else I can help you with?", {
          type: "quickReplies", replies: ["Book Appointment", "Main Menu"]
        })
      ],
      newState: INITIAL_CONV_STATE,
      cancelledAppointmentId: found.id,
      freedSlotTime: found.time,
      freedSlotDoctorId: found.doctorId,
    };
  }

  const intent = detectIntent(trimmed);

  switch (intent) {
    case "greeting":
      return {
        messages: [
          msg("Hello! 😊 Great to see you. How can I help you today?", {
            type: "quickReplies",
            replies: ["Book Appointment", "Check Status", "Departments", "OPD Hours", "Contact Us", "Courses"],
          }),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "farewell":
      return {
        messages: [
          msg(
            "Thank you for chatting with Denti! 🦷 Take care of your dental health. Goodbye! 👋"
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "help":
      return {
        messages: [
          msg("Here's everything I can help you with:", {
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
          msg(
            "Sure! Let's get you an appointment. 📅\nWhich **department** would you like to visit?",
            { type: "quickReplies", replies: DEPT_QUICK_REPLIES }
          ),
        ],
        newState: { step: "booking:dept", booking: {} },
      };

    case "check_status":
      return {
        messages: [
          msg(
            "Sure! Please enter your **appointment token number**:\n(e.g., RRDCH-20260416-1234)"
          ),
        ],
        newState: { step: "status:input", booking: {} },
      };

    case "cancel_appointment":
      return {
        messages: [
          msg("I can help you cancel your appointment. Please enter your **Token ID** (e.g., RRDCH-...):"),
        ],
        newState: { step: "cancel:input", booking: {} },
      };

    case "about":
      return {
        messages: [
          msg(
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
          msg(
            `⏰ **OPD Timings**\n${RRDCH.opdHours}\n\n🚨 **Emergency**\n${RRDCH.emergency}`,
            { type: "quickReplies", replies: ["Book Appointment", "Location", "Contact Us"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "location":
      return {
        messages: [
          msg(
            `📍 **RRDCH Address**\n${RRDCH.address}\n\n🗺️ we are on **Mysore Road**, easily accessible from all parts of Bengaluru.\n\n[Open in Maps →](https://maps.google.com/?q=RajaRajeswari+Dental+College+Hospital+Bengaluru)`,
            { type: "quickReplies", replies: ["Book Appointment", "Contact Us", "OPD Hours"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "contact":
      return {
        messages: [
          msg(
            `📞 **Phone**: ${RRDCH.phone}\n\n📧 **Email**: ${RRDCH.email}\n\n🌐 **Website**: ${RRDCH.website}`,
            { type: "quickReplies", replies: ["Book Appointment", "Location", "OPD Hours"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "departments":
      return {
        messages: [
          msg(
            `🦷 **RRDCH has 9 specialized departments:**\n\n${RRDCH.departments.map((d, i) => `**${i + 1}.** ${d}`).join("\n")}`,
            { type: "quickReplies", replies: ["Book Appointment", "About RRDCH", "Courses"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "courses":
      return {
        messages: [
          msg(
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
          msg(`💰 **Fee Information**\n${RRDCH.fees}`, {
            type: "quickReplies",
            replies: ["Book Appointment", "Contact Us"],
          }),
        ],
        newState: INITIAL_CONV_STATE,
      };

    case "emergency":
      return {
        messages: [
          msg(
            `🚨 **Emergency Dental Care** is available **24/7**!\n\nPlease call us immediately:\n📞 **${RRDCH.phone.split("/")[0].trim()}**\n\n📍 Head directly to our Emergency Department:\n${RRDCH.address}`,
            { type: "quickReplies", replies: ["Get Directions", "Contact Us"] }
          ),
        ],
        newState: INITIAL_CONV_STATE,
      };

    default:
      return {
        messages: [
          msg(
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

export function getWelcomeMessages(lang: string = "en-IN"): DentiMessage[] {
  return [
    dentiMsg(
      "Hi! 👋 I'm **Denti**, your personal RRDCH dental assistant.\n\nI can help you **book appointments**, **check status**, answer questions about **departments**, **timings**, and more!",
      {
        type: "quickReplies",
        replies: ["Book Appointment", "Check Status", "Departments", "OPD Hours", "About RRDCH"],
      },
      lang
    ),
  ];
}
