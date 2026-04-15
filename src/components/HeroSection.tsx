import { useState, useEffect } from "react";
import heroRank from "@/assets/rank.jpg";
import heroRank2 from "@/assets/rank2.jpg";
import heroDelegates1 from "@/assets/delegates1.jpg";
import heroDelegates2 from "@/assets/delegates2.jpg";
import heroAnnualConvocation from "@/assets/annual convocation.jpg";
import heroRussia from "@/assets/russia.jpg";
import heroFaculty from "@/assets/faculty.jpg";
import heroStudents from "@/assets/students.jpg";
import heroInauguration1 from "@/assets/inauguration1.jpg";
import heroInauguration2 from "@/assets/inauguration2.jpg";
import heroInauguration3 from "@/assets/inauguration3.jpg";
import heroInauguration4 from "@/assets/inauguration4.jpg";
import heroInauguration5 from "@/assets/inauguration5.jpg";
import heroInauguration6 from "@/assets/inauguration6.jpg";

const slides = [
  { src: heroRank, alt: "Top-ranking students of RRDCH being recognized for academic excellence", caption: "Celebrating Academic Toppers and Achievers" },
  { src: heroRank2, alt: "High-achieving students of RRDCH recognized as rank holders", caption: "Where Talent Meets Achievement" },
  { src: heroDelegates1, alt: "RRDCH representatives with international delegates during an official meeting", caption: "Strengthening Global Academic Partnerships" },
  { src: heroDelegates2, alt: "Formal meeting between RRDCH officials and international delegates at a conference table", caption: "Fostering International Collaboration in Dental Education" },
  { src: heroAnnualConvocation, alt: "Annual convocation ceremony at RRDCH", caption: "Milestones Achieved" },
  { src: heroRussia, alt: "Academic partnership interaction between RRDCH and Kursk State Medical University, Russia", caption: "Bridging Global Excellence in Healthcare Education" },
  { src: heroFaculty, alt: "Experienced faculty members at RRDCH", caption: "Guided by Expert Faculty" },
  { src: heroStudents, alt: "RRDCH Graduation ceremony", caption: "Shaping Future Dental Leaders" },
  { src: heroInauguration1, alt: "Dignitaries lighting the ceremonial lamp during an inauguration event at RRDCH", caption: "Marking Auspicious Beginnings with Tradition" },
  { src: heroInauguration2, alt: "Faculty and dignitaries in academic robes participating in lamp lighting ceremony", caption: "Upholding Academic Traditions and Values" },
  { src: heroInauguration3, alt: "Dignitaries presenting an award to a student during a formal ceremony at RRDCH", caption: "Recognizing Excellence and Achievement" },
  { src: heroInauguration4, alt: "Felicitation ceremony honoring a distinguished guest at RRDCH event", caption: "Honoring Distinguished Contributions" },
  { src: heroInauguration5, alt: "Dignitaries presenting a bouquet during a felicitation ceremony at RRDCH", caption: "Celebrating Leadership and Service" },
  { src: heroInauguration6, alt: "Graduation ceremony with students receiving awards on stage at RRDCH convocation", caption: "Celebrating Academic Milestones" },
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
