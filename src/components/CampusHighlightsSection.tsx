import { useState } from "react";
import "./CampusHighlightsSection.css";
import heroCampus from "@/assets/hero-campus.jpg";

const cells = [
  { id: "news",             label: "News & Updates",        link: "/news" },
  { id: "campus-exp",       label: "Campus Experience",     link: "#" },
  { id: "awards",           label: "Awards & Recognitions", link: "/recognitions" },
  { id: "facilities",       label: "Campus Facilities",     link: "#" },
  { id: "maps",             label: "Maps",                  link: "https://maps.google.com/?q=Rajarajeswari+Dental+College+Bangalore", isExternal: true },
  { id: "campus-tour",      label: "Gallery",               link: "https://www.rrdch.org/video-gallery/", isExternal: true },
];

const CampusHighlightsSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="ch-section">
      <div className="ch-container">
        <div
          className="ch-grid"
          style={{ backgroundImage: `url(${heroCampus})` }}
        >
        {/* Darken overlay — lightens on hover cell */}
        <div className="ch-base-overlay" />

        {cells.map((cell) => (
          <a
            key={cell.id}
            href={cell.link}
            target={cell.isExternal ? "_blank" : "_self"}
            rel={cell.isExternal ? "noopener noreferrer" : undefined}
            className={`ch-cell${hovered === cell.id ? " ch-cell--active" : ""}${hovered && hovered !== cell.id ? " ch-cell--dimmed" : ""}`}
            onMouseEnter={() => setHovered(cell.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="ch-cell-label">{cell.label}</span>
          </a>
        ))}
        </div>
      </div>
    </section>
  );
};

export default CampusHighlightsSection;
