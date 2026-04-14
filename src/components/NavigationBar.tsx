import { useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import StaggeredMenu from "./StaggeredMenu";

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
const quickLinks = [
  { label: "ERP", link: "https://rrdch.eduwizerp.com/", external: true },
  { label: "ESI", link: "https://www.rrdch.org/e-s-i/", external: true },
  { label: "Webmail", link: "https://outlook.office365.com/mail/", external: true },
  { label: "NAAC", link: "https://www.rrdch.org/accreditation/naac/", external: true },
  { label: "NIRF", link: "http://rrdch.org/career/", external: true },
  { label: "Circulars", link: "https://www.rrdch.org/circulars/", external: true },
  { label: "E-Content", link: "https://drive.google.com/drive/folders/1t7QoWpaW8v_9I00_kl8bjrlotHI8JC1x", external: true },
  { label: "Online Fees", link: "https://rrdch.eduwizerp.com/", external: true },
  { label: "Fee Terms", link: "https://www.rrdch.org/rrdch/wp-content/uploads/2022/07/RRDCH_Online-Payment_Cancellation-Refund-Policy.pdf", external: true },
  { label: "Newsletter", link: "https://www.rrdch.org/newsletter/", external: true },
  { label: "Feedback", link: "https://www.rrdch.org/feedback/", external: true },
  { label: "Career", link: "https://www.rrdch.org/career/", external: true },
];

  {
    label: "Accreditation",
    children: [
      { label: "NAAC", href: "https://www.rrdch.org/accreditation/naac/", external: true },
      { label: "NABH", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2025/07/NABH-accredited.pdf", external: true },
      { label: "ISO", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2026/02/ISO-certificate-of-registration-12.05.2027.pdf", external: true },
      { label: "IAO", href: "https://www.iao.org/India-Karnataka/RajaRajeswari-Dental-College-And-Hospital", external: true },
      { label: "RCPS", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/RCPSG.pdf", external: true },
      { label: "SLMC", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/SLMC.pdf", external: true },
      { label: "NIRF", href: "https://www.rrdch.org/nirf/", external: true },
      { label: "AISHE", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2023/02/RRDCH-AISHE_Certificate-1.pdf", external: true },
    ],
  },
  {
    label: "Schedule",
    children: [
      { label: "Calendar of events", href: "https://www.rrdch.org/calendar-of-events/", external: true },
      { label: "Timetable", href: "https://www.rrdch.org/time-table/", external: true },
    ]
  },
  {
    label: "Committee",
    children: [
      { label: "Anti-ragging", href: "https://www.rrdch.org/anti-ragging/", external: true }
    ]
  },
  { label: "DCI", href: "https://www.rrdch.org/dci-mandatory/", external: true },
  { label: "Recognitions", href: "https://www.rrdch.org/recognitions/", external: true },
  { label: "Brochure", href: "#" },
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
                  target={(item as any).external ? "_blank" : undefined}
                  rel={(item as any).external ? "noopener noreferrer" : undefined}
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
                            target={(child as any).external ? "_blank" : undefined}
                            rel={(child as any).external ? "noopener noreferrer" : undefined}
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
                          target={(child as any).external ? "_blank" : undefined}
                          rel={(child as any).external ? "noopener noreferrer" : undefined}
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
            <div className="ml-2 flex items-center h-full">
              <StaggeredMenu 
                position="right"
                items={quickLinks}
                displaySocials={false}
                displayItemNumbering={false}
                menuButtonColor="#ffffff"
                openMenuButtonColor="#222"
                changeMenuColorOnOpen={true}
                colors={['#849a62', '#546B41']} 
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
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
              <a
                href={item.href || "#"}
                target={(item as any).external ? "_blank" : undefined}
                rel={(item as any).external ? "noopener noreferrer" : undefined}
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
                      target={(child as any).external ? "_blank" : undefined}
                      rel={(child as any).external ? "noopener noreferrer" : undefined}
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
