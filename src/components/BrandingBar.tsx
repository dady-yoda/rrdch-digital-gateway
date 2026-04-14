import logoBlack from "@/assets/RRDCH FULL BLACK.png";
import logoWhite from "@/assets/RRDCH FULL WHITE.png";
import { Shield, Award, GraduationCap, Globe } from "lucide-react";
import StaggeredMenu from "./StaggeredMenu";

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

const accreditations = [
  { icon: Shield, label: "NABH", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2025/07/NABH-accredited.pdf" },
  { icon: Award, label: "ISO", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2026/02/ISO-certificate-of-registration-12.05.2027.pdf" },
  { icon: GraduationCap, label: "RCPSG", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/RCPSG.pdf" },
  { icon: Globe, label: "SLMC", href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/SLMC.pdf" },
];

const BrandingBar = () => {
  return (
    <div className="bg-popover py-4 border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src={logoBlack} alt="RRDCH Logo" className="h-20 md:h-28 lg:h-32 w-auto object-contain max-w-[200px] md:max-w-[400px] lg:max-w-[600px] dark:hidden" />
          <img src={logoWhite} alt="RRDCH Logo" className="h-20 md:h-28 lg:h-32 w-auto object-contain max-w-[200px] md:max-w-[400px] lg:max-w-[600px] hidden dark:block" />
        </a>
        
        <div className="hidden lg:flex items-center gap-6">
          {accreditations.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${item.label} Accreditation`}
            >
              <item.icon className="w-8 h-8" />
              <span className="text-[10px] font-heading font-semibold">{item.label}</span>
            </a>
          ))}
          <div className="ml-4 flex items-center h-full z-[100]">
            <StaggeredMenu 
              position="right"
              items={quickLinks}
              displaySocials={false}
              displayItemNumbering={false}
              menuButtonColor="#546B41"
              openMenuButtonColor="#222"
              changeMenuColorOnOpen={true}
              colors={['#849a62', '#546B41']} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingBar;
