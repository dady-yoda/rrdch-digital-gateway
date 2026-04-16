import BrandingBar from "@/components/BrandingBar";
import PillNav from "@/components/PillNav";
import HeroSection from "@/components/HeroSection";
import LeadershipSection from "@/components/LeadershipSection";
import AcademicsSection from "@/components/AcademicsSection";
import Footer from "@/components/Footer";
import CampusHighlightsSection from "@/components/CampusHighlightsSection";
import logo from "@/assets/RRDCH FULL BLACK.png";

import { departmentsData } from "@/data/departmentsData";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "Trust", href: "/about-us/trust" },
      { label: "Management", href: "/about-us/management" },
      { label: "Vision & Mission", href: "/about-us/vision" },
      { label: "Governing Council", href: "/about-us/council" },
    ],
  },
  {
    label: "Courses",
    href: "#",
    children: [
      { label: "BDS", href: "/course/bds" },
      { label: "MDS", href: "/course/mds" },
      { label: "Ph.D", href: "/course/phd" },
      { label: "Certificate in Implantology", href: "/course/implantology" },
    ],
  },
  {
    label: "Departments",
    href: "#",
    children: departmentsData.map((d) => ({ 
      label: d.name, 
      href: `/department/${d.id}` 
    })),
  },
  {
    label: "Accreditation",
    href: "#",
    children: [
      { label: "NAAC", href: "/accreditation/naac", external: false },
      { label: "NABH", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2025/07/NABH-accredited.pdf", external: true },
      { label: "ISO", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2026/02/ISO-certificate-of-registration-12.05.2027.pdf", external: true },
      { label: "IAO", href: "https://www.iao.org/India-Karnataka/RajaRajeswari-Dental-College-And-Hospital", external: true },
      { label: "RCPS", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/RCPSG.pdf", external: true },
      { label: "SLMC", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/SLMC.pdf", external: true },
      { label: "NIRF", href: "/accreditation/nirf", external: false },
      { label: "AISHE", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2023/02/RRDCH-AISHE_Certificate-1.pdf", external: true },
    ],
  },
  {
    label: "Schedule",
    href: "#",
    children: [
      { label: "Calendar of events", href: "/schedule/calendar", external: false },
      { label: "Timetable", href: "/schedule/timetable", external: false },
    ],
  },
  {
    label: "Committee",
    href: "#",
    children: [
      { label: "Anti-ragging", href: "/committee/anti-ragging", external: false },
    ],
  },
  { label: "DCI", href: "/dci", external: false },
  { label: "Recognitions", href: "/recognitions", external: false },
  { label: "Contact Us", href: "#contact" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <BrandingBar />
      <div className="sticky top-5 md:top-10 mt-4 md:mt-6 z-50 flex justify-center w-full">
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
        <CampusHighlightsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
