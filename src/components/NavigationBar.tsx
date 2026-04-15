import { useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from "react-router-dom";

const departments = [
  "Oral Medicine & Radiology",
  "Oral & Maxillofacial Surgery",
  "Orthodontics",
  "Prosthodontics",
  "Periodontics",
  "Conservative Dentistry",
  "Pedodontics",
  "Oral Pathology",
  "Public Health Dentistry",
];

interface NavChild {
  label: string;
  href: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    children: [
      { label: "Trust", href: "#" },
      { label: "Management", href: "#" },
      { label: "Vision & Mission", href: "#" },
    ],
  },
  {
    label: "Courses",
    children: [
      { label: "BDS", href: "#" },
      { label: "MDS", href: "#" },
      { label: "Ph.D", href: "#" },
      { label: "Certificate in Implantology", href: "#" },
    ],
  },
  {
    label: "Departments",
    children: departments.map((d) => ({ label: d, href: "#" })),
  },
  {
    label: "Accreditation",
    href: "/accreditation",
    children: [
      { label: "NAAC", href: "/accreditation/naac" },
      { label: "NABH", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2025/07/NABH-accredited.pdf", external: true },
      { label: "ISO", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2026/02/ISO-certificate-of-registration-12.05.2027.pdf", external: true },
      { label: "IAO", href: "https://www.iao.org/India-Karnataka/RajaRajeswari-Dental-College-And-Hospital", external: true },
      { label: "RCPS", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/RCPSG.pdf", external: true },
      { label: "SLMC", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/SLMC.pdf", external: true },
      { label: "NIRF", href: "/accreditation/nirf" },
      { label: "AISHE", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2023/02/RRDCH-AISHE_Certificate-1.pdf", external: true },
    ],
  },
  {
    label: "Schedule",
    href: "/schedule",
    children: [
      { label: "Calendar of Events", href: "/schedule/calendar" },
      { label: "Timetable", href: "/schedule/timetable" },
    ],
  },
  {
    label: "Committee",
    href: "/committee",
    children: [
      { label: "Anti-Ragging", href: "/committee/anti-ragging" },
    ],
  },
  { label: "ESI", href: "/esi" },
  { label: "DCI", href: "/dci" },
  { label: "Recognitions", href: "/recognitions" },
];

const NavLinkItem = ({ item, onClick }: { item: NavItem; onClick?: () => void }) => {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="flex items-center gap-1 px-3 py-2 text-sm font-heading font-medium text-primary-foreground hover:bg-secondary/30 rounded transition-colors"
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link
      to={item.href || "/"}
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-2 text-sm font-heading font-medium text-primary-foreground hover:bg-secondary/30 rounded transition-colors"
    >
      {item.label}
    </Link>
  );
};

const ChildLink = ({ child, onClick }: { child: NavChild; onClick?: () => void }) => {
  if (child.external) {
    return (
      <a
        href={child.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
      >
        {child.label}
      </a>
    );
  }
  return (
    <Link
      to={child.href}
      onClick={onClick}
      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
    >
      {child.label}
    </Link>
  );
};

const NavigationBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Basic search — could be expanded
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="hidden lg:flex items-center gap-1 flex-1 flex-wrap">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-heading font-medium text-primary-foreground hover:bg-secondary/30 rounded transition-colors"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ) : (
                  <NavLinkItem item={item} />
                )}

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-popover shadow-xl rounded-md py-2 min-w-[220px] z-50 border border-border animate-fade-in">
                    {item.label === "Departments" ? (
                      <div className="grid grid-cols-2 gap-1 p-2 min-w-[400px]">
                        {item.children.map((child) => (
                          <ChildLink
                            key={child.label}
                            child={child}
                            onClick={() => setOpenDropdown(null)}
                          />
                        ))}
                      </div>
                    ) : (
                      item.children.map((child) => (
                        <ChildLink
                          key={child.label}
                          child={child}
                          onClick={() => setOpenDropdown(null)}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex items-center bg-primary-foreground/10 rounded overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 text-sm px-3 py-1.5 outline-none w-40"
                aria-label="Search"
              />
              <button type="submit" className="bg-accent px-3 py-1.5 text-accent-foreground" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <ModeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ModeToggle />
            <button
              className="text-primary-foreground p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <span className="lg:hidden text-primary-foreground font-heading font-bold text-sm">RRDCH</span>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <div className="block px-4 py-3 text-sm text-primary-foreground border-b border-primary-foreground/10 font-heading font-semibold">
                  {item.label}
                </div>
              ) : (
                item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-sm text-primary-foreground hover:bg-secondary/30 border-b border-primary-foreground/10 font-heading"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.href || "/"}
                    className="block px-4 py-3 text-sm text-primary-foreground hover:bg-secondary/30 border-b border-primary-foreground/10 font-heading"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              {item.children && (
                <div className="bg-primary-foreground/5">
                  {item.children.map((child) => (
                    child.external ? (
                      <a
                        key={child.label}
                        href={child.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-8 py-2 text-xs text-primary-foreground/80 hover:bg-secondary/20"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </a>
                    ) : (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-8 py-2 text-xs text-primary-foreground/80 hover:bg-secondary/20"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
