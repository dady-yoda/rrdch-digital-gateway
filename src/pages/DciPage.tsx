import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { 
  Building2, 
  Users, 
  BookOpen, 
  Stethoscope, 
  FileText, 
  ChevronRight,
  ExternalLink,
  ClipboardCheck,
  GraduationCap
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Stethoscope, label: "Dental Units", value: "300+" },
  { icon: Building2, label: "Specialty Depts", value: "11" },
  { icon: Users, label: "Faculty Members", value: "125+" },
  { icon: GraduationCap, label: "Annual Intake", value: "150+" },
];

const mandatoryDocs = [
  { title: "BDS Intake Certificate", link: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/DCI-BDS.pdf" },
  { title: "MDS Intake Approval", link: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/DCI-MDS.pdf" },
  { title: "Staff List (Faculty)", link: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/Faculty.pdf" },
  { title: "Clinical Data Report", link: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/Clinical-Data.pdf" },
  { title: "Infrastructure Report", link: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/Infrastructure.pdf" },
  { title: "RGUHS Affiliation", link: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/Affiliation.pdf" },
];

const intakeData = [
  { course: "BDS (Undergraduate)", seats: "100", duration: "4 Years + 1 Year Internship" },
  { course: "MDS (Postgraduate)", seats: "44", duration: "3 Years" },
  { course: "Ph.D Programs", seats: "10+", duration: "3-5 Years" },
];

const DciPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header and Stats entry
      gsap.from(".dci-stat-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      // Sections reveal
      gsap.utils.toArray<HTMLElement>(".dci-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
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
          title="DCI Mandatory Disclosure"
          subtitle="Official regulatory data and compliance documents as mandated by the Dental Council of India."
          breadcrumbs={[{ label: "DCI Disclosure" }]}
        />

        {/* Global Stats Bar */}
        <section className="container mx-auto px-4 -mt-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="dci-stat-card bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col items-center text-center shadow-lg backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-heading font-black text-foreground mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mandatory Documentation Grid */}
        <section className="dci-section container mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-heading font-black text-foreground mb-4">Official <span className="text-primary">Documentation</span></h2>
              <p className="text-muted-foreground text-lg italic border-l-4 border-primary/20 pl-6">
                Direct access to statutory PDFs and institutional records for public disclosure.
              </p>
            </div>
            <div className="hidden md:block">
              <ClipboardCheck className="w-16 h-16 text-primary/10" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mandatoryDocs.map((doc, i) => (
              <a 
                key={i} 
                href={doc.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between bg-card border border-border p-6 rounded-2xl hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-heading font-bold text-foreground/80 group-hover:text-primary transition-colors">{doc.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                
                {/* Visual hover cue */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>
        </section>

        {/* Academic Profile */}
        <section className="dci-section container mx-auto px-4 py-12">
          <div className="bg-muted/30 rounded-[3rem] border border-border overflow-hidden">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 p-12 md:p-20 bg-primary text-primary-foreground">
                <h3 className="text-4xl font-heading font-black mb-6">Institutional <span className="text-accent underline underline-offset-8">Intake</span></h3>
                <p className="text-primary-foreground/70 mb-10 leading-relaxed">
                  RRDCH ensures a highly regulated and high-quality learning environment with seat allocations approved by the Dental Council of India.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 italic">
                    <span className="text-sm font-light">"Quality is not an act, it is a habit."</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 p-12 md:p-20">
                <div className="space-y-8">
                  {intakeData.map((data, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border last:border-0 last:pb-0">
                      <div>
                        <h4 className="text-xl font-heading font-bold text-foreground mb-1">{data.course}</h4>
                        <p className="text-sm text-muted-foreground">{data.duration}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="px-6 py-3 rounded-full bg-secondary/10 text-secondary font-black text-xl">
                          {data.seats} <span className="text-[10px] uppercase tracking-tighter opacity-70">Seats</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Info */}
        <section className="dci-section container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-heading font-bold mb-8 flex items-center justify-center gap-3">
              <CheckCircle2 className="text-primary w-6 h-6" /> Affiliation & Compliance
            </h3>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="p-8 rounded-3xl bg-card border border-border shadow-soft">
                <h4 className="font-heading font-bold text-lg mb-4 text-primary">University Affiliation</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rajarajeswari Dental College & Hospital is permanently affiliated to the **Rajiv Gandhi University of Health Sciences (RGUHS)**, Karnataka, Bengaluru.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-card border border-border shadow-soft">
                <h4 className="font-heading font-bold text-lg mb-4 text-primary">DCI Recognition</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The institution is recognized by the **Dental Council of India** and the **Ministry of Health & Family Welfare**, Government of India, for both BDS and MDS programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-10">
          <p className="text-muted-foreground text-sm mb-6">Looking for even more technical data?</p>
          <a 
            href="https://www.rrdch.org/dci-mandatory/" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:scale-105 transition-transform"
          >
            Access Legacy Archive <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </PageLayout>
  );
};

// Helper component for re-use
const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);

export default DciPage;
