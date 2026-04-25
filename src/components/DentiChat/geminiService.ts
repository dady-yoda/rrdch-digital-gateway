// ─── Anthropic AI Service — REST API integration for Denti Chat ─────────────────
import { RRDCH } from "./dentiKnowledge";

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY ?? "";
const API_URL = "https://api.anthropic.com/v1/messages";

const SYSTEM_PROMPT = `You are Denti, a friendly and professional female AI dental assistant for ${RRDCH.name} (RRDCH), a premier dental college and hospital in Bengaluru, India.

Key information about RRDCH:
- Established: ${RRDCH.established}
- Address: ${RRDCH.address}
- Phone: ${RRDCH.phone}
- Email: ${RRDCH.email}
- Website: ${RRDCH.website}
- Affiliation: ${RRDCH.affiliation}
- Recognition: ${RRDCH.recognition}
- OPD Hours: ${RRDCH.opdHours}
- Emergency: ${RRDCH.emergency}
- Departments: ${RRDCH.departments.join(", ")}
- Courses: ${RRDCH.courses.join(", ")}
- Accreditations: ${RRDCH.accreditations.join(", ")}
- Fee info: ${RRDCH.fees}

Guidelines:
- CRITICAL: You must support both English and Kannada fluently.
- If the user asks a question in Kannada, you MUST reply entirely in Kannada.
- If the user asks in English, reply in English.
- Keep responses concise (2-4 sentences max).
- Be warm, professional, and helpful.
- Focus on dental health, RRDCH services, and general college information.
- Do NOT use markdown bold (**) or headings (##). Use plain text only so the response sounds natural when read aloud.`;

export async function askGemini(userMessage: string, lang = "en-IN"): Promise<string> {
  if (!API_KEY) {
    return `I'm having trouble connecting right now. Please try the quick-reply buttons, or contact us at ${RRDCH.phone}.`;
  }

  const langInstruction = lang === "kn-IN"
    ? "\n\nCRITICAL LANGUAGE OVERRIDE: The user has selected Kannada. You MUST reply ENTIRELY in Kannada script. Do NOT use any English words in your reply."
    : "\n\nReply in clear, simple English.";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-call": "true"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        system: SYSTEM_PROMPT + langInstruction,
        messages: [{ role: "user", content: userMessage }],
        max_tokens: 256,
        temperature: 0.7,
      }),
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const data = await res.json();
    const text = data?.content?.[0]?.text;
    return text || "I'm sorry, I couldn't generate a response. Please try again!";
  } catch (err) {
    console.error("Anthropic API error:", err);
    return "I'm having trouble thinking right now. Please try again in a moment, or use the quick-reply buttons!";
  }
}

export function isGeminiAvailable(): boolean {
  return !!API_KEY;
}
