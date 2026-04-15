import MagicBento from "./MagicBento";

/**
 * ExploreBento — A shared "Explore More" section using MagicBento,
 * added to every page of the RRDCH Digital Gateway.
 * Uses RRDCH brand green glow (84, 107, 65) and dark green card backgrounds.
 */
const RRDCH_CARDS = [
  {
    color: "#0A1208",
    label: "About",
    title: "About RRDCH",
    description: "Discover our legacy, vision, and commitment to dental excellence since 1995.",
  },
  {
    color: "#0D1A0A",
    label: "Academics",
    title: "Courses & Programmes",
    description: "BDS · MDS · Ph.D · Certificate in Implantology — world-class dental education.",
  },
  {
    color: "#0A130A",
    label: "Accreditation",
    title: "Awards & Accreditations",
    description: "NAAC A+ · NABH · ISO 9001:2015 · RCPSG · IAO · SLMC — globally recognised.",
  },
  {
    color: "#091108",
    label: "Research",
    title: "News & Updates",
    description: "Stay updated with the latest events, achievements, and announcements at RRDCH.",
  },
  {
    color: "#0C1809",
    label: "Campus",
    title: "Campus Life",
    description: "Vibrant student life with state-of-the-art labs, library, sports, and cafeteria.",
  },
  {
    color: "#0B1609",
    label: "Connect",
    title: "Contact Us",
    description: "Mysuru Road, Bangalore — reach out for admissions, appointments, and enquiries.",
  },
];

const ExploreBento = () => (
  <section
    style={{
      background: "linear-gradient(135deg, #080e07 0%, #0f1a0d 100%)",
      padding: "3rem 0",
    }}
  >
    <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
      <span
        style={{
          display: "inline-block",
          fontFamily: "Montserrat, sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#99ad7a",
          marginBottom: "0.5rem",
        }}
      >
        Explore More
      </span>
      <h2
        style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 800,
          color: "#fff8ec",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        Everything at RRDCH
      </h2>
    </div>

    <MagicBento
      cardData={RRDCH_CARDS}
      textAutoHide={true}
      enableStars={true}
      enableSpotlight={true}
      enableBorderGlow={true}
      enableTilt={true}
      enableMagnetism={true}
      clickEffect={true}
      spotlightRadius={300}
      particleCount={12}
      glowColor="84, 107, 65"
    />
  </section>
);

export default ExploreBento;
