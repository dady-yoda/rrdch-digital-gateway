import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Accessibility,
  Link2,
  Contrast,
  Type,
  CaseSensitive,
  Pause,
  ImageOff,
  BookOpen,
  MousePointer2,
  AlignLeft,
  Droplet,
  MoveVertical,
} from "lucide-react";
import "./AccessibilityToolbar.css";

// ─── helpers ────────────────────────────────────────────────────────────────

/** Cycle: 0 → 1 → 2 → 3 → 0 */
const cycle = (v: number, max = 3) => (v >= max ? 0 : v + 1);

/** Visual level dots */
const LevelDots = ({ level, max = 3 }: { level: number; max?: number }) => (
  <span className="flex items-center gap-0.5 mt-1">
    {Array.from({ length: max }).map((_, i) => (
      <span
        key={i}
        className={`rounded-full transition-all duration-200 ${i < level ? "bg-primary w-2 h-2" : "bg-muted-foreground/30 w-1.5 h-1.5"
          }`}
      />
    ))}
  </span>
);

// ─── feature config ──────────────────────────────────────────────────────────

interface Feature {
  id: string;
  label: string;
  icon: React.ElementType;
  levelLabels: string[];
  max?: number; // defaults to 3; set to 1 for on/off features
}

const FEATURES: Feature[] = [
  {
    id: "highlightLinks",
    label: "Highlight Links",
    icon: Link2,
    levelLabels: ["Subtle"],
    max: 1,
  },
  {
    id: "contrast",
    label: "Contrast",
    icon: Contrast,
    levelLabels: ["Low+", "High", "Max"],
  },
  {
    id: "biggerText",
    label: "Bigger Text",
    icon: Type,
    levelLabels: ["110%", "120%", "135%"],
  },
  {
    id: "textSpacing",
    label: "Text Spacing",
    icon: CaseSensitive,
    levelLabels: ["Light", "Medium", "Wide"],
  },
  {
    id: "pauseAnim",
    label: "Animations",
    icon: Pause,
    levelLabels: ["Slower", "Paused"],
    max: 2,
  },
  {
    id: "hideImages",
    label: "Images",
    icon: ImageOff,
    levelLabels: ["Dim", "Faint", "Hidden"],
  },
  {
    id: "dyslexia",
    label: "Dyslexia Font",
    icon: BookOpen,
    levelLabels: ["On"],
    max: 1,
  },
  {
    id: "cursor",
    label: "Cursor Size",
    icon: MousePointer2,
    levelLabels: ["Small+", "Medium", "Large"],
  },
  {
    id: "lineHeight",
    label: "Line Height",
    icon: MoveVertical,
    levelLabels: ["1.6×", "1.9×", "2.4×"],
  },
  {
    id: "textAlign",
    label: "Text Align",
    icon: AlignLeft,
    levelLabels: ["Left", "Center", "Justify"],
  },
  {
    id: "saturation",
    label: "Saturation",
    icon: Droplet,
    levelLabels: ["Vivid", "Intense", "Muted"],
  },
];

// Active level button colours
const levelBg = (level: number) => {
  if (level === 0) return "bg-muted/50 border-transparent hover:bg-muted hover:border-border";
  if (level === 1) return "bg-primary/10 border-primary/50";
  if (level === 2) return "bg-primary/20 border-primary/70";
  return "bg-primary/30 border-primary shadow-primary/20 shadow-sm";
};

// ─── main component ──────────────────────────────────────────────────────────

type State = Record<string, number>;

const INITIAL: State = Object.fromEntries(FEATURES.map((f) => [f.id, 0]));

