import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { BookOpen, Download, ExternalLink, Calendar } from "lucide-react";

const newsletters = [
  {
    issue: "Vol. 12 | 2024",
    title: "Excellence in Dental Education",
    date: "December 2024",
    summary: "Student achievements, faculty research highlights, community outreach, and campus updates from the academic year 2024.",
    href: "https://www.rrdch.org/newsletter/",
  },
  {
    issue: "Vol. 11 | 2023",
    title: "Innovation & Community Care",
    date: "December 2023",
    summary: "Coverage of NAAC re-accreditation, new MDS specialities, and student success stories from AY 2023.",
    href: "https://www.rrdch.org/newsletter/",
  },
  {
    issue: "Vol. 10 | 2022",
    title: "Resilience & Growth",
    date: "December 2022",
    summary: "Post-pandemic campus revival, updated infrastructure, and highlights from national dental conferences.",
    href: "https://www.rrdch.org/newsletter/",
  },
  {
    issue: "Vol. 9 | 2021",
    title: "Digital Dentistry & Beyond",
    date: "December 2021",
    summary: "Introduction of digital workflows in prosthetics and radiology; virtual events and online learning initiatives.",
    href: "https://www.rrdch.org/newsletter/",
  },
  {
    issue: "Vol. 8 | 2020",
    title: "Dentistry Meets Community",
    date: "December 2020",
    summary: "Community dental camps, COVID-19 awareness drives, and first online annual dental convention.",
    href: "https://www.rrdch.org/newsletter/",
  },
  {
    issue: "Vol. 7 | 2019",
    title: "Milestones & Memories",
    date: "December 2019",
    summary: "Departmental milestones, NABH accreditation celebration, and convocation highlights.",
    href: "https://www.rrdch.org/newsletter/",
  },
];

const NewsletterPage = () => (
  <PageLayout>
    <PageHero
      title="Newsletter"
      subtitle="Stay connected with the latest news, events, and achievements from the RRDCH community"
      breadcrumbs={[{ label: "Newsletter" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-xl text-foreground">
            Newsletter Archive
          </h2>
        </div>
        <a
          href="https://www.rrdch.org/newsletter/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" /> Browse all issues
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsletters.map((nl) => (
          <div
            key={nl.issue}
            className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            {/* Header stripe */}
            <div
              className="h-2"
              style={{ background: "linear-gradient(90deg, hsl(100,24%,34%), hsl(95,25%,58%))" }}
            />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-heading font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {nl.issue}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {nl.date}
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-foreground mb-3">
                {nl.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {nl.summary}
              </p>
              <a
                href={nl.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <Download className="w-4 h-4" /> Download Issue
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default NewsletterPage;
