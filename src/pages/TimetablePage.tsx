import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Clock, ExternalLink, Info } from "lucide-react";

const programs = ["BDS I Year", "BDS II Year", "BDS III Year", "BDS Final Year", "MDS"];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const periods = [
  "8:00–9:00",
  "9:00–10:00",
  "10:00–11:00",
  "11:00–12:00",
  "12:00–1:00",
  "1:00–2:00",
  "2:00–3:00",
  "3:00–4:00",
];

// Dummy sample timetable for BDS I Year
const sampleTimetable: Record<string, string[]> = {
  Monday:    ["Gen Anatomy",  "Gen Anatomy",  "Gen Physiology", "Gen Biochemistry", "Lunch", "Dental Anatomy", "Dental Anatomy", "—"],
  Tuesday:   ["Gen Physiology","Gen Physiology","—",            "Gen Anatomy",      "Lunch", "Dental Materials","Dental Materials","—"],
  Wednesday: ["Gen Biochemistry","Gen Biochemistry","Gen Anatomy","Gen Physiology",  "Lunch", "Dental Anatomy", "—",             "—"],
  Thursday:  ["Gen Anatomy",  "Dental Anatomy","—",            "Gen Biochemistry",  "Lunch", "Gen Physiology", "Gen Physiology", "—"],
  Friday:    ["Gen Biochemistry","—",          "Gen Anatomy",  "Gen Physiology",    "Lunch", "Dental Materials","Dental Anatomy","—"],
  Saturday:  ["Dental Anatomy","Gen Biochemistry","—",         "—",                "Lunch", "—",             "—",             "—"],
};

const cellColor = (label: string) => {
  if (label === "Lunch") return "bg-accent/20 text-accent-foreground font-medium";
  if (label === "—") return "text-muted-foreground/40";
  return "text-foreground";
};

const TimetablePage = () => (
  <PageLayout>
    <PageHero
      title="Timetable"
      subtitle="Department-wise academic timetables for BDS and MDS programmes"
      breadcrumbs={[
        { label: "Schedule", href: "/schedule" },
        { label: "Timetable" },
      ]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-xl text-foreground">
            Sample Timetable — BDS I Year
          </h2>
        </div>
        <a
          href="https://www.rrdch.org/time-table/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" /> View all timetables
        </a>
      </div>

      {/* Programme Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {programs.map((p, i) => (
          <button
            key={p}
            className={`px-4 py-1.5 rounded-full text-sm font-heading font-medium transition-colors ${
              i === 0
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Timetable Grid */}
      <div className="overflow-x-auto rounded-xl border border-border shadow-sm mb-8">
        <table className="w-full text-xs min-w-[700px]">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="text-left px-4 py-3 font-heading font-semibold w-28">Day</th>
              {periods.map((p) => (
                <th key={p} className="text-center px-3 py-3 font-heading font-semibold whitespace-nowrap">
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, i) => (
              <tr key={day} className={`border-t border-border ${i % 2 !== 0 ? "bg-muted/30" : ""}`}>
                <td className="px-4 py-3 font-heading font-semibold text-foreground">{day}</td>
                {sampleTimetable[day].map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-3 text-center ${cellColor(cell)}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        This is a representative timetable. Actual schedules may vary. Please contact the respective department for confirmed timings.
      </p>
    </section>
  </PageLayout>
);

export default TimetablePage;
