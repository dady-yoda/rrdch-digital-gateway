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
    <div className="bg-popover py-3 border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="RRDCH Logo" className="h-16 w-16 object-contain" />
          <div>
            <h1 className="font-heading text-lg font-bold text-primary leading-tight">
              Rajarajeswari Dental College & Hospital
            </h1>
            <p className="text-xs text-muted-foreground">
              Affiliated to RGUHS | Recognised by DCI | NAAC 'A+' Accredited
            </p>
          </div>
        </a>
        <div className="hidden md:flex items-center gap-6">
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
