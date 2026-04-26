import logoBlack from "@/assets/RRDCH FULL BLACK.png";
import logoWhite from "@/assets/RRDCH FULL WHITE.png";
import nabhLogo from "@/assets/NABH-Logo.webp";
import isoLogo from "@/assets/iso-logo.png";
import rcpsgLogo from "@/assets/RCPSG.png";
import slmcLogo from "@/assets/SLMC.png";
import rcpsgDarkLogo from "@/assets/RCPSG for dark mode.png";
import gradientWhite from "@/assets/greadient white.svg";
import gradientBlack from "@/assets/gradient black.svg";
import StaggeredMenu from "./StaggeredMenu";
import { Link } from "react-router-dom";

import { useTheme } from "next-themes";

const quickLinks = [
  { label: "ERP", link: "https://rrdch.eduwizerp.com/", external: true },
  { label: "ESI", link: "/esi", external: false },
  { label: "Webmail", link: "https://outlook.office365.com/mail/", external: true },
  { label: "NAAC", link: "/accreditation/naac", external: false },
  { label: "NIRF", link: "/accreditation/nirf", external: false },
  { label: "Circulars", link: "/circulars", external: false },
  { label: "E-Content", link: "https://drive.google.com/drive/folders/1t7QoWpaW8v_9I00_kl8bjrlotHI8JC1x?usp=sharing", external: true },
  { label: "Online Fees", link: "https://rrdch.eduwizerp.com/", external: true },
  { label: "Fee Terms", link: "/fee-terms", external: false },
  { label: "Career", link: "/career", external: false },
  { label: "Feedback", link: "/feedback", external: false },
  { label: "Contact Us", link: "/#contact", external: false },
];

const accreditations = [
  { image: nabhLogo, label: "NABH", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2025/07/NABH-accredited.pdf" },
  { image: isoLogo, label: "ISO", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2026/02/ISO-certificate-of-registration-12.05.2027.pdf" },
  { image: rcpsgLogo, darkImage: rcpsgDarkLogo, label: "RCPSG", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/RCPSG.pdf" },
  { image: slmcLogo, label: "SLMC", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/SLMC.pdf" },
];

const BrandingBar = () => {
  const { theme, systemTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <div className="relative z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none select-none dark:hidden" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none select-none hidden dark:block" />
      <div className="relative z-10 container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoBlack} alt="RRDCH Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain max-w-[180px] md:max-w-[300px] lg:max-w-[450px] dark:hidden" />
          <img src={logoWhite} alt="RRDCH Logo" className="h-16 md:h-20 lg:h-24 w-auto object-contain max-w-[180px] md:max-w-[300px] lg:max-w-[450px] hidden dark:block" />
        </Link>
        
        <div className="hidden lg:flex items-center gap-6">
          {accreditations.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
              aria-label={`${item.label} Accreditation`}
            >
              <img src={item.image} alt={`${item.label} Logo`} className={`h-16 w-auto object-contain bg-transparent ${item.darkImage ? 'mix-blend-multiply dark:hidden' : 'mix-blend-multiply dark:mix-blend-normal'}`} />
              {item.darkImage && (
                <img src={item.darkImage} alt={`${item.label} Logo`} className="h-16 w-auto object-contain bg-transparent hidden dark:block" />
              )}
            </a>
          ))}
          <div className="ml-4 flex items-center h-full z-[100]">
            <StaggeredMenu 
              position="right"
              items={quickLinks}
              displaySocials={false}
              displayItemNumbering={false}
              menuButtonColor={isDark ? "#849a62" : "#546B41"}
              openMenuButtonColor={isDark ? "#444" : "#222"}
              changeMenuColorOnOpen={true}
              colors={isDark ? ['#a8c385', '#849a62'] : ['#849a62', '#546B41']} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingBar;
