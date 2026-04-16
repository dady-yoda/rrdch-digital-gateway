import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SpotlightCard from "@/components/SpotlightCard";
import { departments } from "@/data/departmentsData";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const DepartmentsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dept-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });
      
      gsap.from(".heading-animate", {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen">
        <PageHero
          title="Departments"
          subtitle="Specialized clinical and academic excellence across 9 core dental disciplines."
          breadcrumbs={[{ label: "Departments" }]}
        />

        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mb-16 heading-animate">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Academic Excellence</p>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6 leading-tight">
              Our Clinical <span className="text-primary">Specialties</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Each department at RRDCH is equipped with state-of-the-art infrastructure and led by 
              distinguished faculty, providing a perfect blend of high-quality patient care and 
              advanced clinical training for our students.
            </p>
          </div>

          {/* Departments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Link 
                key={dept.id} 
                to={`/departments/${dept.slug}`}
                className="dept-card"
              >
                <SpotlightCard className="h-full flex flex-col p-8 group hover:-translate-y-2 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <dept.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {dept.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {dept.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:gap-4 transition-all duration-300">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Clinical Footfall Section */}
        <section className="bg-muted/30 py-20 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-heading font-black text-foreground mb-4">
                  Clinical <span className="text-primary">Impact</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  With over 250 modern dental chairs and an average daily footfall of 450+ patients, 
                  our departments provide students with unparalleled clinical exposure across all 
                  specialties.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card border border-border p-6 rounded-2xl text-center">
                    <p className="text-4xl font-black text-primary mb-1">450+</p>
                    <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Daily Patients</p>
                  </div>
                  <div className="bg-card border border-border p-6 rounded-2xl text-center">
                    <p className="text-4xl font-black text-primary mb-1">250+</p>
                    <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">Dental Units</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-primary/5 rounded-3xl p-1 aspect-video overflow-hidden border border-primary/10">
                  <img 
                    src="https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/clinics-header.jpg" 
                    alt="Clinical Facility"
                    className="w-full h-full object-cover rounded-[22px]"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-8 rounded-2xl shadow-xl hidden md:block">
                  <p className="text-2xl font-black">NAAC A+</p>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-70">Accredited Institution</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default DepartmentsPage;
