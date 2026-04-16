import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { 
  Trophy, 
  Star, 
  Globe, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const nationalAwards = [
  {
    icon: Award,
    title: "NAAC A+ Accredited",
    body: "National Assessment and Accreditation Council",
    description: "The highest grade awarded by NAAC, recognizing RRDCH's commitment to quality education and infrastructure.",
    color: "hsl(100, 24%, 34%)"
  },
  {
    icon: ShieldCheck,
    title: "NABH Accredited",
    body: "National Accreditation Board for Hospitals",
    description: "First dental college in Karnataka to achieve NABH accreditation, signifying global standards in healthcare.",
    color: "hsl(95, 25%, 58%)"
  },
  {
    icon: Trophy,
    title: "NIRF Ranked",
    body: "National Institutional Ranking Framework",
    description: "Consistently ranked among the top dental colleges in India by the Ministry of Education (MoE).",
    color: "hsl(35, 40%, 76%)"
  }
];

const internationalAffiliations = [
  {
    title: "RCPSG (UK)",
    body: "Royal College of Physicians and Surgeons of Glasgow",
    description: "Recognized international center for MFDS Part 1 & 2 examinations, providing global pathways for students.",
    icon: Globe
  },
  {
    title: "SLMC Recognized",
    body: "Sri Lanka Medical Council",
    description: "Approved for medical and dental education, allowing graduates to practice in Sri Lanka after licensure.",
    icon: Star
  },
  {
    title: "IAO Accredited",
    body: "International Accreditation Organisation",
    description: "Global recognition affirming parity in institutional quality and academic standards.",
    icon: CheckCircle2
  },
  {
    title: "ISO 9001:2015",
    body: "Quality Management System",
    description: "Certified for maintaining standardized processes across academic and clinical operations.",
    icon: ShieldCheck
  }
];

const RecognitionsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry for cards
      gsap.utils.toArray<HTMLElement>(".recognition-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i % 3 * 0.1,
          ease: "power3.out"
        });
      });

      // Heading fade-ins
      gsap.utils.toArray<HTMLElement>(".section-heading").forEach((heading) => {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: "top 95%",
          },
          opacity: 0,
          x: -20,
          duration: 1,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20 overflow-hidden">
        <PageHero
          title="Institutional Recognitions"
          subtitle="Honouring a legacy of excellence through global accreditations and national rankings."
          breadcrumbs={[{ label: "Recognitions" }]}
        />

        {/* National Accreditations */}
        <section className="container mx-auto px-4 py-24">
          <div className="section-heading mb-16 max-w-2xl">
            <h2 className="text-4xl font-heading font-black text-foreground mb-4">National <span className="text-primary">Benchmarks</span></h2>
            <p className="text-muted-foreground text-lg">
              Recognized by the highest regulatory bodies in India for clinical innovation and academic rigour.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {nationalAwards.map((award, i) => (
              <div 
                key={i} 
                className="recognition-card group relative bg-card border border-border rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity translate-x-10 -translate-y-6"
                  style={{ color: award.color }}
                >
                  <award.icon className="w-full h-full" />
                </div>
                
                <div className="relative z-10">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${award.color}15`, color: award.color }}
                  >
                    <award.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2">{award.title}</h3>
                  <p className="text-xs font-heading font-bold uppercase tracking-widest mb-6 opacity-60">{award.body}</p>
                  <p className="text-muted-foreground leading-relaxed italic border-l-2 pl-6" style={{ borderColor: award.color }}>
                    "{award.description}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* International Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="section-heading text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">Global <span className="text-accent">Footprint</span></h2>
              <p className="text-primary-foreground/70 text-lg">
                Our certifications from international medical and dental councils ensure your degree carries weight across continents.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {internationalAffiliations.map((aff, i) => (
                <div key={i} className="recognition-card bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-8 backdrop-blur-sm transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-6 text-accent group-hover:rotate-12 transition-transform">
                    <aff.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-heading font-bold text-lg mb-1">{aff.title}</h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-primary-foreground/40 mb-4">{aff.body}</p>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed font-light">
                    {aff.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regulatory Compliance */}
        <section className="container mx-auto px-4 py-24">
          <div className="bg-muted/30 rounded-[3rem] p-12 md:p-20 border border-border">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="section-heading">
                <h2 className="text-3xl font-heading font-black mb-6">Regulatory <span className="text-primary">Compliance</span></h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  RRDCH is fully recognized and approved by all statutory bodies of the Government of India and the Government of Karnataka.
                </p>
                <div className="space-y-4">
                  {[
                    "Dental Council of India (DCI) Recognized",
                    "Government of Karnataka Approved",
                    "Rajiv Gandhi University of Health Sciences (RGUHS) Affiliated",
                    "MoH&FW, Govt. of India Permitted"
                  ].map((text) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm text-foreground/80">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-card p-8 rounded-3xl border border-border shadow-soft flex flex-col items-center text-center">
                    <p className="text-4xl font-black text-primary mb-2">1992</p>
                    <p className="text-xs uppercase font-bold tracking-wider opacity-50">Established</p>
                  </div>
                  <div className="bg-white dark:bg-card p-8 rounded-3xl border border-border shadow-soft flex flex-col items-center text-center translate-y-8">
                    <p className="text-4xl font-black text-secondary mb-2">A+</p>
                    <p className="text-xs uppercase font-bold tracking-wider opacity-50">NAAC Grade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold mb-6">Want to learn more about our quality standards?</h3>
            <div className="flex justify-center gap-4">
              <a 
                href="/accreditation/naac" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-bold hover:scale-105 transition-transform"
              >
                View NAAC Reports <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="/about-us" 
                className="inline-flex items-center gap-2 bg-white border border-border text-foreground px-8 py-4 rounded-xl font-heading font-bold hover:bg-muted transition-colors"
              >
                Institutional Trust <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default RecognitionsPage;
