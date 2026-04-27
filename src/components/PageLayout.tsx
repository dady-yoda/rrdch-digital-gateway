import { useRef, useEffect, useState } from "react";
import BrandingBar from "@/components/BrandingBar";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Measure the full header height (BrandingBar + NavBar) and set it as
  // padding-top on main so no content is hidden underneath.
  useEffect(() => {
    const update = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed header wrapper: BrandingBar + NavBar stay together at the top */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[200]"
      >
        <BrandingBar />
        <NavigationBar />
      </div>

      {/* Push content down by the full header height so nothing is hidden */}
      <main className="flex-1" style={{ paddingTop: headerHeight }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PageLayout;