export default function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [levels, setLevels] = useState<State>(INITIAL);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Handle spin on hover (matches Search/Dark mode buttons)
  const handleSpinEnter = () => {
    if (!iconRef.current) return;
    tweenRef.current?.kill();
    gsap.set(iconRef.current, { rotate: 0 });
    tweenRef.current = gsap.to(iconRef.current, {
      rotate: 360,
      duration: 0.4,
      ease: "power3.easeOut",
      overwrite: "auto",
    });
  };

  // Apply / remove CSS classes on <html>
  useEffect(() => {
    const root = document.documentElement;
    FEATURES.forEach((f) => {
      [1, 2, 3].forEach((l) => {
        root.classList.toggle(`a11y-${f.id}-${l}`, levels[f.id] === l);
      });
    });
  }, [levels]);

  // Close panel when clicking outside the toolbar container
  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const bump = (id: string) => {
    const feature = FEATURES.find((f) => f.id === id);
    setLevels((prev) => ({ ...prev, [id]: cycle(prev[id], feature?.max ?? 3) }));
  };

  const reset = () => setLevels(INITIAL);

  const activeCount = Object.values(levels).filter((v) => v > 0).length;

  return (
    <div className="relative" ref={containerRef}>
      {/* ── Panel ── */}
      {open && (
        <div
          className="absolute bottom-[calc(100%+14px)] right-0 bg-background border border-border shadow-2xl rounded-2xl p-4 z-[1001]"
          style={{ width: "320px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
            <h3 className="font-heading font-bold text-base text-foreground flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-primary" />
              Accessibility
              {activeCount > 0 && (
                <span className="ml-1 text-[10px] font-bold bg-primary text-white rounded-full px-1.5 py-0.5">
                  {activeCount}
                </span>
              )}
            </h3>
            <button
              onClick={reset}
              className="text-[11px] font-semibold text-primary hover:underline"
            >
              Reset all
            </button>
          </div>

          {/* Grid of feature buttons */}
          <div className="grid grid-cols-3 gap-2">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              const lv = levels[feature.id];
              const isActive = lv > 0;
              return (
                <button
                  key={feature.id}
                  onClick={() => bump(feature.id)}
                  title={isActive ? `Level ${lv}: ${feature.levelLabels[lv - 1]}` : `Click to enable`}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200 ${levelBg(lv)}`}
                >
                  <Icon
                    className={`w-4 h-4 mb-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span
                    className={`text-[9px] font-semibold text-center leading-tight ${isActive ? "text-primary" : "text-foreground"
                      }`}
                  >
                    {feature.label}
                  </span>
                  {isActive && (
                    <span className="text-[8px] text-primary/70 mt-0.5 font-medium">
                      {feature.levelLabels[lv - 1]}
                    </span>
                  )}
                  <LevelDots level={lv} />
                </button>
              );
            })}
          </div>

          {/* Footer hint */}
          <p className="text-[9px] text-muted-foreground text-center mt-3 pt-3 border-t border-border leading-relaxed">
            Click any option to cycle through 3 levels · Click again to turn off
          </p>
        </div>
      )}

      {/* ── Trigger button — 52×52px circle to match Book Appointment / Ask Denti height ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={handleSpinEnter}
        aria-label="Open Accessibility Toolbar"
        aria-expanded={open}
        className="relative flex items-center justify-center rounded-full transition-all duration-300 hover:opacity-90 hover:-translate-y-1 active:translate-y-0"
        style={{
          width: "52px",
          height: "52px",
          background: open
            ? "linear-gradient(135deg,#3d5030,#2a3820)"
            : "linear-gradient(135deg,#546B41,#3d5030)",
          boxShadow: "0 8px 32px rgba(84,107,65,0.50), 0 0 0 4px rgba(84,107,65,0.12)",
          border: "1.5px solid rgba(153,173,122,0.35)",
          color: "#fff",
        }}
      >
        <Accessibility
          ref={iconRef}
          className={`a11y-icon w-6 h-6 text-white ${
            open ? "scale-110" : ""
          }`}
        />
        {activeCount > 0 && (
          <span
            className="absolute -top-1 -right-1 text-[9px] font-bold bg-yellow-400 text-black rounded-full flex items-center justify-center"
            style={{ width: "15px", height: "15px", lineHeight: 1 }}
          >
            {activeCount}
          </span>
        )}
      </button>
    </div>
  );
}
