import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import "./DentiChat.css";

import { INITIAL_SLOTS, TimeSlot } from "@/data/slots";
import { MOCK_APPOINTMENTS, Appointment } from "@/data/appointments";
import { detectIntent } from "./dentiKnowledge";
import { askGemini } from "./geminiService";

import {
  DentiMessage,
  ConvState,
  INITIAL_CONV_STATE,
  processUserInput,
  dentiMsg,
  translateText,
  translateExtra,
  getWelcomeMessages,
  reverseTranslate,
} from "./dentiEngine";

/* ─────────────────────────────────────────────────────────────
   Text renderer
───────────────────────────────────────────────────────────── */
function FormattedText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, li) => {
        const parts = line.split(/\*\*(.+?)\*\*/g);
        return (
          <p key={li} style={{ margin: li > 0 ? "3px 0 0" : "0" }}>
            {parts.map((part, pi) =>
              pi % 2 === 1 ? <strong key={pi}>{part}</strong> : part
            )}
          </p>
        );
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Extra content renderers
───────────────────────────────────────────────────────────── */
interface ExtrasProps {
  msg: DentiMessage;
  onAction: (text: string) => void;
}

function MessageExtras({ msg, onAction }: ExtrasProps) {
  if (!msg.extra) return null;
  const { extra } = msg;

  if (extra.type === "quickReplies") {
    return (
      <div className="denti-quick-replies">
        {extra.replies.map((r) => (
          <button key={r} className="denti-qr-pill" onClick={() => onAction(r)}>
            {r}
          </button>
        ))}
      </div>
    );
  }

  if (extra.type === "doctorList") {
    return (
      <div className="denti-doc-list">
        {extra.doctors.map((doc) => (
          <button key={doc.id} className="denti-doc-card" onClick={() => onAction(doc.id)}>
            <img src={doc.avatarUrl} alt={doc.name} className="denti-doc-avatar" />
            <div className="denti-doc-info">
              <p className="denti-doc-name">{doc.name}</p>
              <p className="denti-doc-spec">{doc.specialty}</p>
              <p className="denti-doc-exp">{doc.experience} yrs · ⭐ {doc.rating}</p>
            </div>
            {doc.available && <span className="denti-doc-avail">Available</span>}
          </button>
        ))}
      </div>
    );
  }

  if (extra.type === "slotGrid") {
    return (
      <div className="denti-slot-grid">
        {extra.slots.map((slot) => (
          <button key={slot.id} className="denti-slot-btn" onClick={() => onAction(slot.id)}>
            {slot.displayTime}
          </button>
        ))}
      </div>
    );
  }

  if (extra.type === "confirmation") {
    const b = extra.booking;
    return (
      <div className="denti-confirm-card">
        <div className="denti-confirm-head"><span>✓</span><span>Appointment Confirmed</span></div>
        <div className="denti-confirm-token">{b.token}</div>
        <div className="denti-confirm-rows">
          {[["Patient", b.patientName], ["Doctor", b.doctorName], ["Department", b.department],
            ["Date", b.date], ["Time", b.displayTime], ["Complaint", b.complaint]
          ].map(([label, val]) => (
            <div className="denti-confirm-row" key={label}>
              <span className="label">{label}</span>
              <span className="val">{val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (extra.type === "statusResult") {
    if (!extra.appointment) {
      return (
        <div className="denti-status-not-found">
          <span>❌</span>
          <span>No appointment found for <strong>{extra.token}</strong></span>
        </div>
      );
    }
    const a = extra.appointment;
    return (
      <div className="denti-status-card">
        <div className="denti-status-badge" data-s={a.status}>{a.status}</div>
        <div className="denti-confirm-rows">
          {[["Token", a.tokenId], ["Patient", a.patientName], ["Doctor", a.doctorName],
            ["Date", a.date], ["Time", a.displayTime], ["Complaint", a.complaint]
          ].map(([label, val]) => (
            <div className="denti-confirm-row" key={label}>
              <span className="label">{label}</span>
              <span className="val">{val}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

/* ─────────────────────────────────────────────────────────────
   Avatar Orb
───────────────────────────────────────────────────────────── */
type AvatarState = "idle" | "listening" | "speaking" | "thinking";

function AvatarOrb({ state, size = 80 }: { state: AvatarState; size?: number }) {
  return (
    <div className={`denti-orb-wrap denti-orb--${state}`} style={{ width: size, height: size }}>
      <div className="denti-orb-ring denti-orb-ring--1" />
      <div className="denti-orb-ring denti-orb-ring--2" />
      <div className="denti-orb-ring denti-orb-ring--3" />
      <div className="denti-orb-core">
        <span className="denti-orb-icon">🦷</span>
      </div>
      <div className="denti-orb-waves">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="denti-orb-bar" style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Mode Selector
───────────────────────────────────────────────────────────── */
function ModeSelector({ onSelect }: { onSelect: (mode: "talk" | "text") => void }) {
  return (
    <div className="denti-mode-select">
      <AvatarOrb state="idle" size={100} />
      <h3 className="denti-mode-title">Hi! I'm Denti 👋</h3>
      <p className="denti-mode-subtitle">
        Your personal RRDCH dental assistant.<br />
        How would you like to interact?
      </p>
      <div className="denti-mode-buttons">
        <button className="denti-mode-btn denti-mode-btn--talk" onClick={() => onSelect("talk")}>
          <Mic size={22} />
          <span>Talk to me</span>
          <small>I'll listen &amp; speak back</small>
        </button>
        <button className="denti-mode-btn denti-mode-btn--text" onClick={() => onSelect("text")}>
          <Send size={22} />
          <span>Type to me</span>
          <small>Classic chat experience</small>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TTS helpers
───────────────────────────────────────────────────────────── */

// Cache voices at module level so they don't reset between calls
let _cachedVoices: SpeechSynthesisVoice[] = [];
function getVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis?.getVoices() ?? [];
    if (voices.length > 0) {
      _cachedVoices = voices;
      resolve(voices);
    } else if (_cachedVoices.length > 0) {
      resolve(_cachedVoices);
    } else {
      const handler = () => {
        _cachedVoices = window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = null;
        resolve(_cachedVoices);
      };
      window.speechSynthesis.onvoiceschanged = handler;
      setTimeout(() => resolve(_cachedVoices), 500);
    }
  });
}

function getBestVoice(lang: string, voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const langCode = lang.split("-")[0]; // "en" or "kn"
  let candidates = voices.filter((v) => v.lang.toLowerCase().startsWith(langCode));
  
  if (candidates.length === 0) {
    // Fallback to English if no Kannada voice is found, rather than a random male voice
    candidates = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
    if (candidates.length === 0) candidates = voices;
  }

  // Strictly avoid male voices
  const females = candidates.filter((v) => !/male|man|david|mark|guy/i.test(v.name));
  const pool = females.length > 0 ? females : candidates;

  return (
    pool.find((v) => /zira|samantha|female|woman/i.test(v.name)) ||
    pool.find((v) => /google/i.test(v.name)) ||
    pool[0] || null
  );
}

let currentAudio: HTMLAudioElement | null = null;

function stopSpeaking() {
  window.speechSynthesis?.cancel();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function speakText(text: string, lang: string, onStart?: () => void, onEnd?: () => void) {
  stopSpeaking();
  const clean = text.replace(/\*\*/g, "").replace(/\n/g, ". ");
  
  // Use the passed lang if it's explicitly Kannada, otherwise detect from content
  const isKannada = lang === "kn-IN" || /[\u0C80-\u0CFF]/.test(clean);
  const targetLang = isKannada ? "kn-IN" : "en-IN";

  // Optimization: Reduce sample rate and disable preprocessing for faster response
  fetch("https://api.sarvam.ai/text-to-speech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-subscription-key": import.meta.env.VITE_SARVAM_API_KEY ?? ""
    },
    body: JSON.stringify({
      inputs: [clean],
      target_language_code: targetLang,
      speaker: "priya",
      pace: 1.1, // Slightly faster pace
      speech_sample_rate: 8000,
      enable_preprocessing: false, // Disabling preprocessing for speed
      model: "bulbul:v3"
    })
  })
  .then(async (res) => {
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    if (data.audios && data.audios.length > 0) {
      currentAudio = new Audio("data:audio/wav;base64," + data.audios[0]);
      if (onStart) currentAudio.addEventListener("play", onStart);
      if (onEnd) {
        currentAudio.addEventListener("ended", onEnd);
        currentAudio.addEventListener("error", (e) => {
          console.error("Audio playback error", e);
          onEnd();
        });
      }
      currentAudio.play().catch(e => {
        console.error("Audio playback failed", e);
        if (onEnd) onEnd();
      });
    } else {
      console.error("Sarvam TTS error: No audio data in response", data);
      if (onEnd) onEnd();
    }
  })
  .catch(err => {
    console.error("Failed to fetch Sarvam TTS:", err.message);
    if (onEnd) onEnd();
    
    // Fallback to instant browser TTS if Sarvam fails
    speakInstant(text, lang, onStart, onEnd);
  });
}

// Instant browser TTS — zero network latency, used for welcome greeting
function speakInstant(text: string, lang: string, onStart?: () => void, onEnd?: () => void) {
  if (!window.speechSynthesis) { if (onEnd) onEnd(); return; }
  window.speechSynthesis.cancel();
  const clean = text.replace(/\*\*/g, "").replace(/\n/g, ". ");
  const utter = new SpeechSynthesisUtterance(clean);
  utter.lang = lang;
  utter.rate = lang.startsWith("kn") ? 1.15 : 1.05; // Slightly faster for Kannada
  utter.pitch = 1.1;
  const voices = window.speechSynthesis.getVoices();
  const best = getBestVoice(lang, voices);
  if (best) utter.voice = best;
  if (onStart) utter.onstart = onStart;
  if (onEnd) { utter.onend = onEnd; utter.onerror = onEnd as any; }
  window.speechSynthesis.speak(utter);
}

/* ─────────────────────────────────────────────────────────────
   Main Chat Window
───────────────────────────────────────────────────────────── */
interface DentiChatWindowProps {
  open: boolean;
  onClose: () => void;
}

export function DentiChatWindow({ open, onClose }: DentiChatWindowProps) {
  // ── Core state ────────────────────────────────────────────
  const [messages, setMessages] = useState<DentiMessage[]>([]);
  const [convState, setConvState] = useState<ConvState>(INITIAL_CONV_STATE);
  const [slots, setSlots] = useState<TimeSlot[]>(() => [...INITIAL_SLOTS]);
  const [appointments, setAppointments] = useState<Appointment[]>(() => [...MOCK_APPOINTMENTS]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ── Voice / UI state ──────────────────────────────────────
  const [modeSelected, setModeSelected] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [interimText, setInterimText] = useState("");
  const [chatLang, setChatLang] = useState<"en-IN" | "kn-IN">("en-IN");

  // ── Refs ──────────────────────────────────────────────────
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const ttsEnabledRef = useRef(ttsEnabled);
  const chatLangRef = useRef(chatLang);
  const convStateRef = useRef(convState);
  const slotsRef = useRef(slots);
  const appointmentsRef = useRef(appointments);

  // Keep refs in sync so SpeechRecognition callbacks always see latest values
  useEffect(() => { ttsEnabledRef.current = ttsEnabled; }, [ttsEnabled]);
  useEffect(() => { chatLangRef.current = chatLang; }, [chatLang]);
  useEffect(() => { convStateRef.current = convState; }, [convState]);
  useEffect(() => { slotsRef.current = slots; }, [slots]);
  useEffect(() => { appointmentsRef.current = appointments; }, [appointments]);

  // ── Scroll to bottom ──────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, interimText]);

  // ── Pre-warm voices on mount ─────────────────────────────
  useEffect(() => { getVoices().catch(() => {}); }, []);

  // ── Focus input ───────────────────────────────────────────
  useEffect(() => {
    if (open && modeSelected) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open, modeSelected]);

  // ── Stop TTS & mic when closed ────────────────────────────
  useEffect(() => {
    if (!open) {
      stopSpeaking();
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try { mediaRecorderRef.current.stop(); } catch {}
      }
      setIsListening(false);
    }
  }, [open]);

  // ── Send message (used by both text and voice paths) ──────
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Stop mic if running
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch { /* ignore */ }
    }
    setIsListening(false);
    stopSpeaking();

    const userMsg: DentiMessage = {
      id: Math.random().toString(36).slice(2),
      from: "user",
      text: text.trim(),
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);
    setAvatarState("thinking");

    const curConvState = convStateRef.current;
    const curSlots = slotsRef.current;
    const curAppointments = appointmentsRef.current;
    const curLang = chatLangRef.current;
    const curTts = ttsEnabledRef.current;

    // Normalize input back to English if they clicked a Kannada quick-reply button
    const normalizedText = reverseTranslate(text.trim(), curLang);

    const inFlow = curConvState.step !== "idle";
    const intent = inFlow ? null : detectIntent(normalizedText);
    const useGemini = !inFlow && intent === "unknown";

    if (useGemini) {
      try {
        const geminiReply = await askGemini(normalizedText, curLang);
        setIsTyping(false);
        setMessages((prev) => [...prev, dentiMsg(geminiReply, {
          type: "quickReplies",
          replies: ["Book Appointment", "Check Status", "Departments", "OPD Hours"],
        })]);
        if (curTts) {
          speakText(translateText(geminiReply, curLang), curLang, () => setAvatarState("speaking"), () => setAvatarState("idle"));
        } else {
          setAvatarState("idle");
        }
      } catch {
        setIsTyping(false);
        setAvatarState("idle");
        setMessages((prev) => [...prev, dentiMsg("Sorry, I had trouble processing that. Please try again!")]);
      }
    } else {
      const delay = 100 + Math.random() * 150;
      setTimeout(() => {
        setIsTyping(false);
        const result = processUserInput(normalizedText, curConvState, curSlots, curAppointments, curLang);
        setMessages((prev) => [...prev, ...result.messages]);
        setConvState(result.newState);
        if (result.newAppointment) setAppointments((prev) => [...prev, result.newAppointment!]);
        if (result.bookedSlotId) {
          setSlots((prev) =>
            prev.map((s) => s.id === result.bookedSlotId ? { ...s, status: "Booked" as const } : s)
          );
        }
        if (result.cancelledAppointmentId) {
          // Remove appointment or mark as cancelled. Let's just update its status for history, or we can filter it out.
          // The prompt says "delete one appointment", so we will remove it.
          setAppointments((prev) => prev.filter(a => a.id !== result.cancelledAppointmentId));
          if (result.freedSlotTime && result.freedSlotDoctorId) {
            setSlots((prev) =>
              prev.map((s) => s.doctorId === result.freedSlotDoctorId && s.time === result.freedSlotTime ? { ...s, status: "Open" as const } : s)
            );
          }
        }
        if (curTts && result.messages.length > 0) {
          speakText(translateText(result.messages[0].text, curLang), curLang, () => setAvatarState("speaking"), () => setAvatarState("idle"));
        } else {
          setAvatarState("idle");
        }
      }, delay);
    }
  }, []); // empty deps — uses refs for all mutable values

  // ── Mode selection ────────────────────────────────────────
  const handleModeSelect = useCallback((mode: "talk" | "text") => {
    setModeSelected(true);
    setTtsEnabled(mode === "talk");
    const welcomeMsgs = getWelcomeMessages(chatLangRef.current);
    setMessages(welcomeMsgs);
    if (mode === "talk") {
      const welcomeText = translateText(welcomeMsgs[0].text, chatLangRef.current);
      const lang = chatLangRef.current;
      // Speak instantly via browser SpeechSynthesis — no network wait
      speakInstant(
        welcomeText,
        lang,
        () => setAvatarState("speaking"),
        () => setAvatarState("idle")
      );
    }
  }, []);

  // ── Microphone toggle ─────────────────────────────────────
  const toggleListening = useCallback(() => {
    if (isListening) {
      // Stop recording
      if (mediaRecorderRef.current && 
          mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsListening(false);
      setAvatarState('idle');
      return;
    }

    // Start recording
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          console.log("Recording stopped");
          console.log("Audio chunks collected:", audioChunksRef.current.length);
          
          stream.getTracks().forEach(t => t.stop());

          const totalSize = audioChunksRef.current.reduce((a, b) => a + b.size, 0);
          console.log("Total audio size:", totalSize, "bytes");

          if (totalSize < 1000) {
            console.warn("Audio too short or empty, skipping STT");
            setAvatarState('idle');
            return;
          }

          const audioBlob = new Blob(
            audioChunksRef.current, 
            { type: 'audio/webm' }
          );
          console.log("Audio blob size:", audioBlob.size, "bytes");
          console.log("Sending to Sarvam STT with language:", chatLangRef.current);

          // Send to Sarvam STT
          const formData = new FormData();
          // Use .wav extension as some backends are sensitive to it even if content is webm
          formData.append('file', audioBlob, 'recording.wav');
          formData.append(
            'language_code', 
            chatLangRef.current  // 'kn-IN' or 'en-IN'
          );
          formData.append('model', 'saarika:v2.5');

          try {
            setAvatarState('thinking');
            const apiKey = import.meta.env.VITE_SARVAM_API_KEY ?? "";
            console.log("STT Request with key starting with:", apiKey.substring(0, 5));
            
            const res = await fetch(
              'https://api.sarvam.ai/speech-to-text', 
              {
                method: 'POST',
                headers: {
                  'api-subscription-key': apiKey
                },
                body: formData
              }
            );
            const data = await res.json();
            console.log("Full Sarvam response:", data);
            
            // Try all possible field names
            const transcript = 
              data.transcript || 
              data.text || 
              data.result || 
              data?.output?.[0]?.transcript || 
              "";
            
            if (transcript.trim()) {
              sendMessage(transcript.trim());
            } else {
              console.warn("No transcript found in response:", data);
              setAvatarState('idle');
            }
          } catch (err) {
            console.error('Sarvam STT error:', err);
            setAvatarState('idle');
          }
        };

        mediaRecorder.start(1000);
        setIsListening(true);
        setAvatarState('listening');
      })
      .catch(err => {
        console.error('Mic access denied:', err);
        alert(
          'Microphone access denied. ' + 
          'Please allow mic permissions in your browser.'
        );
      });
  }, [isListening, sendMessage]);
  // ── Key down ──────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  if (!open) return null;

  /* ── Mode Selection Screen ────────────────────────────────── */
  if (!modeSelected) {
    return (
      <div className="denti-window" role="dialog" aria-label="Denti AI Chat">
        <div className="denti-header">
          <div className="denti-header-info">
            <div className="denti-header-avatar">🦷</div>
            <div>
              <div className="denti-header-name">Denti</div>
              <div className="denti-header-status">
                <span className="denti-status-dot" />
                AI Assistant · Online
              </div>
            </div>
          </div>
          <button className="denti-close-btn" onClick={onClose} aria-label="Close chat">
            <X size={15} />
          </button>
        </div>
        <ModeSelector onSelect={handleModeSelect} />
      </div>
    );
  }

  /* ── Full Chat UI ─────────────────────────────────────────── */
  return (
    <div className="denti-window" role="dialog" aria-label="Denti AI Chat">

      {/* Header */}
      <div className="denti-header denti-header--chat">
        <div className="denti-header-left">
          <AvatarOrb state={avatarState} size={42} />
          <div>
            <div className="denti-header-name">Denti</div>
            <div className="denti-header-status">
              <span className="denti-status-dot" />
              {avatarState === "listening" ? "Listening..."
                : avatarState === "speaking" ? "Speaking..."
                : avatarState === "thinking" ? "Thinking..."
                : "AI Assistant · Online"}
            </div>
          </div>
        </div>

        <div className="denti-header-actions">
          {/* Language toggle — dual pill so users clearly see EN / KN active state */}
          <div style={{ display: "flex", background: "rgba(0,0,0,0.25)", borderRadius: "12px", padding: "2px", gap: "2px" }}>
            <button
              style={{
                fontSize: "10px", fontWeight: "bold", padding: "3px 8px", borderRadius: "10px", border: "none",
                cursor: "pointer", transition: "all 0.2s",
                background: chatLang === "en-IN" ? "rgba(84,107,65,0.8)" : "transparent",
                color: chatLang === "en-IN" ? "#fff" : "rgba(255,255,255,0.4)",
              }}
              onClick={() => {
                setChatLang("en-IN");
                if (ttsEnabled) {
                  const lastMsg = messages.filter(m => m.from === "denti").pop();
                  if (lastMsg) {
                    setTimeout(() => speakText(translateText(lastMsg.text, "en-IN"), "en-IN", () => setAvatarState("speaking"), () => setAvatarState("idle")), 100);
                  }
                }
              }}
              title="Switch to English"
            >EN</button>
            <button
              style={{
                fontSize: "10px", fontWeight: "bold", padding: "3px 8px", borderRadius: "10px", border: "none",
                cursor: "pointer", transition: "all 0.2s",
                background: chatLang === "kn-IN" ? "rgba(153,107,65,0.8)" : "transparent",
                color: chatLang === "kn-IN" ? "#fff" : "rgba(255,255,255,0.4)",
              }}
              onClick={() => {
                setChatLang("kn-IN");
                if (ttsEnabled) {
                  const lastMsg = messages.filter(m => m.from === "denti").pop();
                  if (lastMsg) {
                    const translated = translateText(lastMsg.text, "kn-IN");
                    // Use speakText (Sarvam) but with 0 delay
                    speakText(translated, "kn-IN", () => setAvatarState("speaking"), () => setAvatarState("idle"));
                  }
                }
              }}
              title="Switch to Kannada"
            >ಕನ್ನಡ</button>
          </div>

          {/* TTS toggle */}
          <button
            className={`denti-icon-btn ${ttsEnabled ? "active" : ""}`}
            onClick={() => { setTtsEnabled((p) => !p); if (ttsEnabled) stopSpeaking(); }}
            aria-label={ttsEnabled ? "Mute voice" : "Enable voice"}
            title={ttsEnabled ? "Voice on" : "Voice off"}
          >
            {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button className="denti-close-btn" onClick={onClose} aria-label="Close chat">
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="denti-messages" role="log" aria-live="polite">
        {messages.map((msg) => {
          const tText = msg.from === "denti" ? translateText(msg.text, chatLang) : msg.text;
          const tExtra = msg.from === "denti" ? translateExtra(msg.extra, chatLang) : msg.extra;
          return (
            <div key={msg.id} className={`denti-msg-row ${msg.from}`}>
              {msg.from === "denti" && <div className="denti-msg-avatar">🦷</div>}
              <div className="denti-msg-body">
                <div className={`denti-bubble ${msg.from === "denti" ? "denti-side" : "user-side"}`}>
                  <FormattedText text={tText} />
                </div>
                <MessageExtras msg={{ ...msg, extra: tExtra }} onAction={sendMessage} />
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="denti-msg-row denti">
            <div className="denti-msg-avatar">🦷</div>
            <div className="denti-msg-body">
              <div className="denti-typing"><span /><span /><span /></div>
            </div>
          </div>
        )}

        {interimText && (
          <div className="denti-msg-row user">
            <div className="denti-msg-body">
              <div className="denti-bubble user-side denti-interim">{interimText}...</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="denti-input-bar relative">
        <button
          className={`denti-mic-btn ${isListening ? "denti-mic-btn--active" : ""}`}
          onClick={toggleListening}
          aria-label={isListening ? "Stop listening" : "Start listening"}
          title={isListening ? "Stop listening" : `Tap to speak (${chatLang === "en-IN" ? "English" : "Kannada"})`}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          {isListening && <span className="denti-mic-pulse" />}
        </button>

        <input
          ref={inputRef}
          type="text"
          className="denti-input"
          placeholder={isListening ? "Listening..." : chatLang === "kn-IN" ? "ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ..." : "Ask Denti anything..."}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Chat input"
          disabled={isListening}
        />

        <button
          className="denti-send-btn"
          onClick={() => sendMessage(inputText)}
          disabled={!inputText.trim() || isTyping}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
