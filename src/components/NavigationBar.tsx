import { useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";

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

const navItems = [
  { label: "Home", href: "#" },
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
    label: "Facilities",
    children: [
      { label: "Library", href: "#" },
      { label: "Auditorium", href: "#" },
      { label: "Hostel", href: "#" },
      { label: "Sports", href: "#" },
      { label: "Cafeteria", href: "#" },
    ],
  },
  { label: "News & Events", href: "#" },
  { label: "Alumni", href: "#" },
  { label: "Contact Us", href: "#contact" },
];

const NavigationBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={item.href || "#"}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-heading font-medium text-primary-foreground hover:bg-secondary/30 rounded transition-colors"
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </a>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-popover shadow-xl rounded-md py-2 min-w-[220px] z-50 border border-border animate-fade-in">
                    {item.label === "Departments" ? (
                      <div className="grid grid-cols-2 gap-1 p-2 min-w-[400px]">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="px-3 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    ) : (
                      item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          {child.label}
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-primary-foreground/10 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-primary-foreground placeholder:text-primary-foreground/50 text-sm px-3 py-1.5 outline-none w-40"
                aria-label="Search"
              />
              <button className="bg-accent px-3 py-1.5 text-accent-foreground" aria-label="Search">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-primary-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="lg:hidden text-primary-foreground font-heading font-bold text-sm">RRDCH</span>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label}>
              <a
                href={item.href || "#"}
                className="block px-4 py-3 text-sm text-primary-foreground hover:bg-secondary/30 border-b border-primary-foreground/10 font-heading"
                onClick={() => !item.children && setMobileOpen(false)}
              >
                {item.label}
              </a>
              {item.children && (
                <div className="bg-primary-foreground/5">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-8 py-2 text-xs text-primary-foreground/80 hover:bg-secondary/20"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </a>
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
