import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const scheduleOptions = [
  {
    icon: Calendar,
    title: "Calendar of Events",
    desc: "Academic calendar, cultural fests, national celebrations, and institutional events for the current academic year.",
    href: "/schedule/calendar",
    color: "bg-primary",
  },
  {
    icon: Clock,
    title: "Timetable",
    desc: "Department-wise lecture, practical, and clinical timetables for BDS and MDS programmes.",
    href: "/schedule/timetable",
    color: "bg-secondary",
  },
];

const SchedulePage = () => (
  <PageLayout>
    <PageHero
      title="Schedule"
      subtitle="Academic calendar, events, and departmental timetables for the current academic year"
      breadcrumbs={[{ label: "Schedule" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {scheduleOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <Link
              key={opt.title}
              to={opt.href}
              className="group bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
            >
              <div className={`w-14 h-14 rounded-xl ${opt.color} flex items-center justify-center mb-5 shadow`}>
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h2 className="font-heading font-bold text-xl text-foreground mb-3">
                {opt.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {opt.desc}
              </p>
              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                View {opt.title} <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  </PageLayout>
);

export default SchedulePage;
