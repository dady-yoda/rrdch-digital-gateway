import { useState } from "react";
import FadeInSection from "./FadeInSection";
import { Calendar, ArrowUpRight, Newspaper, GraduationCap, Activity, Star, AlertCircle } from "lucide-react";

/* ─── Real data sourced from https://www.rrdch.org/news-and-events/ ─── */

type Category = "General" | "CDE" | "Achievements" | "Circulars" | "Interdepartmental";

interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
  category: Category;
  href: string;
}

const newsItems: NewsItem[] = [
  /* ── General / Events ── */
  {
    title: "World Health Day 2026",
    date: "Apr 10, 2026",
    excerpt:
      "A Dental screening and treatment camp was organized by the Dept. of Public Health Dentistry at Nirashrithara Parihara Kendra on 10/04/2026.",
    category: "General",
    href: "https://www.rrdch.org/news/world-health-day-2026/",
  },
  {
    title: "Workshop on Zygomatic and Pterygoid Implant",
    date: "Apr 9, 2026",
    excerpt:
      "A Hands-on Workshop and Live Surgical Demonstration of Zygomatic and Pterygoid Implant conducted by the Dept. of Implantology in association with Norris Implants.",
    category: "General",
    href: "https://www.rrdch.org/news/workshop-on-zygomatic-and-pterygoid-implant/",
  },
  {
    title: "Smt. Lalithalakshmi Stree Sampoorn Utsav – Women's Day",
    date: "Mar 26, 2026",
    excerpt:
      "RajaRajeswari Group of Institutions celebrated Women's Day at ACS Convention Centre, RRMCH.",
    category: "General",
    href: "https://www.rrdch.org/news/smt-lalithalakshmi-stree-sampoorn-utsav-womens-day/",
  },
  {
    title: "National Dentist Day 2026",
    date: "Mar 7, 2026",
    excerpt:
      "On the occasion of National Dentist's Day, the Dept. of Public Health Dentistry organised a free dental check-up camp.",
    category: "General",
    href: "https://www.rrdch.org/news/national-dentist-day-2026/",
  },

  /* ── CDE Programmes ── */
  {
    title: "CDE Programme: Role of Magnification in Endodontics and Restorative Dentistry",
    date: "Mar 5, 2026",
    excerpt:
      'A CDE programme titled "Role of Magnification in Endodontics and Restorative Dentistry" was held at SLL Auditorium.',
    category: "CDE",
    href: "https://www.rrdch.org/news/cde-programme-role-of-magnification-in-endodontics-and-restorative-dentistry/",
  },
  {
    title: "CDE Programme: Platelet Concentrates and Stem Cells in Dentistry",
    date: "Feb 25, 2026",
    excerpt:
      'Dept. of Periodontology organized a CDE titled "A Comprehensive Overview of Platelet Concentrates and Stem Cells in Dentistry".',
    category: "CDE",
    href: "https://www.rrdch.org/news/cde-programme-on-a-comprehensive-overview-of-platelet-concentrates-and-stem-cells-in-dentistry/",
  },

  /* ── Interdepartmental Meet ── */
  {
    title: "Interdepartmental Clinical Meet – Modalities of Full Arch Implant Rehabilitation",
    date: "Mar 18, 2026",
    excerpt:
      "A clinical meet on full arch implant rehabilitation — covering surgical components that interface with jawbones to support prostheses.",
    category: "Interdepartmental",
    href: "https://www.rrdch.org/news/interdepartmental-clinical-meet-modalities-of-full-arch-implant-rehabilitation/",
  },

  /* ── Achievements ── */
  {
    title: "University Rank Holders in MDS – 2023",
    date: "Mar 15, 2023",
    excerpt:
      "RRDCH congratulates P.G. RGUHS Rank Holders and the teachers who made this possible.",
    category: "Achievements",
    href: "https://www.rrdch.org/news/university-rank-holders-in-mds-2023/",
  },
  {
    title: "Founder Chancellor in Media",
    date: "Aug 15, 2023",
    excerpt:
      'Our beloved Founder Chancellor Dr. A. C. Shanmugam has been documented by the prestigious "Times of India".',
    category: "Achievements",
    href: "https://www.rrdch.org/news/founder-chancellor-in-media/",
  },

  /* ── Circulars ── */
  {
    title: "Fee Notification and Exam Time Table of II, III & IV Year BDS – August 2022",
    date: "Jul 2, 2022",
    excerpt: "BDS Examination fee notification and Theory examination Time Table for August 2022.",
    category: "Circulars",
    href: "https://www.rrdch.org/news/fee-notification-time-table-of-2-3-4th-year-bds-august-2022/",
  },
  {
    title: "I to IV BDS Timetable 2020-21",
    date: "Jul 15, 2021",
    excerpt: "Click to view the I to IV BDS Timetable for academic year 2020-21.",
    category: "Circulars",
    href: "https://www.rrdch.org/news/iv-bds-timetable-2020-21/",
  },
  {
    title: "I to IV BDS Theory Examinations – March 2021",
    date: "Jan 15, 2021",
    excerpt: "The BDS Theory Examinations will be held from 24th March 2021.",
    category: "Circulars",
    href: "https://www.rrdch.org/news/ist-year-4th-year-bds-theory-examinations-march-2021/",
  },
];

