import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Clock, ExternalLink, Info, BookOpen, UserCheck, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const programs = ["BDS I Year", "BDS II Year", "BDS III Year", "BDS Final Year", "MDS"];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const periods = [
  "08:30–09:30",
  "09:30–10:30",
  "10:30–11:30",
  "11:30–12:30",
  "12:30–01:30",
  "01:30–02:30",
  "02:30–03:30",
  "03:30–04:30",
];

const sampleTimetable: Record<string, string[]> = {
  Monday:    ["Gen Anatomy",  "Gen Anatomy",  "Gen Physiology", "Biochemistry", "LUNCH", "Dental Anatomy", "Dental Anatomy", "PRE-CLINICAL"],
  Tuesday:   ["Gen Physiology","Gen Physiology","CLINICALS",      "Gen Anatomy",  "LUNCH", "Dental Materials","Dental Materials","PRE-CLINICAL"],
  Wednesday: ["Biochemistry",  "Biochemistry", "Gen Anatomy",    "Gen Physiology","LUNCH", "Dental Anatomy", "COMMUNITY",     "PRE-CLINICAL"],
  Thursday:  ["Gen Anatomy",  "Dental Anatomy","CLINICALS",      "Biochemistry",  "LUNCH", "Gen Physiology", "Gen Physiology", "PRE-CLINICAL"],
  Friday:    ["Biochemistry",  "PRE-CLINICAL", "Gen Anatomy",    "Gen Physiology","LUNCH", "Dental Materials","Dental Anatomy", "CLINICALS"],
  Saturday:  ["Dental Anatomy","Biochemistry", "PRE-CLINICAL",   "CLINICALS",     "LUNCH", "LIBRARY",       "SPORTS",        "—"],
};

const cellColor = (label: string) => {
  if (label === "LUNCH") return "bg-orange-50 text-orange-600 font-bold tracking-widest";
  if (label === "CLINICALS") return "bg-primary/10 text-primary font-bold";
  if (label === "PRE-CLINICAL") return "bg-blue-50 text-blue-600 font-bold";
  if (label === "—") return "text-muted-foreground/30";
  return "text-foreground font-medium";
};

const TimetablePage = () => {
  const [activeTab, setActiveTab] = useState("BDS I Year");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh animations on tab change
      gsap.from(".timetable-row", {
        opacity: 0,
        x: -20,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20 overflow-hidden">
        <PageHero
          title="Academic Timetable"
          subtitle="A structured approach to clinical excellence and theoretical mastery across all departments."
          breadcrumbs={[
            { label: "Schedule", href: "/schedule" },
            { label: "Timetable" }
          ]}
        />

        <section className="container mx-auto px-4 py-24">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Calendar className="w-6 h-6" />
                <span className="text-xs font-black uppercase tracking-widest">Active Schedule</span>
              </div>
              <h2 className="text-4xl font-heading font-black text-foreground mb-4">
                Structured <span className="text-primary italic">Learning Plan</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6">
                Redefining the standard of dental education through balanced clinical rotations and rigorous academic schedules.
              </p>
            </div>
            
            {/* Quick Stats Overlay */}
            <div className="hidden lg:flex gap-4">
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-foreground">50+</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Weekly Hours</div>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-black text-foreground">100%</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Clinical Credits</div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Tab Switcher */}
          <div className="flex flex-wrap gap-2 mb-10 bg-muted/50 p-2 rounded-2xl w-fit border border-border">
            {programs.map((p) => (
              <button
                key={p}
                onClick={() => setActiveTab(p)}
                className={`px-6 py-3 rounded-xl text-sm font-heading font-black transition-all duration-300 ${
                  activeTab === p
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                    : "text-muted-foreground hover:bg-white hover:text-primary"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Timetable Scroll Group */}
          <div className="group relative">
            {/* Decorative background accent */}
            <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-1 scale-[1.02] -z-10 blur-xl opacity-50" />
            
            <div className="overflow-x-auto rounded-[2.5rem] border border-border bg-card shadow-2xl backdrop-blur-sm">
              <table className="w-full text-xs min-w-[900px] border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-8 py-6 font-heading font-black uppercase tracking-widest text-sm border-r border-white/10">Day</th>
                    {periods.map((p) => (
                      <th key={p} className="text-center px-4 py-6 font-heading font-black whitespace-nowrap border-r border-white/5 last:border-0 italic opacity-80">
                        {p}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day, i) => (
                    <tr key={day} className={`timetable-row border-t border-border group/row hover:bg-primary/5 transition-colors ${i % 2 !== 0 ? "bg-muted/10" : "bg-white"}`}>
                      <td className="px-8 py-5 font-heading font-black text-foreground uppercase tracking-wider border-r border-border group-hover/row:text-primary transition-colors">
                        {day}
                      </td>
                      {sampleTimetable[day].map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-5 text-center border-r border-border/5 last:border-0 transition-transform group-hover/row:scale-[1.02] ${cellColor(cell)}`}
                        >
                          <span className="block min-w-[80px]">{cell}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground flex items-center gap-2 max-w-xl italic">
              <Info className="w-4 h-4 text-primary shrink-0" />
              Note: This schedule represents academic year 2025-26. Clinical rotations for PG students (MDS) are subject to hospital emergencies and case sensitivity.
            </p>
            <a 
              href="https://www.rrdch.org/time-table/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform"
            >
              Access Legacy Archive <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default TimetablePage;
