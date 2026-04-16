<<<<<<< HEAD
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
  GraduationCap
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
=======
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
>>>>>>> 9e863b9c595b0d41720b00a3824c271b5154965f

gsap.registerPlugin(ScrollTrigger);

const DepartmentDetailPage = () => {
<<<<<<< HEAD
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const department = departmentsData.find(d => d.id === id);

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
=======
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
>>>>>>> 9e863b9c595b0d41720b00a3824c271b5154965f
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
<<<<<<< HEAD
  }, [department, id]);

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
            { label: "Departments", href: "#" },
            { label: department.name }
          ]}
        />

        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Overview */}
              <section className="dept-section">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <department.icon className="w-6 h-6" />
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
=======
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
>>>>>>> 9e863b9c595b0d41720b00a3824c271b5154965f
                    </div>
                  ))}
                </div>
              </section>

<<<<<<< HEAD
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
=======
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
>>>>>>> 9e863b9c595b0d41720b00a3824c271b5154965f
                </div>
              </section>
            </div>

<<<<<<< HEAD
            {/* Sidebar - Faculty List */}
            <div className="lg:col-span-1">
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
=======
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
>>>>>>> 9e863b9c595b0d41720b00a3824c271b5154965f
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
