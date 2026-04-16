import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Calendar as CalendarIcon, MapPin, ExternalLink, Filter, Share2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { date: "01", month: "Jun", title: "College Re-Opening — AY 2025-26", type: "Academic", venue: "Main Campus" },
  { date: "10", month: "Jun", title: "Orientation Programme — New BDS Students", type: "Academic", venue: "Auditorium" },
  { date: "04", month: "Jul", title: "Dental Hygiene Awareness Camp", type: "Outreach", venue: "Community Centre" },
  { date: "15", month: "Aug", title: "Independence Day Celebration", type: "National", venue: "Main Campus" },
  { date: "12", month: "Sep", title: "Annual Sports Meet — Kickoff", type: "Sports", venue: "Sports Ground" },
  { date: "05", month: "Oct", title: "World Dental Day & Guest Lecture", type: "Academic", venue: "Seminar Hall" },
  { date: "14", month: "Nov", title: "Children's Day Free Dental Check-Up Camp", type: "Outreach", venue: "College Hospital" },
  { date: "20", month: "Dec", title: "Annual Cultural Fest — SMILODON", type: "Cultural", venue: "Auditorium" },
  { date: "26", month: "Jan", title: "Republic Day Celebration", type: "National", venue: "Main Campus" },
  { date: "28", month: "Feb", title: "Internal Examinations — BDS Final Year", type: "Examination", venue: "Examination Hall" },
  { date: "15", month: "Mar", title: "Convocation Ceremony", type: "Academic", venue: "Auditorium" },
  { date: "07", month: "Apr", title: "World Health Day Awareness Programme", type: "Outreach", venue: "College Hospital" },
];

const typeColors: Record<string, string> = {
  Academic: "bg-primary/10 text-primary",
  Outreach: "bg-orange-100 text-orange-700",
  National: "bg-blue-100 text-blue-700",
  Sports: "bg-green-100 text-green-700",
  Cultural: "bg-purple-100 text-purple-700",
  Examination: "bg-red-100 text-red-700",
};

const CalendarPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
        scrollTrigger: {
          trigger: ".events-container",
          start: "top 85%",
        },
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -30 : 30),
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20 overflow-hidden">
        <PageHero
          title="Calendar of Events"
          subtitle="A comprehensive timeline of academic milestones, cultural festivities, and institutional goals."
          breadcrumbs={[
            { label: "Schedule", href: "/schedule" },
            { label: "Calendar" }
          ]}
        />

        <section className="container mx-auto px-4 py-24">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Sidebar - Summary & Filters */}
            <div className="lg:w-1/4">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h2 className="text-3xl font-heading font-black text-foreground mb-4">Academic <span className="text-primary">Year</span></h2>
                  <div className="text-5xl font-heading font-black text-primary/10 mb-6">2025-26</div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    Stay synchronized with our institutional heartbeat. From internal assessments to national celebrations.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Filter className="w-3 h-3" /> Event Categories
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(typeColors).map(type => (
                      <span key={type} className={`text-[10px] font-bold px-3 py-1 rounded-full ${typeColors[type]}`}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <button className="flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all">
                    <Share2 className="w-4 h-4" /> Export to Google Calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Timeline Grid */}
            <div className="lg:w-3/4 events-container">
              <div className="space-y-6">
                {events.map((ev, i) => (
                  <div 
                    key={i} 
                    className="event-card group flex flex-col md:flex-row items-center bg-card border border-border rounded-[2rem] overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
                  >
                    {/* Date Block */}
                    <div className="w-full md:w-32 bg-primary group-hover:bg-primary-foreground group-hover:text-primary p-6 flex flex-col items-center justify-center text-primary-foreground transition-colors shrink-0">
                      <span className="text-xs font-black uppercase tracking-tighter opacity-70 mb-1">{ev.month}</span>
                      <span className="text-4xl font-heading font-black tabular-nums">{ev.date}</span>
                    </div>

                    {/* Content Block */}
                    <div className="flex-1 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="max-w-md">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${typeColors[ev.type]}`}>
                            {ev.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {ev.title}
                        </h3>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5 font-medium italic">
                            <MapPin className="w-3 h-3" /> {ev.venue}
                          </span>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <button className="p-4 rounded-2xl bg-muted/50 text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                          <CalendarIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legacy Link CTA */}
              <div className="mt-16 bg-muted/30 border border-border rounded-[2.5rem] p-12 text-center">
                <p className="text-muted-foreground text-sm mb-6 font-medium italic">Looking for historical event data or the legacy archive?</p>
                <a 
                  href="https://www.rrdch.org/calendar-of-events/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:scale-105 transition-transform"
                >
                  Visit Legacy Calendar <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </section> section
      </div>
    </PageLayout>
  );
};

export default CalendarPage;
