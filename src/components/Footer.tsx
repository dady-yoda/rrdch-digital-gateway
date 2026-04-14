import { Phone, Mail, MapPin } from "lucide-react";

const sisterConcerns = [
  { label: "RRMCH", href: "#" },
  { label: "RRCE", href: "#" },
  { label: "RRCN", href: "#" },
  { label: "ACS", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-accent">Contact Us</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>No 14, Ramohalli Cross, Kumbalgodu, Bengaluru - 560074</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+91-80-2843 7150 / 7468 | +91 9901559955</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>principalrrdch@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-accent transition-colors">Dental College Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Google Workshop</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">NAAC Documents</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Mandatory Disclosure</a></li>
            </ul>
          </div>

          {/* Accreditation + Social */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-accent">Accreditation</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Recognised by Royal College of Physicians and Surgeons of Glasgow, UK for Part 1 & 2 MFDS.
            </p>
            <h4 className="font-heading font-bold text-lg mb-3 text-accent">Follow Us</h4>
            <div className="flex gap-4 text-sm">
              {["Facebook", "YouTube", "LinkedIn", "Instagram"].map((s) => (
                <a key={s} href="#" className="text-primary-foreground/60 hover:text-accent transition-colors" aria-label={s}>
                  {s.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sister Concerns */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/20">
          <p className="text-xs text-primary-foreground/60 mb-2 font-heading">Rajarajeswari Group of Institutions:</p>
          <div className="flex flex-wrap gap-4">
            {sisterConcerns.map((s) => (
              <a key={s.label} href={s.href} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10 py-3">
        <p className="text-center text-xs text-primary-foreground/50">
          © 2013-2026 RRDCH. All Rights Reserved. Site Hosted, Designed and Maintained by RRDCH.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