/* ─── Category config ─────────────────────────────────── */
const categories: { label: string; value: Category | "All" }[] = [
  { label: "All", value: "All" },
  { label: "General", value: "General" },
  { label: "CDE", value: "CDE" },
  { label: "Achievements", value: "Achievements" },
  { label: "Circulars", value: "Circulars" },
  { label: "Interdepartmental", value: "Interdepartmental" },
];

const categoryMeta: Record<Category, { color: string; icon: React.ReactNode }> = {
  General: {
    color: "bg-secondary/20 text-secondary-foreground border border-secondary/30",
    icon: <Newspaper className="w-3 h-3" />,
  },
  CDE: {
    color: "bg-accent/40 text-accent-foreground border border-accent/40",
    icon: <GraduationCap className="w-3 h-3" />,
  },
  Achievements: {
    color: "bg-primary/10 text-primary border border-primary/20",
    icon: <Star className="w-3 h-3" />,
  },
  Circulars: {
    color: "bg-muted text-muted-foreground border border-border",
    icon: <AlertCircle className="w-3 h-3" />,
  },
  Interdepartmental: {
    color: "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
    icon: <Activity className="w-3 h-3" />,
  },
};

/* ─── Component ───────────────────────────────────────── */
const UpdatesSection = () => {
  const [active, setActive] = useState<Category | "All">("All");

  const filtered =
    active === "All" ? newsItems : newsItems.filter((n) => n.category === active);

  return (
    <section className="py-16 bg-background" id="news">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary text-center mb-2">
            News &amp; Updates
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Latest happenings from Rajarajeswari Dental College &amp; Hospital
          </p>
        </FadeInSection>

        {/* ── Filter tabs ── */}
        <FadeInSection>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setActive(c.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border
                  ${
                    active === c.value
                      ? "bg-primary text-primary-foreground border-primary shadow"
                      : "bg-muted text-muted-foreground border-border hover:bg-secondary/30"
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* ── Cards grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => {
            const meta = categoryMeta[item.category];
            return (
              <FadeInSection key={`${item.href}-${i}`}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col bg-card rounded-xl p-5 border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full"
                >
                  {/* Badge + arrow */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-semibold ${meta.color}`}>
                      {meta.icon}
                      {item.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-semibold text-primary text-sm leading-snug mb-2 group-hover:text-secondary transition-colors line-clamp-3">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {item.excerpt}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-4 pt-3 border-t border-border">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </div>
                </a>
              </FadeInSection>
            );
          })}
        </div>

        {/* ── View all link ── */}
        <FadeInSection>
          <div className="mt-10 text-center">
            <a
              href="https://www.rrdch.org/news-and-events/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow hover:shadow-md"
            >
              View All News &amp; Events
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default UpdatesSection;
