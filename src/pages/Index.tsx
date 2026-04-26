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
  { label: "HOME", href: "/" },
  {
    label: "ABOUT US",
    href: "/about-us",
    children: [
      { label: "TRUST", href: "/about-us/trust" },
      { label: "MANAGEMENT", href: "/about-us/management" },
      { label: "VISION & MISSION", href: "/about-us/vision" },
      { label: "GOVERNING COUNCIL", href: "/about-us/council" },
    ],
  },
  {
    label: "COURSES",
    href: "#",
    children: [
      { label: "BDS", href: "/course/bds" },
      { label: "MDS", href: "/course/mds" },
      { label: "PH.D", href: "/course/phd" },
      { label: "CERTIFICATE IN IMPLANTOLOGY", href: "/implantology-course" },
    ],
  },
  {
    label: "DEPARTMENTS",
    href: "#",
    children: [
      { label: "ORAL MEDICINE & RADIOLOGY", href: "/department/oral-medicine-radiology" },
      { label: "PROSTHETICS & CROWN & BRIDGE", href: "/department/prosthetics-crown-bridge" },
      { label: "ORAL & MAXILLOFACIAL SURGERY", href: "/department/oral-maxillofacial-surgery" },
      { label: "PERIODONTOLOGY", href: "/department/periodontology" },
      { label: "PEDODONTICS & PREVENTIVE DENTISTRY", href: "/department/pedodontics-preventive-dentistry" },
      { label: "CONSERVATIVE DENTISTRY & ENDODONTICS", href: "/department/conservative-dentistry-endodontics" },
      { label: "ORTHODONTICS & DENTOFACIAL ORTHOPEDICS", href: "/department/orthodontics-dento-facial-orthopedics" },
      { label: "PUBLIC HEALTH DENTISTRY", href: "/department/public-health-dentistry" },
      { label: "ORAL & MAXILLOFACIAL PATHOLOGY", href: "/department/oral-pathology-microbiology" },
      { label: "IMPLPLANTOLOGY", href: "/department/implantology" },
      { label: "RESEARCH & PUBLICATION", href: "/department/research-publication" },
      { label: "OROFACIAL PAIN", href: "/department/orofacial-pain" },
    ],
  },
  {
    label: "ACCREDITATION",
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
    label: "SCHEDULE",
    href: "#",
    children: [
      { label: "CALENDAR OF EVENTS", href: "/schedule/calendar", external: false },
      { label: "TIMETABLE", href: "/schedule/timetable", external: false },
    ],
  },
  {
    label: "COMMITTEE",
    href: "#",
    children: [
      { label: "ANTI-RAGGING", href: "/committee/anti-ragging", external: false },
      { label: "HOSTEL ISSUES", href: "/committee/hostel-issues", external: false },
    ],
  },
  { label: "DCI", href: "/dci", external: false },
  { label: "RECOGNITIONS", href: "/recognitions", external: false },
  { label: "CONTACT US", href: "#contact" },
];

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full z-[100]">
        <BrandingBar />
      </div>
      
      <div className="w-full h-[120px] md:h-[160px] lg:h-[180px] pointer-events-none shrink-0" />
      
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
