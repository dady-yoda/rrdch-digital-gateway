import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SpotlightCard from "@/components/SpotlightCard";
import FadeInSection from "@/components/FadeInSection";
import {
  Calendar,
  ArrowUpRight,
  Newspaper,
  GraduationCap,
  Activity,
  Star,
  AlertCircle,
  Search,
} from "lucide-react";
import { newsItems, categories, categoryMeta } from "@/data/newsData";

const NewsPage = () => {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = newsItems.filter((n) => {
    const matchCat = active === "All" || n.category === active;
    const matchQ =
      query.trim() === "" ||
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <PageLayout>
      <PageHero
        title="News & Updates"
        subtitle="Latest happenings, events, achievements and announcements from Rajarajeswari Dental College & Hospital"
        breadcrumbs={[{ label: "News & Updates" }]}
      />

      <section className="container mx-auto px-4 py-14">
        {/* Search + Filter row */}
        <FadeInSection>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 w-full">
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
            <div className="flex flex-wrap justify-center gap-2">
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
          </div>
        </FadeInSection>

        {/* Results count */}
        <FadeInSection>
          <p className="text-xs text-muted-foreground mb-6">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            <span className="font-semibold text-foreground">{newsItems.length}</span> articles
          </p>
        </FadeInSection>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <div className="col-span-3 text-center py-20 text-muted-foreground text-sm">
              No results found. Try a different search or category.
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
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-semibold ${meta.color}`}
                        >
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
      </section>
    </PageLayout>
  );
};

export default NewsPage;
