import BrandingBar from "@/components/BrandingBar";
import PillNav from "@/components/PillNav";
import HeroSection from "@/components/HeroSection";
import LeadershipSection from "@/components/LeadershipSection";
import AcademicsSection from "@/components/AcademicsSection";
import UpdatesSection from "@/components/UpdatesSection";
import MultimediaSection from "@/components/MultimediaSection";
import Footer from "@/components/Footer";
import logo from "@/assets/RRDCH FULL BLACK.png";

const departments = [
  "Oral Medicine & Radiology",
  "Oral & Maxillofacial Surgery",
  "Orthodontics",
  "Prosthodontics",
  "Periodontics",
  "Conservative Dentistry",
  "Pedodontics",
  "Oral Pathology",
  "Public Health Dentistry",
];

const navItems = [
  { label: "Home", href: "#" },
  {
    label: "About Us",
    href: "#",
    children: [
      { label: "Trust", href: "#" },
      { label: "Management", href: "#" },
      { label: "Vision & Mission", href: "#" },
    ],
  },
  {
    label: "Courses",
    href: "#",
    children: [
      { label: "BDS", href: "#" },
      { label: "MDS", href: "#" },
      { label: "Ph.D", href: "#" },
      { label: "Certificate in Implantology", href: "#" },
    ],
  },
  {
    label: "Departments",
    href: "#",
    children: departments.map((d) => ({ label: d, href: "#" })),
  },
  {
    label: "Accreditation",
    href: "#",
    children: [
      { label: "NAAC", href: "https://www.rrdch.org/accreditation/naac/", external: true },
      { label: "NABH", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2025/07/NABH-accredited.pdf", external: true },
      { label: "ISO", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2026/02/ISO-certificate-of-registration-12.05.2027.pdf", external: true },
      { label: "IAO", href: "https://www.iao.org/India-Karnataka/RajaRajeswari-Dental-College-And-Hospital", external: true },
      { label: "RCPS", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/RCPSG.pdf", external: true },
      { label: "SLMC", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/SLMC.pdf", external: true },
      { label: "NIRF", href: "https://www.rrdch.org/nirf/", external: true },
      { label: "AISHE", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2023/02/RRDCH-AISHE_Certificate-1.pdf", external: true },
    ],
  },
  {
    label: "Schedule",
    href: "#",
    children: [
      { label: "Calendar of events", href: "https://www.rrdch.org/calendar-of-events/", external: true },
      { label: "Timetable", href: "https://www.rrdch.org/time-table/", external: true },
    ],
  },
  {
    label: "Committee",
    href: "#",
    children: [
      { label: "Anti-ragging", href: "https://www.rrdch.org/anti-ragging/", external: true },
    ],
  },
  { label: "DCI", href: "https://www.rrdch.org/dci-mandatory/", external: true },
  { label: "Recognitions", href: "https://www.rrdch.org/recognitions/", external: true },
  { label: "Brochure", href: "#" },
  { label: "Contact Us", href: "#contact" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <BrandingBar />
      <div className="relative">
        <PillNav
          logo={logo}
          logoAlt="RRDCH Logo"
          items={navItems}
          activeHref="#"
          baseColor="#546B41"
          pillColor="#FFF8EC"
          hoveredPillTextColor="#FFF8EC"
          pillTextColor="#546B41"
          initialLoadAnimation
        />
      </div>
      <main className="-mt-16">
        <HeroSection />
        <LeadershipSection />
        <AcademicsSection />
        <UpdatesSection />
        <MultimediaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
