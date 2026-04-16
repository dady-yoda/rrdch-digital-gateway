import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { departmentsData } from "@/data/departmentsData";
import { 
  CheckCircle2, 
  Users, 
  Building2, 
  ChevronRight,
  ArrowLeft,
  GraduationCap,
  Star,
  Microscope,
  Target
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DepartmentDetailPage = () => {
  // Support both /department/:id and /departments/:slug
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const department = departmentsData.find(d => d.id === (id || slug) || d.slug === (slug || id));

  useEffect(() => {
    if (!department) return;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Fade in sections
      gsap.utils.toArray<HTMLElement>(".dept-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

      // Stagger faculty cards
      gsap.from(".faculty-card", {
        scrollTrigger: {
          trigger: ".faculty-grid",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".sidebar-animate", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [department]);

  if (!department) {
    return <Navigate to="/404" replace />;
  }

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20">
        <PageHero
          title={department.name}
          subtitle="RajaRajeswari Dental College & Hospital"
          breadcrumbs={[
            { label: "Departments", href: "/departments" },
            { label: department.name }
          ]}
        />

        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link 
            to="/departments" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Departments
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Overview */}
              <section className="dept-section">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-foreground">Department Overview</h2>
                </div>
                <div className="prose prose-green dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {department.overview}
                  </p>
                </div>
              </section>

              {/* Objectives */}
              <section className="dept-section bg-muted/30 rounded-3xl p-8 border border-border">
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Key Objectives
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {department.objectives.map((obj, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 bg-background/50 rounded-xl border border-border/50">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{obj}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Specialties */}
              {department.specialties && department.specialties.length > 0 && (
                <section className="dept-section">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Star className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">Key Specialties</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {department.specialties.map((s, i) => (
                      <div key={i} className="flex items-center gap-4 bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all group">
                        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="font-heading font-bold text-foreground/80">{s}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Facilities */}
              <section className="dept-section">
                <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-primary" />
                  Advanced Facilities
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {department.facilities.map((fac, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-foreground/90">{fac}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Research Focus */}
              {department.researchFocus && (
                <section className="dept-section">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground">Research Focus</h2>
                  </div>
                  <div className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-14 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/[0.03] rounded-full w-[400px] h-[400px] -bottom-20 -right-20 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125" />
                    <p className="text-2xl font-heading font-semibold leading-relaxed relative z-10">
                      {department.researchFocus}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar - Faculty List */}
            <div className="lg:col-span-1 sidebar-animate">
              <div className="sticky top-24 space-y-8">
                <div className="bg-primary text-primary-foreground rounded-3xl p-8 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2 relative z-10">
                    <Users className="w-5 h-5" />
                    Department Faculty
                  </h3>
                  
                  <div className="faculty-grid space-y-4 relative z-10">
                    {department.faculty.map((member, i) => (
                      <div 
                        key={i} 
                        className="faculty-card bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/20 transition-all cursor-default"
                      >
                        <h4 className="font-bold text-sm">{member.name}</h4>
                        <p className="text-xs text-primary-foreground/70 uppercase tracking-wider mt-1">{member.designation}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold">Academic Excellence</p>
                        <p className="text-primary-foreground/60">DCI Recognized Specialized Training</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted p-8 rounded-3xl border border-border">
                  <h4 className="font-bold mb-4">Quick Contact</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    For specific queries regarding {department.name}, please contact the department office.
                  </p>
                  <a 
                    href="/feedback" 
                    className="w-full inline-flex items-center justify-center gap-2 bg-background text-foreground border border-border py-3 rounded-xl text-sm font-bold hover:bg-muted transition-colors"
                  >
                    Send Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DepartmentDetailPage;
