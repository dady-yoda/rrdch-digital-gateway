import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroCampus from "@/assets/hero-campus.jpg";
import heroClinical from "@/assets/hero-clinical.jpg";
import heroGraduation from "@/assets/hero-graduation.jpg";

const slides = [
  { src: heroCampus, alt: "RRDCH Campus aerial view", caption: "A Premier Dental Institution in Bengaluru" },
  { src: heroClinical, alt: "Clinical training at RRDCH", caption: "World-Class Clinical Training" },
  { src: heroGraduation, alt: "RRDCH Graduation ceremony", caption: "Shaping Future Dental Leaders" },
];

const tickerItems = [
  { text: "📢 Applications Open for BDS & MDS 2026-27", href: "/#academics" },
  { text: "🏆 NAAC 'A+' Accredited Institution", href: "/accreditation/naac" },
  { text: "🎓 MFDS RCPS (Glasgow) Revision Course Available", href: "/mfds-course" },
  { text: "🦷 One Year Implantology Course (RGUHS Recognised)", href: "/implantology-course" },
  { text: "📋 Republic Day Celebrations - View Gallery", href: "/gallery" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section>
      {/* Carousel */}
      <div className="relative w-full h-[100vh] min-h-[600px] overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for overall contrast */}
            <div className="absolute bottom-16 md:bottom-24 left-0 right-0 text-center px-4">
              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground drop-shadow-lg">
                {slide.caption}
              </h2>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${i === current ? "bg-accent scale-125" : "bg-primary-foreground/50 hover:bg-primary-foreground/80"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-ticker overflow-hidden py-2">
        <div className="ticker-scroll flex whitespace-nowrap gap-12 group">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <Link 
              key={i} 
              to={item.href} 
              className="text-sm font-medium text-primary-foreground px-4 hover:underline"
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
