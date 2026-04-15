import { useEffect, useRef, useState } from "react";
import "./LoadingScreen.css";
import logoWhite from "@/assets/RRDCH FULL WHITE.png";

/* ─── Particle data ─────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

const COLORS = ["#546B41", "#99AD7A", "#DCCCAC", "#FFF8EC88", "#a8c285"];

function mkParticles(n: number): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 5 + 2,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }));
}

/* ─── Component ─────────────────────────────────────── */
interface LoadingScreenProps {
  onComplete: () => void;
  /** ms before exit animation starts (default 3200) */
  duration?: number;
}

const LoadingScreen = ({ onComplete, duration = 3200 }: LoadingScreenProps) => {
  const [exiting, setExiting] = useState(false);
  const [particles] = useState<Particle[]>(() => mkParticles(30));
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), duration);
    // Wait for exit anim (~700ms) then unmount
    const doneTimer = setTimeout(() => onComplete(), duration + 700);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [duration, onComplete]);

  return (
    <div
      ref={screenRef}
      className={`loading-screen${exiting ? " exiting" : ""}`}
      role="status"
      aria-label="Loading RRDCH Digital Gateway"
    >
      {/* ── Animated background ── */}
      <div className="loading-bg" />

      {/* ── Horizontal scan line ── */}
      <div className="scan-line" />

      {/* ── Corner accents ── */}
      <div className="corner corner--tl" />
      <div className="corner corner--tr" />
      <div className="corner corner--bl" />
      <div className="corner corner--br" />

      {/* ── Floating particles ── */}
      <div className="particle-field" aria-hidden="true">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              bottom: "0",
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── Glow rings + logo ── */}
      <div className="glow-ring-wrap" aria-hidden="true">
        {/* Rings */}
        <div className="glow-ring glow-ring-3" />
        <div className="glow-ring glow-ring-2" />
        <div className="glow-ring glow-ring-1" />

        {/* Orbiting dots – outer */}
        <div className="orbit-container">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="orbit-dot" />
          ))}
        </div>

        {/* Orbiting dots – inner counter-rotating */}
        <div className="orbit-container-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="orbit-dot-2" />
          ))}
        </div>

        {/* ── Logo & tagline ── */}
        <div className="logo-wrap">
          <img
            src={logoWhite}
            alt="Rajarajeswari Dental College & Hospital"
            className="logo-img"
            draggable={false}
          />
          <p className="loading-tagline">
            Excellence in Dental Education
          </p>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="progress-wrap" aria-hidden="true">
        <div className="progress-track">
          <div className="progress-bar" />
        </div>
        <span className="progress-label">Initialising Gateway…</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
