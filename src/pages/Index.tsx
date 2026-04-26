import { useState } from "react";
import BrandingBar from "@/components/BrandingBar";
import PillNav from "@/components/PillNav";
import HeroSection from "@/components/HeroSection";
import LeadershipSection from "@/components/LeadershipSection";
import AcademicsSection from "@/components/AcademicsSection";
import Footer from "@/components/Footer";
import CampusHighlightsSection from "@/components/CampusHighlightsSection";
import logo from "@/assets/RRDCH FULL BLACK.png";

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
      { label: "Certificate in Implantology", href: "/implantology-course" },
    ],
  },
  {
    label: "Departments",
    href: "#",
    children: [
      { label: "Oral Medicine & Radiology", href: "/department/oral-medicine-radiology" },
      { label: "Prosthetics & Crown & Bridge", href: "/department/prosthetics-crown-bridge" },
      { label: "Oral & Maxillofacial Surgery", href: "/department/oral-maxillofacial-surgery" },
      { label: "Periodontology", href: "/department/periodontology" },
      { label: "Pedodontics & Preventive Dentistry", href: "/department/pedodontics-preventive-dentistry" },
      { label: "Conservative Dentistry & Endodontics", href: "/department/conservative-dentistry-endodontics" },
      { label: "Orthodontics & Dentofacial Orthopedics", href: "/department/orthodontics-dento-facial-orthopedics" },
      { label: "Public Health Dentistry", href: "/department/public-health-dentistry" },
      { label: "Oral & Maxillofacial Pathology", href: "/department/oral-pathology-microbiology" },
      { label: "Implantology", href: "/department/implantology" },
      { label: "Research & Publication", href: "/department/research-publication" },
      { label: "Orofacial Pain", href: "/department/orofacial-pain" },
    ],
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
      { label: "Hostel Issues", href: "/committee/hostel-issues", external: false },
    ],
  },
  { label: "DCI", href: "/dci", external: false },
  { label: "Recognitions", href: "/recognitions", external: false },
  { label: "Contact Us", href: "#contact" },
];

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-0 left-0 w-full z-[100]">
        <BrandingBar />
      </div>
      
      {/* Invisible spacer to position PillNav correctly below BrandingBar initially */}
      <div className="w-full h-[120px] md:h-[160px] lg:h-[180px] pointer-events-none shrink-0" />
      
      {/* Sticky PillNav wrapped in zero-height container so it doesn't add to flow height */}
      <div className="sticky top-5 md:top-10 z-[60] flex justify-center w-full h-0 max-h-0 overflow-visible">
        <div className="pointer-events-auto -mt-4">
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
      </div>

      {/* Pull main back up by exactly the spacer's height so it starts at Y=0 */}
      <main className="-mt-[120px] md:-mt-[160px] lg:-mt-[180px] relative z-0">
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
