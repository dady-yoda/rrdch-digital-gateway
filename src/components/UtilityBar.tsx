import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface UtilityLink {
  label: string;
  href: string;
  external: boolean;
}

const utilityLinks1: UtilityLink[] = [
  { label: "ERP", href: "https://rrdch.eduwizerp.com/", external: true },
  { label: "ESI", href: "/esi", external: false },
  { label: "DCI", href: "/dci", external: false },
  { label: "Brochure", href: "/brochure", external: false },
  { label: "Recognitions", href: "/recognitions", external: false },
  { label: "Feedback", href: "/feedback", external: false },
  { label: "Career", href: "/career", external: false },
];

const utilityLinks2: UtilityLink[] = [
  { label: "Webmail", href: "https://outlook.office365.com/mail/", external: true },
  { label: "NAAC", href: "/accreditation/naac", external: false },
  { label: "NIRF", href: "/accreditation/nirf", external: false },
  { label: "Circulars", href: "/circulars", external: false },
  { label: "E-Content", href: "https://drive.google.com/drive/folders/1t7QoWpaW8v_9I00_kl8bjrlotHI8JC1x", external: true },
  { label: "Online Fees", href: "https://rrdch.eduwizerp.com/", external: true },
  { label: "Fee Terms", href: "/fee-terms", external: false },
];

const UtilityBarLink = ({ link }: { link: UtilityLink }) => {
  const cls = "hover:text-primary transition-colors font-medium";
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {link.label}
      </a>
    );
  }
  return (
    <Link to={link.href} className={cls}>
      {link.label}
    </Link>
  );
};

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
              <UtilityBarLink key={link.label} link={link} />
            ))}
          </div>
        </div>
        {/* Row 2 */}
        <div className="flex items-center justify-end py-1 gap-3">
          {utilityLinks2.map((link) => (
            <UtilityBarLink key={link.label} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
