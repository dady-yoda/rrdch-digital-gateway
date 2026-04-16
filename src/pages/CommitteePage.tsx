import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SpotlightCard from "@/components/SpotlightCard";
import { Users, ChevronRight, ShieldAlert, Heart, Scale, GraduationCap, ClipboardCheck, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const committees = [
  {
    name: "Anti-Ragging Committee",
    description:
      "Statutory committee mandated by the UGC to prevent, prohibit and punish ragging. Ensures a secure environment for every student.",
    href: "/committee/anti-ragging",
    internal: true,
    highlight: true,
    icon: ShieldAlert,
  },
  {
    name: "Internal Complaints (ICC)",
    description:
      "Upholding dignity and safety. Redressing complaints related to sexual harassment in compliance with national mandates.",
    href: "#",
    internal: true,
    highlight: false,
    icon: Scale,
  },
  {
    name: "Student Grievance",
    description:
      "A fair and transparent platform for academic and non-academic grievance resolution with institutional accountability.",
    href: "#",
    internal: true,
    highlight: false,
    icon: Heart,
  },
  {
    name: "Ethics Committee",
    description:
      "Ensuring the highest standards of integrity in research, clinical practices, and institutional academic affairs.",
    href: "#",
    internal: true,
    highlight: false,
    icon: ClipboardCheck,
  },
  {
    name: "Examination Board",
    description:
      "Overseeing the scheduling, conduct, and fair evaluation of all university and internal assessment processes.",
    href: "#",
    internal: true,
    highlight: false,
    icon: GraduationCap,
  },
  {
    name: "Cultural Committee",
    description:
      "Fostering creativity and talent through extracurricular engagement, community festivals, and student-led events.",
    href: "#",
    internal: true,
    highlight: false,
    icon: Palette,
  },
];

const CommitteePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".committee-card", {
        scrollTrigger: {
          trigger: ".committee-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20 overflow-hidden">
        <PageHero
          title="Institutional Committees"
          subtitle="Forming the backbone of institutional integrity, safety, and student welfare at RRDCH."
          breadcrumbs={[{ label: "Committees" }]}
        />

        <section className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl font-heading font-black text-foreground mb-6">
              Upholding <span className="text-primary italic">Excellence</span> through Accountability.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              In strict adherence to regulatory bodies and institutional values, RRDCH has established various 
              statutory and welfare committees. These bodies ensure the well-being, rights, and academic development 
              of our diverse community.
            </p>
          </div>

          <div className="committee-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((c, i) => {
              const Icon = c.icon;
              const CardContent = (
                <SpotlightCard
                  className={`committee-card bg-card border rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full ${
                    c.highlight
                      ? "border-primary/40 ring-1 ring-primary/10 shadow-primary/5"
                      : "border-border"
                  }`}
                  spotlightColor={c.highlight ? "rgba(84, 107, 65, 0.22)" : "rgba(84, 107, 65, 0.12)"}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                        c.highlight ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-primary/5 text-primary"
                      }`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    {c.highlight && (
                      <span className="text-[10px] uppercase tracking-widest font-black py-1 px-3 bg-primary/10 text-primary rounded-full">
                        Statutory
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-heading font-extrabold text-xl text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    {c.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-4 transition-all">
                    {c.href !== "#" ? "Explore Details" : "Learn More"} 
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </SpotlightCard>
              );

              return c.href !== "#" && c.internal ? (
                <Link key={c.name} to={c.href} className="group block h-full">
                  {CardContent}
                </Link>
              ) : (
                <div key={c.name} className="group block h-full opacity-70 hover:opacity-100 transition-opacity">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </section>

        {/* Global Compliance Note */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-muted/30 border border-border rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h4 className="text-2xl font-heading font-bold mb-4">Dedicated to a <span className="text-primary">Safe Campus</span></h4>
              <p className="text-muted-foreground italic">
                "Our committees work round-the-clock to ensure that every student's journey at RRDCH is not just academically enriching, but environmentally safe and ethically sound."
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="font-bold text-foreground">Established 2001</div>
                <div className="text-muted-foreground">Certified Compliance</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default CommitteePage;
