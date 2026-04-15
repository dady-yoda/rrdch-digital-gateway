import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { FileText, Download, Calendar, ExternalLink, Tag } from "lucide-react";

const circulars = [
  { id: "C-2025-012", date: "15 Apr 2025", title: "Examination Schedule — BDS Final Year (April 2025)", category: "Examination", href: "#" },
  { id: "C-2025-011", date: "02 Apr 2025", title: "Holiday Notice — Dr. B.R. Ambedkar Jayanti", category: "General", href: "#" },
  { id: "C-2025-010", date: "25 Mar 2025", title: "Internal Assessment Marks Submission — Deadline", category: "Academic", href: "#" },
  { id: "C-2025-009", date: "18 Mar 2025", title: "Campus Cleanliness Drive — Mandatory Participation", category: "General", href: "#" },
  { id: "C-2025-008", date: "10 Mar 2025", title: "Library Working Hours During Examinations", category: "Library", href: "#" },
  { id: "C-2025-007", date: "01 Mar 2025", title: "Guest Lecture — Digital Dentistry & CAD/CAM", category: "Academic", href: "#" },
  { id: "C-2025-006", date: "17 Feb 2025", title: "Anti-Ragging Pledge — All Students Mandatory", category: "Administrative", href: "#" },
  { id: "C-2025-005", date: "05 Feb 2025", title: "Revised Fee Payment Schedule 2025–26", category: "Finance", href: "#" },
  { id: "C-2025-004", date: "22 Jan 2025", title: "Republic Day Celebration — Attendance Compulsory", category: "General", href: "#" },
  { id: "C-2025-003", date: "10 Jan 2025", title: "MDS Entrance Counselling — Schedule & Documents", category: "Academic", href: "#" },
  { id: "C-2025-002", date: "03 Jan 2025", title: "Hospital Duty Roster — January 2025", category: "Clinical", href: "#" },
  { id: "C-2025-001", date: "02 Jan 2025", title: "Academic Calendar 2025–26 Released", category: "Academic", href: "#" },
];

const categoryColors: Record<string, string> = {
  Examination: "bg-destructive/10 text-destructive",
  General: "bg-muted text-muted-foreground",
  Academic: "bg-primary/10 text-primary",
  Library: "bg-blue-100 text-blue-700",
  Administrative: "bg-accent/30 text-accent-foreground",
  Finance: "bg-amber-100 text-amber-700",
  Clinical: "bg-secondary/20 text-secondary-foreground",
};

const CircularsPage = () => (
  <PageLayout>
    <PageHero
      title="Circulars"
      subtitle="Official notices, announcements, and communications from RRDCH administration"
      breadcrumbs={[{ label: "Circulars" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-xl text-foreground">
            Recent Circulars (2025)
          </h2>
        </div>
        <a
          href="https://www.rrdch.org/circulars/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" /> View all circulars
        </a>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="text-left px-5 py-3 font-heading font-semibold">Ref No.</th>
              <th className="text-left px-5 py-3 font-heading font-semibold">
                <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Date</div>
              </th>
              <th className="text-left px-5 py-3 font-heading font-semibold">Subject</th>
              <th className="text-left px-5 py-3 font-heading font-semibold">
                <div className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Category</div>
              </th>
              <th className="px-5 py-3 font-heading font-semibold">Download</th>
            </tr>
          </thead>
          <tbody>
            {circulars.map((c, i) => (
              <tr
                key={c.id}
                className={`border-t border-border hover:bg-muted/30 transition-colors ${i % 2 !== 0 ? "bg-muted/20" : ""}`}
              >
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground font-medium">{c.id}</td>
                <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{c.date}</td>
                <td className="px-5 py-3 font-medium text-foreground">{c.title}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[c.category] ?? "bg-muted text-muted-foreground"}`}>
                    {c.category}
                  </span>
                </td>
                <td className="px-5 py-3 text-center">
                  <a
                    href={c.href}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        For older circulars, please visit the{" "}
        <a
          href="https://www.rrdch.org/circulars/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          circulars archive
        </a>{" "}
        or contact the administration office.
      </p>
    </section>
  </PageLayout>
);

export default CircularsPage;
