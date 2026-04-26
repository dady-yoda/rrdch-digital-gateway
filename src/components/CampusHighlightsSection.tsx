import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import "./CampusHighlightsSection.css";
import bentoNews from "@/assets/bento-news.png";
import bentoExperience from "@/assets/bento-experience.png";
import bentoAwards from "@/assets/bento-awards.png";
import bentoGallery from "@/assets/bento-gallery.png";
import bentoFacilities from "@/assets/bento-facilities.png";
import bentoMaps from "@/assets/bento-maps.png";
import heroCampus from "@/assets/hero-campus.jpg";
import heroClinical from "@/assets/hero-clinical.jpg";
import heroGraduation from "@/assets/hero-graduation.jpg";
import gsap from "gsap";

const tabs = [
  { 
    id: "news",             
    label: "News",        
    title: "Recent Faculty Achievements & Research",
    date: "January 15, 2025",
    desc: "Our faculty members have been recognized for their pioneering research in advanced implantology and oral and maxillofacial surgery, contributing to the global dental community.",
    link: "/news",
    isExternal: false,
    image: heroClinical,
    cta: "Read All News",
  },
  { 
    id: "experience",       
    label: "Experience",     
    title: "Vibrant Campus Life & Beyond Academics",
    date: "February 01, 2025",
    desc: "Life at RRDCH is more than just lectures. Students engage in a rich tapestry of sports, cultural galas, and community outreach programs that build character and leadership.",
    link: "/about-us",
    isExternal: false,
    image: heroCampus,
    cta: "Discover Campus Life",
  },
  { 
    id: "awards",           
    label: "Awards", 
    title: "Securing Excellence in National Rankings",
    date: "March 10, 2025",
    desc: "Rajarajeswari Dental College once again secures a top-tier position in NIRF rankings, solidifying our status as a premier institution for dental education in India.",
    link: "/recognitions",
    isExternal: false,
    image: heroGraduation,
    cta: "View Recognitions",
  },
  { 
    id: "gallery",               
    label: "Gallery",               
    title: "A Glimpse into our State-of-the-art Campus",
    date: "April 05, 2025",
    desc: "Walk through our high-tech laboratories, lush green campus, and modern clinical suites where the future of dentistry is being shaped every day by our dedicated students.",
    link: "/gallery",
    isExternal: false,
    image: bentoGallery,
    cta: "Explore Gallery",
  },
  { 
    id: "facilities",       
    label: "Facilities",     
    title: "Next-gen Digital Scanning & Precision Lab",
    date: "May 20, 2025",
    desc: "We have upgraded our facility with the latest 3D digital oral scanners and robotic simulation units, providing our students with hands-on experience in cutting-edge tech.",
    link: "/departments",
    isExternal: false,
    image: bentoFacilities,
    cta: "See Our Departments",
  },
  { 
    id: "maps",             
    label: "Locate Us",                  
    title: "Navigate our Multi-specialty Departments",
    date: "Ongoing",
    desc: "Use our interactive campus map to find your way through our sprawling campus, from the out-patient departments to our research centers and student lounges.",
    link: "https://maps.google.com/?q=Rajarajeswari+Dental+College+Bangalore", 
    isExternal: true,
    image: bentoMaps,
    cta: "Open in Google Maps",
  },
];

const CampusHighlightsSection = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([contentRef.current, imageRef.current, textRef.current], { clearProps: "all" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(contentRef.current, { 
        opacity: 0, 
        y: 40,
        clearProps: "y" 
      });

      tl.from(imageRef.current, { 
        scale: 0.9, 
        rotate: -10, 
        opacity: 0,
        clearProps: "scale,rotate"
      }, "-=0.7");

      tl.from(textRef.current, { 
        opacity: 0, 
        x: 30,
        clearProps: "x"
      }, "-=0.7");
    });

    return () => ctx.revert();
  }, [activeTab]);

  // Helper to render the image as a Link or <a> depending on internal/external
  const renderImageLink = () => {
    const imgEl = (
      <>
        <img 
          ref={imageRef}
          className="ch-main-image-wrap"
          src={activeTab.image}
          alt={activeTab.title}
        />
        <div className="ch-image-hover-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </>
    );

    if (activeTab.isExternal) {
      return (
        <a 
          href={activeTab.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ch-image-link"
        >
          {imgEl}
        </a>
      );
    }

    return (
      <Link to={activeTab.link} className="ch-image-link">
        {imgEl}
      </Link>
    );
  };

  // Helper to render the CTA button
  const renderCTA = () => {
    const label = activeTab.cta || "Explore →";

    if (activeTab.isExternal) {
      return (
        <a
          href={activeTab.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ch-cta-btn"
        >
          {label}
          <svg className="ch-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      );
    }

    return (
      <Link to={activeTab.link} className="ch-cta-btn">
        {label}
        <svg className="ch-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </Link>
    );
  };

  return (
    <section className="ch-folder-section">
      <div className="ch-folder-container">
        
        {/* Folder Tabs */}
        <div className="ch-tabs-wrapper">
          {tabs.map((tab, index) => (
            <button
              key={`${tab.id}-${index}`}
              className={`ch-tab-btn ${activeTab.id === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="ch-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="ch-content-panel">
          <div className="ch-panel-inner" ref={contentRef} key={`panel-${activeTab.id}`}>
            
            {/* Left: Clickable Tilted Image */}
            <div className="ch-image-container">
              {renderImageLink()}
            </div>

            {/* Right: Textual Content */}
            <div className="ch-text-container" ref={textRef}>
              <span className="ch-content-date">{activeTab.date}</span>
              <h3 className="ch-content-title">{activeTab.title}</h3>
              <p className="ch-content-desc">{activeTab.desc}</p>
              {renderCTA()}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CampusHighlightsSection;
