import { useState, useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LanguageToggle } from "./language-toggle";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import "./NavAnimation.css";
import { departmentsData } from "@/data/departmentsData";

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
    href: "/about-us",
    children: [
      { label: "Trust", href: "/about-us/trust" },
      { label: "Management", href: "/about-us/management" },
      { label: "Vision & Mission", href: "/about-us/vision" },
      { label: "Governing Council", href: "/about-us/council" },
      { label: "Recognitions", href: "/recognitions" },
      { label: "Facilities", href: "/facilities" },
    ],
  },
  {
    label: "Courses",
    children: [
      { label: "BDS", href: "/course/bds" },
      { label: "MDS", href: "/course/mds" },
      { label: "Ph.D", href: "/course/phd" },
      { label: "Certificate in Implantology", href: "/implantology-course" },
    ],
  },
  {
    label: "Departments",
    href: "/departments",
    children: departmentsData.map((d) => ({ 
      label: d.name, 
      href: `/departments/${d.slug}` 
    })),
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
      { label: "Hostel Issues", href: "/committee/hostel-issues" },
    ],
  },
  { label: "News & Events", href: "/news" },
  { label: "Alumni", href: "https://rrdch.org/alumni/", external: true },
  { label: "ESI", href: "/esi" },
  { label: "DCI", href: "/dci" },
];

const EASE = "power3.out";

const NavigationBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = useCallback((value: string) => {
    const q = value.trim();
    if (!q) return;
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }, [navigate]);

  // Pill animation refs
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);

  // Build circle animation timelines after layout
  useLayoutEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        if (!w || !h) return;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".nav-pill-label");
        const hover = pill.querySelector(".nav-pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: EASE, overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: EASE, overwrite: "auto" }, 0);
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hover, { y: 0, opacity: 1, duration: 2, ease: EASE, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});
    return () => window.removeEventListener("resize", layout);
  }, []);

  // Click-outside to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Focus the input when opened
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const handleEnter = useCallback((i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease: EASE,
      overwrite: "auto",
    });
  }, []);

  const handleLeave = useCallback((i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease: EASE,
      overwrite: "auto",
    });
  }, []);

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-lg" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Desktop nav items with pill animation */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={(item as any).href || "#"}
                  className="nav-pill-item"
                  onMouseEnter={() => handleEnter(index)}
                  onMouseLeave={() => handleLeave(index)}
                >
                  {/* Rising circle */}
                  <span
                    className="nav-hover-circle"
                    aria-hidden="true"
                    ref={(el) => { circleRefs.current[index] = el; }}
                  />
                  {/* Label stack */}
                  <span className="nav-label-stack">
                    <span className="nav-pill-label">{item.label}</span>
                    <span className="nav-pill-label-hover" aria-hidden="true">{item.label}</span>
                  </span>
                  {item.children && <ChevronDown className="w-3 h-3 relative z-10 ml-0.5 flex-shrink-0" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-popover shadow-xl rounded-md py-2 min-w-[220px] z-50 border border-border animate-fade-in">
                    {item.label === "Departments" ? (
                      <div className="grid grid-cols-2 gap-1 p-2 min-w-[400px]">
                        {item.children.map((child) => (
                          child.external ? (
                            <a
                              key={child.label}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              to={child.href || "#"}
                              className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          )
                        ))}
                      </div>
                    ) : (
                      item.children.map((child) => (
                        child.external ? (
                          <a
                            key={child.label}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        )
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Search + Dark mode */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative" ref={searchDropdownRef}>
              <button
                className="search-toggle-btn"
                onClick={() => setSearchOpen((prev) => !prev)}
                aria-label="Toggle search"
                aria-expanded={searchOpen}
              >
                <Search className="w-4 h-4" />
              </button>

              {searchOpen && (
                <div className="search-dropdown">
                  <div className="search-dropdown-inner">
                    <Search className="w-4 h-4 text-primary-foreground/50 flex-shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search the site..."
                      className="search-dropdown-input"
                      aria-label="Search"
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setSearchOpen(false);
                        if (e.key === "Enter") handleSearch(e.currentTarget.value);
                      }}
                    />
                    <button
                      className="search-dropdown-close"
                      onClick={() => setSearchOpen(false)}
                      aria-label="Close search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <LanguageToggle />
            <ModeToggle />
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageToggle />
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
              <Link
                to={(item as any).href || "#"}
                className="block px-4 py-3 text-sm text-primary-foreground hover:bg-secondary/30 border-b border-primary-foreground/10 font-heading"
                onClick={() => !item.children && setMobileOpen(false)}
              >
                {item.label}
              </Link>
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
