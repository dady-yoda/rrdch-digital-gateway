import { useState, useEffect } from "react";
import heroCampus from "@/assets/hero-campus.jpg";
import heroClinical from "@/assets/hero-clinical.jpg";
import heroGraduation from "@/assets/hero-graduation.jpg";

const slides = [
  { src: heroCampus, alt: "RRDCH Campus aerial view", caption: "A Premier Dental Institution in Bengaluru" },
  { src: heroClinical, alt: "Clinical training at RRDCH", caption: "World-Class Clinical Training" },
  { src: heroGraduation, alt: "RRDCH Graduation ceremony", caption: "Shaping Future Dental Leaders" },
];

const tickerItems = [
  "📢 Applications Open for BDS & MDS 2026-27",
  "🏆 NAAC 'A+' Accredited Institution",
  "🎓 MFDS RCPS (Glasgow) Revision Course Available",
  "🦷 One Year Implantology Course (RGUHS Recognised)",
  "📋 Republic Day Celebrations - View Gallery",
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
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
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
              height={800}
              {...(i === 0 ? {} : { loading: "lazy" as const })}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground drop-shadow-lg">
                {slide.caption}
              </h2>
            </div>
          </div>
        ))}
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === current ? "bg-accent scale-125" : "bg-primary-foreground/50"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="bg-ticker overflow-hidden py-2">
        <div className="ticker-scroll flex whitespace-nowrap gap-12">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-sm font-medium text-primary-foreground px-4">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
