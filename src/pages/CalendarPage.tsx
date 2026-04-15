import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const events = [
  { date: "Jun 01", month: "Jun", title: "College Re-Opening — AY 2025-26", type: "Academic", venue: "Main Campus" },
  { date: "Jun 10", month: "Jun", title: "Orientation Programme — New BDS Students", type: "Academic", venue: "Auditorium" },
  { date: "Jul 04", month: "Jul", title: "Dental Hygiene Awareness Camp", type: "Outreach", venue: "Community Centre" },
  { date: "Aug 15", month: "Aug", title: "Independence Day Celebration", type: "National", venue: "Main Campus" },
  { date: "Sep 12", month: "Sep", title: "Annual Sports Meet — Kickoff", type: "Sports", venue: "Sports Ground" },
  { date: "Oct 05", month: "Oct", title: "World Dental Day & Guest Lecture", type: "Academic", venue: "Seminar Hall" },
  { date: "Nov 14", month: "Nov", title: "Children's Day Free Dental Check-Up Camp", type: "Outreach", venue: "College Hospital" },
  { date: "Dec 20", month: "Dec", title: "Annual Cultural Fest — SMILODON", type: "Cultural", venue: "Auditorium" },
  { date: "Jan 26", month: "Jan", title: "Republic Day Celebration", type: "National", venue: "Main Campus" },
  { date: "Feb 28", month: "Feb", title: "Internal Examinations — BDS Final Year", type: "Examination", venue: "Examination Hall" },
  { date: "Mar 15", month: "Mar", title: "Convocation Ceremony", type: "Academic", venue: "Auditorium" },
  { date: "Apr 07", month: "Apr", title: "World Health Day Awareness Programme", type: "Outreach", venue: "College Hospital" },
];

const typeColors: Record<string, string> = {
  Academic: "bg-primary/10 text-primary",
  Outreach: "bg-secondary/20 text-secondary-foreground",
  National: "bg-accent/30 text-accent-foreground",
  Sports: "bg-blue-100 text-blue-700",
  Cultural: "bg-purple-100 text-purple-700",
  Examination: "bg-destructive/10 text-destructive",
};

const CalendarPage = () => (
  <PageLayout>
    <PageHero
      title="Calendar of Events"
      subtitle="Academic year schedule of key events, celebrations, examinations, and outreach programmes"
      breadcrumbs={[
        { label: "Schedule", href: "/schedule" },
        { label: "Calendar of Events" },
      ]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-xl text-foreground">
            Academic Year 2025–26
          </h2>
        </div>
        <a
          href="https://www.rrdch.org/calendar-of-events/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" /> View on old site
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((ev, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex gap-4"
          >
            {/* Date Box */}
            <div className="flex-shrink-0 text-center w-14">
              <div className="bg-primary text-primary-foreground rounded-t-lg py-1 text-xs font-heading font-bold tracking-wider uppercase">
                {ev.month}
              </div>
              <div className="bg-muted border border-border border-t-0 rounded-b-lg py-2 text-2xl font-heading font-black text-foreground">
                {ev.date.split(" ")[0]}
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[ev.type] ?? "bg-muted text-muted-foreground"}`}>
                {ev.type}
              </span>
              <h3 className="font-heading font-semibold text-sm text-foreground mt-2 leading-snug">
                {ev.title}
              </h3>
              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3 flex-shrink-0" /> {ev.venue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default CalendarPage;
