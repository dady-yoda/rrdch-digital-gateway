import logo from "@/assets/logo.png";
import { Shield, Award, GraduationCap, Globe } from "lucide-react";

const accreditations = [
  { icon: Shield, label: "NABH", href: "#" },
  { icon: Award, label: "ISO", href: "#" },
  { icon: GraduationCap, label: "RCPSG", href: "#" },
  { icon: Globe, label: "SLMC", href: "#" },
];

const BrandingBar = () => {
  return (
    <div className="bg-popover py-4 border-b border-border">
      <div className="container mx-auto px-4 relative flex items-center justify-center">
        <a href="#" className="flex items-center justify-center w-full">
          <img src={logo} alt="RRDCH Logo" className="h-20 md:h-28 lg:h-32 w-auto object-contain max-w-full" />
        </a>
        
        {/* Optional: Accreditations pushed to the far right on large screens */}
        <div className="hidden xl:flex items-center gap-6 absolute right-4">
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
        </div>
      </div>
    </div>
  );
};

export default BrandingBar;
