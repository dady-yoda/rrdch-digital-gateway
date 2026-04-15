import BrandingBar from "@/components/BrandingBar";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import ExploreBento from "@/components/ExploreBento";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <BrandingBar />
      <NavigationBar />
      <main className="flex-1">{children}</main>
      <ExploreBento />
      <Footer />
    </div>
  );
};

export default PageLayout;
