import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SpotlightCard from "@/components/SpotlightCard";
import { Calendar, Clock, ChevronRight, BookOpen, Presentation, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scheduleOptions = [
  {
    icon: Calendar,
    title: "Calendar of Events",
    desc: "Academic calendar, cultural fests, national celebrations, and institutional events for the current academic year.",
    href: "/schedule/calendar",
    accent: "text-primary",
    bgColor: "bg-primary/5",
  },
  {
    icon: Clock,
    title: "Timetable",
    desc: "Department-wise lecture, practical, and clinical timetables for BDS and MDS programmes.",
    href: "/schedule/timetable",
    accent: "text-secondary",
    bgColor: "bg-secondary/5",
  },
];

const SchedulePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".schedule-card", {
        scrollTrigger: {
          trigger: ".schedule-grid",
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
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
          title="Institutional Schedule"
          subtitle="Explore our academic milestones, cultural timeline, and department-wise schedules."
          breadcrumbs={[{ label: "Schedule" }]}
        />

        <section className="container mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-heading font-black text-foreground mb-6">
                Planning for <span className="text-primary italic">Academic Success</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                RRDCH ensures structured learning through meticulously planned academic calendars and clinical timetables. 
                Stay informed about every upcoming event, lecture series, and examination milestone.
              </p>
            </div>
            <div className="hidden md:flex flex-1 justify-end gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Presentation className="w-8 h-8" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                <MapPin className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="schedule-grid grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {scheduleOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <Link
                  key={opt.title}
                  to={opt.href}
                  className="group block"
                >
                  <SpotlightCard 
                    className="schedule-card bg-card border border-border rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col" 
                    spotlightColor="rgba(84, 107, 65, 0.2)"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${opt.bgColor} ${opt.accent} flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="font-heading font-black text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                      {opt.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {opt.desc}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-sm font-black text-primary uppercase tracking-widest group-hover:gap-4 transition-all">
                      Access Schedule <ChevronRight className="w-5 h-5" />
                    </div>
                  </SpotlightCard>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Global Planning Note */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl font-heading font-black mb-6">Looking for a specific <span className="text-accent underline underline-offset-8">Departmental</span> schedule?</h3>
              <p className="text-primary-foreground/70 text-lg mb-10">
                Individual department clinical rotations and special seminar schedules are updated weekly on our internal portal.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/20 text-sm font-bold">
                  BDS Clinicals
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/20 text-sm font-bold">
                  Post-Graduate MDS
                </div>
                <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/20 text-sm font-bold">
                  Internship Batches
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default SchedulePage;
