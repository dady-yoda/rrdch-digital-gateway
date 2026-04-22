import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { DentiChatWindow } from "./DentiChat/DentiChat";
// Ensure DentiChat styles are always available (window + button)
import "./DentiChat/DentiChat.css";
import AccessibilityToolbar from "./AccessibilityToolbar";

export default function FloatingCTA() {
  const location = useLocation();
  const [dentiOpen, setDentiOpen] = useState(false);

  // Hide on DMS-specific routes
  const hiddenRoutes = ["/login", "/patient", "/doctor", "/admin"];
  if (hiddenRoutes.some((route) => location.pathname.startsWith(route))) {
    return null;
  }

  return (
    <>
      {/* Denti Chat Window */}
      <DentiChatWindow open={dentiOpen} onClose={() => setDentiOpen(false)} />

      {/* Floating action row — bottom right */}
      <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3">

        {/* ── Ask Denti Button ── */}
        <button
          id="denti-chat-button"
          onClick={() => setDentiOpen((prev) => !prev)}
          aria-expanded={dentiOpen}
          aria-label="Open Denti AI assistant"
          className="flex items-center gap-2 rounded-full font-heading font-bold text-sm text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-1 active:translate-y-0 select-none"
          style={{
            height: "52px",
            padding: "0 22px",
            background: dentiOpen
              ? "linear-gradient(135deg,#3d5030,#2a3820)"
              : "linear-gradient(135deg,#546B41,#3d5030)",
            boxShadow: "0 8px 32px rgba(84,107,65,0.50), 0 0 0 4px rgba(84,107,65,0.12)",
            border: "1.5px solid rgba(153,173,122,0.35)",
            position: "relative",
          }}
        >
          {/* Wiggling tooth icon */}
          <span
            style={{
              fontSize: "20px",
              display: "inline-block",
              animation: "denti-tooth-wiggle 4s ease-in-out infinite",
            }}
          >
            🦷
          </span>
          <span>Ask Denti</span>

          {/* Live pulse badge when closed */}
          {!dentiOpen && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "12px",
                height: "12px",
                background: "#4ade80",
                borderRadius: "50%",
                border: "2.5px solid #0a100a",
                animation: "denti-badge-pulse 2s infinite",
              }}
            />
          )}
        </button>

        {/* ── Book Appointment Button ── */}
        <Link
          to="/login"
          id="book-appointment-cta"
          className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-heading font-bold text-sm text-white hover:opacity-90 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
          style={{
            height: "52px",
            backgroundColor: "#546B41",
            boxShadow: "0 8px 32px rgba(84,107,65,0.45)",
          }}
        >
          <CalendarCheck className="w-5 h-5" />
          Book Appointment
        </Link>
        <AccessibilityToolbar />
      </div>
    </>
  );
}
