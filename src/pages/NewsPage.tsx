import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SpotlightCard from "@/components/SpotlightCard";
import FadeInSection from "@/components/FadeInSection";
import {
  Calendar,
  ArrowUpRight,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { newsItems, categories, categoryMeta } from "@/data/newsData";

/* ── Helpers ───────────────────────────────────────────── */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseNewsDate(dateStr: string): Date | null {
  try {
    return new Date(dateStr);
  } catch {
    return null;
  }
}

/* Build a Set of "YYYY-M-D" keys from all news items */
function buildEventMap() {
  const map: Record<string, string[]> = {}; // key -> slugs[]
  for (const item of newsItems) {
    const d = parseNewsDate(item.date);
    if (!d) continue;
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!map[key]) map[key] = [];
    map[key].push(item.slug);
  }
  return map;
}

/* ── Mini Calendar ─────────────────────────────────────── */
interface MiniCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (d: Date | null) => void;
}

const MiniCalendar = ({ selectedDate, onSelectDate }: MiniCalendarProps) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const eventMap = useMemo(() => buildEventMap(), []);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const next = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prev}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-heading font-bold text-sm text-foreground">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={next}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const key = `${viewYear}-${viewMonth}-${day}`;
          const hasEvent = !!eventMap[key];
          const isToday =
            day === today.getDate() &&
            viewMonth === today.getMonth() &&
            viewYear === today.getFullYear();
          const isSelected =
            selectedDate &&
            day === selectedDate.getDate() &&
            viewMonth === selectedDate.getMonth() &&
            viewYear === selectedDate.getFullYear();

          return (
            <button
              key={key}
              onClick={() => {
                if (isSelected) {
                  onSelectDate(null);
                } else {
                  onSelectDate(new Date(viewYear, viewMonth, day));
                }
              }}
              className={`relative flex flex-col items-center justify-center h-8 w-full rounded-lg text-xs font-medium transition-all duration-150
                ${isSelected
                  ? "bg-primary text-primary-foreground shadow"
                  : isToday
                  ? "bg-primary/10 text-primary font-bold"
                  : hasEvent
                  ? "hover:bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
                }`}
            >
              {day}
              {hasEvent && (
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full
                    ${isSelected ? "bg-primary-foreground" : "bg-primary"}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border">
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
          Has news
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="w-6 h-4 rounded bg-primary/10 inline-block" />
          Today
        </span>
      </div>
    </div>
  );
};

/* ── Main Page ─────────────────────────────────────────── */
const NewsPage = () => {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filtered = newsItems.filter((n) => {
    const matchCat = active === "All" || n.category === active;
    const matchQ =
      query.trim() === "" ||
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(query.toLowerCase());

    let matchDate = true;
    if (selectedDate) {
      const d = parseNewsDate(n.date);
      matchDate =
        !!d &&
        d.getDate() === selectedDate.getDate() &&
        d.getMonth() === selectedDate.getMonth() &&
        d.getFullYear() === selectedDate.getFullYear();
    }

    return matchCat && matchQ && matchDate;
  });

  return (
    <PageLayout>
      <PageHero
        title="News & Updates"
        subtitle="Latest happenings, events, achievements and announcements from Rajarajeswari Dental College & Hospital"
        breadcrumbs={[{ label: "News & Updates" }]}
      />

      <section className="container mx-auto px-4 py-14">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left sidebar: Calendar ── */}
          <aside className="lg:w-72 flex-shrink-0">
            <FadeInSection>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-heading font-bold text-sm text-foreground">Browse by Date</span>
              </div>
              <MiniCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

              {/* Active date filter chip */}
              {selectedDate && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Filtering:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                    {selectedDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    <button onClick={() => setSelectedDate(null)}>
                      <X className="w-3 h-3 hover:text-destructive transition-colors" />
                    </button>
                  </span>
                </div>
              )}
            </FadeInSection>
          </aside>

          {/* ── Right: Search + Filter + Cards ── */}
          <div className="flex-1 min-w-0">
            <FadeInSection>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search news…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setActive(c.value)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border
                      ${active === c.value
                        ? "bg-primary text-primary-foreground border-primary shadow"
                        : "bg-muted text-muted-foreground border-border hover:bg-secondary/30"
                      }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </FadeInSection>

            {/* Results count */}
            <FadeInSection>
              <p className="text-xs text-muted-foreground mb-5">
                Showing{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
                <span className="font-semibold text-foreground">{newsItems.length}</span> articles
              </p>
            </FadeInSection>

            {/* Cards grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.length === 0 ? (
                <div className="col-span-3 text-center py-20 text-muted-foreground text-sm">
                  No results found. Try a different date, category, or search term.
                </div>
              ) : (
                filtered.map((item, i) => {
                  const meta = categoryMeta[item.category];
                  return (
                    <FadeInSection key={`${item.slug}-${i}`}>
                      <SpotlightCard
                        className="rounded-xl border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full"
                        spotlightColor="rgba(84, 107, 65, 0.15)"
                      >
                        <Link
                          to={`/news/${item.slug}`}
                          className="group flex flex-col bg-card rounded-xl p-5 h-full"
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
                        </Link>
                      </SpotlightCard>
                    </FadeInSection>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NewsPage;
