// ─── RRDCH Knowledge Base for Denti AI ───────────────────────────────────────

export const RRDCH = {
  name: "RajaRajeswari Dental College & Hospital",
  shortName: "RRDCH",
  address:
    "No. 14, Ramohalli Cross, Kumbalgodu, MSR Nagar, Mysore Road, Bengaluru – 560 074",
  phone: "+91-80-28437350 / +91-80-28437360",
  email: "principal@rrdch.org | admissions@rrdch.org",
  website: "www.rrdch.org",
  opdHours: "Monday to Saturday · 9:00 AM – 5:00 PM (Sundays Closed)",
  emergency: "24/7 Emergency Care · Call +91-80-28437350",
  established: 1993,
  affiliation: "Rajiv Gandhi University of Health Sciences (RGUHS), Bengaluru",
  recognition: "Dental Council of India (DCI)",
  accreditations: ["NAAC 'A' Grade", "NABH Accredited", "ISO 9001:2015 Certified", "IAO Member"],
  departments: [
    "Oral Medicine & Radiology",
    "Oral & Maxillofacial Surgery",
    "Orthodontics & Dentofacial Orthopedics",
    "Prosthodontics & Crown and Bridge",
    "Periodontology",
    "Conservative Dentistry & Endodontics",
    "Pedodontics & Preventive Dentistry",
    "Oral & Maxillofacial Pathology",
    "Public Health Dentistry",
  ],
  courses: [
    "BDS – Bachelor of Dental Surgery (5 years)",
    "MDS – Master of Dental Surgery in 9 specialties (3 years)",
    "Ph.D – Doctoral Program in Dental Sciences (3–5 years)",
    "Certificate in Implantology (1 year)",
    "Certificate in MFDS (Membership of Faculty of Dental Surgeons)",
  ],
  fees:
    "OPD consultation starts at ₹200. Treatment costs vary by procedure and department. For a detailed fee structure please contact our reception or visit the hospital.",
};

export type DentiIntent =
  | "greeting"
  | "farewell"
  | "help"
  | "book_appointment"
  | "check_status"
  | "about"
  | "hours"
  | "location"
  | "contact"
  | "departments"
  | "courses"
  | "fees"
  | "emergency"
  | "cancel"
  | "cancel_appointment"
  | "unknown";

interface IntentRule {
  intent: DentiIntent;
  patterns: RegExp[];
}

export const INTENT_PATTERNS: IntentRule[] = [
  {
    intent: "greeting",
    patterns: [
      /^(hi+|hello|hey|good\s*(morning|afternoon|evening|day)|howdy|namaste|hola|sup|yo)\b/i,
    ],
  },
  {
    intent: "farewell",
    patterns: [
      /^(bye|goodbye|see\s*you|take\s*care|ok\s*bye|that.?s\s*all|ciao|thanks?\s*bye?)\b/i,
    ],
  },
  {
    intent: "cancel",
    patterns: [
      /^(stop|reset|start\s*over|go\s*back|main\s*menu|restart|quit|exit)\b/i,
    ],
  },
  {
    intent: "cancel_appointment",
    patterns: [
      /^(cancel|delete|remove)\b/i,
      /cancel\s*(an?\s*)?(appointment|appt|booking)/i,
      /delete\s*(an?\s*)?(appointment|appt|booking)/i,
      /remove\s*(an?\s*)?(appointment|appt|booking)/i,
    ],
  },
  {
    intent: "help",
    patterns: [
      /^(help|what\s*can\s*you|what\s*do\s*you|commands?|menu|options|capabilities?)\b/i,
    ],
  },
  {
    intent: "book_appointment",
    patterns: [
      /book\s*(an?\s*)?(appointment|appt)/i,
      /schedule\s*(an?\s*)?(appointment|visit|consult)/i,
      /want\s*to\s*(see|meet|visit)\s*(a\s*)?doctor/i,
      /need\s*(an?\s*)?(appointment|consult|doctor)/i,
      /make\s*(an?\s*)?appointment/i,
      /book\s*another/i,
      /^(book|appointment|appt)$/i,
    ],
  },
  {
    intent: "check_status",
    patterns: [
      /check\s*(my\s*)?(appointment|status|token|booking)/i,
      /appointment\s*status/i,
      /(my\s*)?token\s*(number|id|status)?/i,
      /track\s*(my\s*)?(appointment|booking)/i,
      /check\s*another\s*status/i,
    ],
  },
  {
    intent: "about",
    patterns: [
      /about\s*(rrdch|hospital|college|you|this)/i,
      /what\s*is\s*rrdch/i,
      /tell\s*me\s*about/i,
      /who\s*are\s*you/i,
    ],
  },
  {
    intent: "hours",
    patterns: [
      /(opd\s*)?(timing|time|hours?|open|clos|working)/i,
      /when\s*(are|is|do)\s*(you|the\s*(hospital|clinic|opd))/i,
    ],
  },
  {
    intent: "location",
    patterns: [
      /where\s*(are\s*you|is\s*rrdch)/i,
      /(location|address|directions?|how\s*to\s*(reach|come|get\s*to))/i,
      /get\s*directions?/i,
      /^map$/i,
    ],
  },
  {
    intent: "contact",
    patterns: [
      /(contact|phone\s*number|call|email|reach\s*(you|rrdch))/i,
      /contact\s*admissions?/i,
    ],
  },
  {
    intent: "departments",
    patterns: [
      /(departments?|specialty|specialit|division|section|which\s*doctor)/i,
      /what\s*(treatments?|services?)\s*(do\s*you|are)/i,
      /view\s*departments?/i,
    ],
  },
  {
    intent: "courses",
    patterns: [
      /(courses?|bds|mds|ph\.?d|admission|degree|program|education)/i,
      /(bds|mds)\s*details?/i,
      /how\s*to\s*(apply|get\s*admission)/i,
    ],
  },
  {
    intent: "fees",
    patterns: [
      /(fee|cost|price|charge|payment|how\s*much|consultation\s*charge)/i,
    ],
  },
  {
    intent: "emergency",
    patterns: [
      /(emergency|urgent|severe\s*pain|accident|bleeding|swelling|swollen|broken\s*tooth|tooth\s*fell)/i,
    ],
  },
  {
    intent: "help",
    patterns: [
      /go\s*to\s*(main\s*)?menu/i,
      /main\s*menu/i,
    ],
  },
];

export function detectIntent(text: string): DentiIntent {
  const trimmed = text.trim();
  for (const { intent, patterns } of INTENT_PATTERNS) {
    if (patterns.some((p) => p.test(trimmed))) return intent;
  }
  return "unknown";
}
