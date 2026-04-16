import { useState, useEffect, useRef, useCallback } from "react";
import { X, Send } from "lucide-react";
import "./DentiChat.css";

import { INITIAL_SLOTS, TimeSlot } from "@/data/slots";
import { MOCK_APPOINTMENTS, Appointment } from "@/data/appointments";

import {
  DentiMessage,
  ConvState,
  INITIAL_CONV_STATE,
  getWelcomeMessages,
  processUserInput,
} from "./dentiEngine";

// ── Text renderer (supports **bold** and \n newlines) ────────────────────────
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

// ── Extra content renderers ───────────────────────────────────────────────────
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
          <button
            key={doc.id}
            className="denti-doc-card"
            onClick={() => onAction(doc.id)}
          >
            <img src={doc.avatarUrl} alt={doc.name} className="denti-doc-avatar" />
            <div className="denti-doc-info">
              <p className="denti-doc-name">{doc.name}</p>
              <p className="denti-doc-spec">{doc.specialty}</p>
              <p className="denti-doc-exp">
                {doc.experience} yrs · ⭐ {doc.rating}
              </p>
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
          <button
            key={slot.id}
            className="denti-slot-btn"
            onClick={() => onAction(slot.id)}
          >
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
        <div className="denti-confirm-head">
          <span>✓</span>
          <span>Appointment Confirmed</span>
        </div>
        <div className="denti-confirm-token">{b.token}</div>
        <div className="denti-confirm-rows">
          {[
            ["Patient", b.patientName],
            ["Doctor", b.doctorName],
            ["Department", b.department],
            ["Date", b.date],
            ["Time", b.displayTime],
            ["Complaint", b.complaint],
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
          <span>
            No appointment found for <strong>{extra.token}</strong>
          </span>
        </div>
      );
    }
    const a = extra.appointment;
    return (
      <div className="denti-status-card">
        <div className="denti-status-badge" data-s={a.status}>
          {a.status}
        </div>
        <div className="denti-confirm-rows">
          {[
            ["Token", a.tokenId],
            ["Patient", a.patientName],
            ["Doctor", a.doctorName],
            ["Date", a.date],
            ["Time", a.displayTime],
            ["Complaint", a.complaint],
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

// ── Main Window Component ─────────────────────────────────────────────────────
interface DentiChatWindowProps {
  open: boolean;
  onClose: () => void;
}

export function DentiChatWindow({ open, onClose }: DentiChatWindowProps) {
  const [messages, setMessages] = useState<DentiMessage[]>([]);
  const [convState, setConvState] = useState<ConvState>(INITIAL_CONV_STATE);
  const [slots, setSlots] = useState<TimeSlot[]>(() => [...INITIAL_SLOTS]);
  const [appointments, setAppointments] = useState<Appointment[]>(() => [
    ...MOCK_APPOINTMENTS,
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Send welcome on first open
  useEffect(() => {
    if (open && !initialized) {
      setMessages(getWelcomeMessages());
      setInitialized(true);
    }
  }, [open, initialized]);

  // Scroll to bottom on new messages / typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 320);
      return () => clearTimeout(t);
    }
  }, [open]);

  const dispatchUserMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      // Add user bubble
      const userMsg: DentiMessage = {
        id: Math.random().toString(36).slice(2),
        from: "user",
        text: text.trim(),
        time: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setIsTyping(true);

      // Simulate thinking delay
      const delay = 650 + Math.random() * 550;
      setTimeout(() => {
        setIsTyping(false);
        const result = processUserInput(text.trim(), convState, slots, appointments);
        setMessages((prev) => [...prev, ...result.messages]);
        setConvState(result.newState);

        if (result.newAppointment) {
          setAppointments((prev) => [...prev, result.newAppointment!]);
        }
        if (result.bookedSlotId) {
          setSlots((prev) =>
            prev.map((s) =>
              s.id === result.bookedSlotId ? { ...s, status: "Booked" as const } : s
            )
          );
        }
      }, delay);
    },
    [convState, slots, appointments]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      dispatchUserMessage(inputText);
    }
  };

  if (!open) return null;

  return (
    <div className="denti-window" role="dialog" aria-label="Denti AI Chat">
      {/* Header */}
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

      {/* Messages */}
      <div className="denti-messages" role="log" aria-live="polite">
        {messages.map((msg) => (
          <div key={msg.id} className={`denti-msg-row ${msg.from}`}>
            {msg.from === "denti" && (
              <div className="denti-msg-avatar">🦷</div>
            )}
            <div className="denti-msg-body">
              <div className={`denti-bubble ${msg.from === "denti" ? "denti-side" : "user-side"}`}>
                <FormattedText text={msg.text} />
              </div>
              <MessageExtras msg={msg} onAction={dispatchUserMessage} />
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="denti-msg-row denti">
            <div className="denti-msg-avatar">🦷</div>
            <div className="denti-msg-body">
              <div className="denti-typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="denti-input-bar">
        <input
          ref={inputRef}
          type="text"
          className="denti-input"
          placeholder="Ask Denti anything..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Chat input"
        />
        <button
          className="denti-send-btn"
          onClick={() => dispatchUserMessage(inputText)}
          disabled={!inputText.trim() || isTyping}
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
