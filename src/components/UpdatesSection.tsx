import { useState } from "react";
import { Link } from "react-router-dom";
import FadeInSection from "./FadeInSection";
import SpotlightCard from "./SpotlightCard";
import { Calendar, ArrowUpRight } from "lucide-react";
import { newsItems, categories, categoryMeta, type Category } from "@/data/newsData";

/* ─── Component ───────────────────────────────────────── */
const UpdatesSection = () => {
  const [active, setActive] = useState<Category | "All">("All");

  const filtered =
    active === "All" ? newsItems : newsItems.filter((n) => n.category === active);

  // Show only the 6 most recent on the homepage
  const displayed = filtered.slice(0, 6);

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
          {displayed.map((item, i) => {
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
          })}
        </div>

        {/* ── View all link ── */}
        <FadeInSection>
          <div className="mt-10 text-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow hover:shadow-md"
            >
              View All News &amp; Events
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default UpdatesSection;
