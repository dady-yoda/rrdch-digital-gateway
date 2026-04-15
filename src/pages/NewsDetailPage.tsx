import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Calendar, ArrowLeft, Tag, ArrowUpRight } from "lucide-react";
import { newsItems, categoryMeta } from "@/data/newsData";

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = newsItems.find((n) => n.slug === slug);

  // Scroll to top whenever the article slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!item) {
    return (
      <PageLayout>
        <PageHero
          title="Article Not Found"
          subtitle="The news article you are looking for does not exist."
          breadcrumbs={[{ label: "News & Updates", href: "/news" }, { label: "Not Found" }]}
        />
        <section className="container mx-auto px-4 py-14 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </section>
      </PageLayout>
    );
  }

  const meta = categoryMeta[item.category];
  const paragraphs = item.body.split("\n\n");

  // Related articles — same category, different slug, max 3
  const related = newsItems
    .filter((n) => n.category === item.category && n.slug !== item.slug)
    .slice(0, 3);

  return (
    <PageLayout>
      <PageHero
        title={item.title}
        subtitle={item.excerpt}
        breadcrumbs={[
          { label: "News & Updates", href: "/news" },
          { label: item.category },
        ]}
      />

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-semibold ${meta.color}`}
            >
              <Tag className="w-3 h-3" />
              {item.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {item.date}
            </span>
          </div>

          {/* Article body */}
          <article className="prose prose-sm max-w-none">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-base text-foreground/85 leading-relaxed mb-5 font-body"
              >
                {para}
              </p>
            ))}
          </article>

          {/* Divider */}
          <div className="border-t border-border my-10" />

          {/* Back link */}
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News & Updates
          </Link>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="font-heading font-bold text-lg text-foreground mb-5">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((r) => {
                  const rm = categoryMeta[r.category];
                  return (
                    <Link
                      key={r.slug}
                      to={`/news/${r.slug}`}
                      className="group flex flex-col bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-semibold ${rm.color}`}
                        >
                          {rm.icon}
                          {r.category}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                      </div>
                      <h3 className="font-heading font-semibold text-primary text-sm leading-snug group-hover:text-secondary transition-colors line-clamp-3 flex-1">
                        {r.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border">
                        <Calendar className="w-3 h-3" />
                        {r.date}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default NewsDetailPage;
