import BrandingBar from "@/components/BrandingBar";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <BrandingBar />
      <NavigationBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
export default PageLayout;
