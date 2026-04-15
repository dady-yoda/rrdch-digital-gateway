import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UtilityBar from "@/components/UtilityBar";
import BrandingBar from "@/components/BrandingBar";
import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import LeadershipSection from "@/components/LeadershipSection";
import AcademicsSection from "@/components/AcademicsSection";
import UpdatesSection from "@/components/UpdatesSection";
import MultimediaSection from "@/components/MultimediaSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // Give the DOM a tick to fully render before scrolling
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <div className="min-h-screen">
      <BrandingBar />
      <NavigationBar />
      <main>
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

