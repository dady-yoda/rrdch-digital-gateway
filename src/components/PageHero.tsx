import { ChevronRight, Home } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
}

const PageHero = ({ title, subtitle, breadcrumbs = [] }: PageHeroProps) => {
  const allCrumbs: Crumb[] = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(100,24%,29%) 0%, hsl(100,24%,34%) 40%, hsl(95,25%,48%) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10"
        style={{ background: "hsl(35,40%,76%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 -translate-x-1/2 translate-y-1/3"
        style={{ background: "hsl(95,25%,58%)" }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-4">
          {allCrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i === 0 && (
                <Home className="w-3.5 h-3.5 text-primary-foreground/70" />
              )}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-xs text-primary-foreground font-medium">
                  {crumb.label}
                </span>
              )}
              {i < allCrumbs.length - 1 && (
                <ChevronRight className="w-3 h-3 text-primary-foreground/40" />
              )}
            </span>
          ))}
        </nav>

        {/* Title */}
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-primary-foreground/80 text-sm md:text-base max-w-2xl">
            {subtitle}
          </p>
        )}

        {/* Decorative line */}
        <div
          className="mt-5 h-1 w-16 rounded-full"
          style={{ background: "hsl(35,40%,76%)" }}
        />
      </div>
    </section>
  );
};

export default PageHero;
