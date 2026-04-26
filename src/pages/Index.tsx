import { useState } from "react";
import BrandingBar from "@/components/BrandingBar";
import PillNav from "@/components/PillNav";
import HeroSection from "@/components/HeroSection";
import LeadershipSection from "@/components/LeadershipSection";
import AcademicsSection from "@/components/AcademicsSection";
import Footer from "@/components/Footer";
import CampusHighlightsSection from "@/components/CampusHighlightsSection";
import { TeethViewer } from "@/components/TeethViewer/TeethViewer";
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
  const [isTeethViewerOpen, setIsTeethViewerOpen] = useState(false);

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
        
        {/* Know Your Teeth CTA */}
        <section className="py-24 bg-[#0a0f0b] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(84,107,65,0.1)_0,transparent_70%)]" />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h4 className="text-[#849a62] font-bold tracking-[0.2em] text-xs uppercase mb-4">Interactive Anatomy</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Know Your Teeth</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              Explore the intricate details of human dental anatomy with our advanced 3D interactive viewer. 
              Identify incisors, canines, molars, and more in a clinical-grade environment.
            </p>
            <button 
              onClick={() => setIsTeethViewerOpen(true)}
              className="bg-[#546B41] hover:bg-[#849a62] text-[#FFF8EC] font-bold px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(84,107,65,0.4)] flex items-center gap-3 mx-auto"
            >
              <span className="text-xl">🦷</span>
              Launch 3D Viewer
            </button>
          </div>
        </section>

        <CampusHighlightsSection />
      </main>
      
      <TeethViewer 
        isOpen={isTeethViewerOpen} 
        onClose={() => setIsTeethViewerOpen(false)} 
      />
      <Footer />
    </div>
  );
};

export default Index;
