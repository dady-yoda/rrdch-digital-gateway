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
