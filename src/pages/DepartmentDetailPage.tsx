import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { departments } from "@/data/departmentsData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  CheckCircle2, 
  ChevronRight, 
  Users, 
  Microscope, 
  Target, 
  Star,
  ArrowLeft
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DepartmentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const dept = departments.find(d => d.slug === slug);

  useEffect(() => {
    if (!dept) {
      navigate("/departments");
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".detail-animate", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
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
  }, [slug, dept, navigate]);

  if (!dept) return null;

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20 overflow-hidden">
        <PageHero
          title={dept.name}
          subtitle="Advanced clinical specialty and academic excellence."
          breadcrumbs={[
            { label: "Departments", href: "/departments" },
            { label: dept.name }
          ]}
        />

        <div className="container mx-auto px-4 py-20">
          <Link 
            to="/departments" 
            className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-12 hover:gap-3 transition-all group"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Departments
          </Link>

          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Overview Section */}
              <section className="detail-animate">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-heading font-black text-foreground uppercase tracking-tight">Overview</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {dept.description}
                </p>
                <div className="bg-muted/30 border border-border rounded-3xl p-10 relative overflow-hidden">
                   <dept.icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-primary opacity-[0.03] pointer-events-none" />
                   <p className="text-xl font-heading font-semibold text-foreground relative z-10 leading-relaxed italic border-l-4 border-primary pl-8">
                     "Our commitment is to provide the highest standard of specialized dental care while fostering an environment of clinical rigour and ethical practice."
                   </p>
                </div>
              </section>

              {/* Specialties Section */}
              <section className="detail-animate">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Star className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-heading font-black text-foreground uppercase tracking-tight">Key Specialties</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {dept.specialties.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-bold text-foreground/80">{s}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Research Section */}
              <section className="detail-animate">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-heading font-black text-foreground uppercase tracking-tight">Research Focus</h2>
                </div>
                <div className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-14 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/[0.03] rounded-full w-[400px] h-[400px] -bottom-20 -right-20 blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125" />
                  <p className="text-2xl font-heading font-semibold leading-relaxed relative z-10">
                    {dept.researchFocus}
                  </p>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8 sidebar-animate">
              {/* Faculty Card */}
              <div className="bg-card border border-border rounded-3xl p-8 sticky top-24 shadow-soft">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-heading font-bold text-foreground uppercase tracking-tight">Leadership</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="relative aspect-square rounded-2xl bg-muted overflow-hidden mb-6 border border-border">
                    <img 
                      src={`https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/${dept.id}-hod.jpg`} 
                      alt={dept.hod}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/dummy-doc.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Head of Department</p>
                    <h3 className="text-xl font-heading font-black text-foreground">{dept.hod}</h3>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      Specialist Lead with over 20+ years of clinical and academic expertise in {dept.name}.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border flex flex-col gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Internal Links</p>
                  <Link to="/about-us/council" className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-all group">
                    <span className="text-sm font-heading font-semibold">Faculty List</span>
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/feedback" className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-all group">
                    <span className="text-sm font-heading font-semibold">Contact Dept</span>
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  </Link>
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
