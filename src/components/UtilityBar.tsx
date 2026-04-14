import { Phone, Mail } from "lucide-react";

const utilityLinks1 = [
  { label: "ERP", href: "https://rrdch.eduwizerp.com/", external: true },
  { label: "ESI", href: "https://www.rrdch.org/e-s-i/", external: true },
  { label: "DCI", href: "#", external: false },
  { label: "Brochure", href: "#", external: false },
  { label: "Recognitions", href: "#", external: false },
  { label: "Feedback", href: "#", external: false },
  { label: "Career", href: "#", external: false },
];

const utilityLinks2 = [
  { label: "Webmail", href: "#", external: true },
  { label: "NAAC", href: "#", external: false },
  { label: "NIRF", href: "#", external: false },
  { label: "Circulars", href: "#", external: false },
  { label: "E-Content", href: "#", external: true },
  { label: "Online Fees", href: "https://rrdch.eduwizerp.com/", external: true },
  { label: "Fee Terms", href: "#", external: false },
];

const UtilityBar = () => {
  return (
    <div className="bg-utility text-foreground text-xs hidden lg:block">
      <div className="container mx-auto px-4">
        {/* Row 1 */}
        <div className="flex items-center justify-between py-1 border-b border-border/50">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              +91-80-2843 7150
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              principalrrdch@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-3">
            {utilityLinks1.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* Row 2 */}
        <div className="flex items-center justify-end py-1 gap-3">
          {utilityLinks2.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
