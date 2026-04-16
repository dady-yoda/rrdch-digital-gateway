import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { coursesData } from "@/data/coursesData";
import { 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Star
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const course = coursesData.find(c => c.id === id);

  useEffect(() => {
    if (!course) return;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Fade in sections
      gsap.utils.toArray<HTMLElement>(".course-section").forEach((section) => {
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

      // Special animation for the eligibility card
      gsap.from(".eligibility-box", {
        scrollTrigger: {
          trigger: ".eligibility-box",
          start: "top 80%",
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [course, id]);

  if (!course) {
    return <Navigate to="/404" replace />;
  }

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20">
        <PageHero
          title={course.name}
          subtitle={course.degree}
          breadcrumbs={[
            { label: "Courses", href: "#" },
            { label: course.id.toUpperCase() }
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
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Overview */}
              <section className="course-section">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <course.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-foreground">Course Overview</h2>
                    <div className="flex items-center gap-2 text-primary font-heading font-bold text-sm mt-1 uppercase tracking-wider">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {course.overview}
                </p>
              </section>

              {/* Course Features */}
              <section className="course-section grid md:grid-cols-2 gap-4">
                {course.features.map((feature, i) => (
                  <div key={i} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Star className="w-5 h-5 fill-primary/20" />
                      </div>
                      <span className="font-heading font-bold text-foreground/90">{feature}</span>
                    </div>
                  </div>
                ))}
              </section>

              {/* Academic Rigor Info */}
              <div className="course-section p-10 rounded-[2.5rem] bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <ShieldCheck className="w-10 h-10 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-heading font-bold mb-2">Recognized Excellence</h4>
                    <p className="opacity-70 text-sm leading-relaxed max-w-xl">
                      Our curriculum is meticulously designed in accordance with the Dental Council of India (DCI) 
                      and Rajiv Gandhi University of Health Sciences (RGUHS) standards, ensuring that our graduates 
                      are prepared for global clinical practice.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Eligibility */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="eligibility-box bg-card border border-border rounded-3xl p-8 shadow-soft">
                  <h3 className="text-xl font-heading font-bold mb-8 flex items-center gap-3">
                    <FileCheck2 className="w-6 h-6 text-primary" />
                    Admission Eligibility
                  </h3>
                  
                  <div className="space-y-6">
                    {course.eligibility.map((item, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        <p className="text-sm text-foreground/80 leading-snug">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-border">
                    <p className="text-xs text-muted-foreground italic mb-6">
                      * Admission criteria are subject to change as per regulatory body notifications.
                    </p>
                    <a 
                      href="/brochure" 
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl text-sm font-bold hover:scale-105 transition-transform"
                    >
                      Download Prospectus <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-8 rounded-3xl border-2 border-dashed border-border flex flex-col items-center text-center">
                  <p className="text-sm font-medium mb-4">Have questions about the admission process?</p>
                  <a 
                    href="/contact-us" 
                    className="text-primary font-bold hover:underline"
                  >
                    Contact Admission Office &rarr;
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

export default CourseDetailPage;
