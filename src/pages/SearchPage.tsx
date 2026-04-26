import { useSearchParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { Search, FileText, Building2, Newspaper, ChevronRight } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import { newsItems } from "@/data/newsData";
import { departmentsData } from "@/data/departmentsData";

// ─── Static searchable pages ───────────────────────────────────────────────
interface PageResult {
  title: string;
  description: string;
  href: string;
  category: string;
}

const staticPages: PageResult[] = [
  { title: "Home", description: "Welcome to Rajarajeswari Dental College & Hospital", href: "/", category: "Page" },
  { title: "About Us", description: "Learn about RRDCH's trust, management, vision, and governing council", href: "/about-us", category: "Page" },
  { title: "Trust", description: "About the RajaRajeswari Educational Trust", href: "/about-us/trust", category: "Page" },
  { title: "Management", description: "Meet the management team of RRDCH", href: "/about-us/management", category: "Page" },
  { title: "Vision & Mission", description: "Our vision and mission for excellence in dental education", href: "/about-us/vision", category: "Page" },
  { title: "Governing Council", description: "The Governing Council of Rajarajeswari Dental College", href: "/about-us/council", category: "Page" },
  { title: "Recognitions", description: "Awards and recognitions received by RRDCH", href: "/recognitions", category: "Page" },
  { title: "Facilities", description: "State-of-the-art facilities at RRDCH campus", href: "/facilities", category: "Page" },
  { title: "BDS Course", description: "Bachelor of Dental Surgery – programme details and curriculum", href: "/course/bds", category: "Course" },
  { title: "MDS Course", description: "Master of Dental Surgery – postgraduate programme details", href: "/course/mds", category: "Course" },
  { title: "Ph.D Programme", description: "Doctoral programme in dental sciences at RRDCH", href: "/course/phd", category: "Course" },
  { title: "Certificate in Implantology", description: "Advanced certificate course in dental implantology", href: "/implantology-course", category: "Course" },
  { title: "NAAC Accreditation", description: "NAAC assessment and accreditation details", href: "/accreditation/naac", category: "Accreditation" },
  { title: "NIRF Ranking", description: "National Institutional Ranking Framework scores", href: "/accreditation/nirf", category: "Accreditation" },
  { title: "DCI", description: "Dental Council of India recognition information", href: "/dci", category: "Page" },
  { title: "ESI", description: "Employee State Insurance information", href: "/esi", category: "Page" },
  { title: "News & Events", description: "Latest news, events, and achievements from RRDCH", href: "/news", category: "Page" },
  { title: "Calendar of Events", description: "Academic and event calendar for RRDCH", href: "/schedule/calendar", category: "Page" },
  { title: "Timetable", description: "Academic timetable for BDS and MDS students", href: "/schedule/timetable", category: "Page" },
  { title: "Anti-Ragging Committee", description: "Anti-ragging policies and committee details", href: "/committee/anti-ragging", category: "Committee" },
  { title: "Departments", description: "All departments at Rajarajeswari Dental College", href: "/departments", category: "Page" },
  { title: "Career", description: "Career opportunities at RRDCH", href: "/career", category: "Page" },
  { title: "Newsletter", description: "RRDCH official newsletters and publications", href: "/newsletter", category: "Page" },
  { title: "Gallery", description: "Photo gallery of campus, events, and facilities", href: "/gallery", category: "Page" },
  { title: "Brochure", description: "Download the official RRDCH brochure", href: "/brochure", category: "Page" },
  { title: "Fee Terms", description: "Fee structure and payment terms for courses", href: "/fee-terms", category: "Page" },
  { title: "Feedback", description: "Share your feedback with RRDCH", href: "/feedback", category: "Page" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
function match(text: string | undefined, query: string): boolean {
  if (!text) return false;
  return text.toLowerCase().includes(query.toLowerCase());
}

// Category pill colours
const categoryColors: Record<string, string> = {
  Page: "bg-primary/10 text-primary border-primary/20",
  Course: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
  Accreditation: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
  Committee: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300",
  Department: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  News: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
};

const categoryIcons: Record<string, React.ReactNode> = {
  Page: <FileText className="w-4 h-4" />,
  Course: <FileText className="w-4 h-4" />,
  Accreditation: <FileText className="w-4 h-4" />,
  Committee: <FileText className="w-4 h-4" />,
  Department: <Building2 className="w-4 h-4" />,
  News: <Newspaper className="w-4 h-4" />,
};

// ─── Component ───────────────────────────────────────────────────────────────
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const results = useMemo(() => {
    if (!query.trim()) return { pages: [], departments: [], news: [] };

    const pages = staticPages.filter(
      (p) => match(p.title, query) || match(p.description, query) || match(p.category, query)
    );

    const departments = departmentsData.filter(
      (d) =>
        match(d.name, query) ||
        match(d.overview, query) ||
        match(d.hod, query) ||
        d.specialties?.some((s) => match(s, query)) ||
        d.objectives?.some((o) => match(o, query)) ||
        d.facilities?.some((f) => match(f, query)) ||
        d.faculty?.some((f) => match(f.name, query))
    );

    const news = newsItems.filter(
      (n) =>
        match(n.title, query) ||
        match(n.excerpt, query) ||
        match(n.body, query) ||
        match(n.category, query)
    );

    return { pages, departments, news };
  }, [query]);

  const totalCount = results.pages.length + results.departments.length + results.news.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavigationBar />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Search Results
            </h1>
          </div>
          {query ? (
            <p className="text-muted-foreground text-lg">
              {totalCount === 0
                ? "No results found for "
                : `${totalCount} result${totalCount !== 1 ? "s" : ""} for `}
              <span className="font-semibold text-foreground">"{query}"</span>
            </p>
          ) : (
            <p className="text-muted-foreground text-lg">Enter a search term in the navigation bar to get started.</p>
          )}
        </div>

        {/* Empty state */}
        {query && totalCount === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="w-16 h-16 text-muted-foreground/30 mb-6" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Nothing found</h2>
            <p className="text-muted-foreground max-w-sm">
              Try different keywords or browse through the navigation menu above.
            </p>
          </div>
        )}

        {/* Pages section */}
        {results.pages.length > 0 && (
          <Section title="Pages" icon={<FileText className="w-5 h-5" />}>
            {results.pages.map((page) => (
              <ResultCard
                key={page.href}
                title={page.title}
                description={page.description}
                href={page.href}
                category={page.category}
                query={query}
              />
            ))}
          </Section>
        )}

        {/* Departments section */}
        {results.departments.length > 0 && (
          <Section title="Departments" icon={<Building2 className="w-5 h-5" />}>
            {results.departments.map((dept) => (
              <ResultCard
                key={dept.id}
                title={dept.name}
                description={dept.overview}
                href={`/departments/${dept.slug}`}
                category="Department"
                query={query}
                meta={dept.hod ? `HOD: ${dept.hod}` : undefined}
              />
            ))}
          </Section>
        )}

        {/* News section */}
        {results.news.length > 0 && (
          <Section title="News & Events" icon={<Newspaper className="w-5 h-5" />}>
            {results.news.map((item) => (
              <ResultCard
                key={item.slug}
                title={item.title}
                description={item.excerpt}
                href={`/news/${item.slug}`}
                category="News"
                query={query}
                meta={item.date}
              />
            ))}
          </Section>
        )}
      </main>

      <Footer />
    </div>
  );
};

// ─── Sub-components ──────────────────────────────────────────────────────────

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Section = ({ title, icon, children }: SectionProps) => (
  <section className="mb-10">
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
      <span className="text-primary">{icon}</span>
      <h2 className="text-lg font-semibold font-heading text-foreground">{title}</h2>
    </div>
    <div className="space-y-3">{children}</div>
  </section>
);

interface ResultCardProps {
  title: string;
  description: string;
  href: string;
  category: string;
  query: string;
  meta?: string;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const ResultCard = ({ title, description, href, category, query, meta }: ResultCardProps) => {
  const isExternal = href.startsWith("http");
  const colorClass = categoryColors[category] ?? categoryColors["Page"];
  const icon = categoryIcons[category] ?? <FileText className="w-4 h-4" />;

  const inner = (
    <div className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {highlight(title, query)}
          </span>
          <span className={`text-xs border rounded-full px-2 py-0.5 font-medium ${colorClass}`}>
            {category}
          </span>
          {meta && (
            <span className="text-xs text-muted-foreground">{meta}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {highlight(description, query)}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
    </div>
  );

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link to={href}>{inner}</Link>
  );
};

export default SearchPage;
