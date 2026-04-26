import { Phone, Mail, MapPin, Facebook, Youtube, Linkedin, Instagram, Twitter, ExternalLink, GraduationCap, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const sisterConcerns = [
  { label: "RajaRajeswari Medical College & Hospital", href: "http://www.rrmch.org/", external: true },
  { label: "RajaRajeswari College of Engineering", href: "http://www.rrce.org/", external: true },
  { label: "ACS College of Engineering", href: "https://www.acsce.edu.in/", external: true },
  { label: "RajaRajeswari College & School of Nursing", href: "http://www.rrcn.org/", external: true },
  { label: "Sri Uthradom Thirunal Academy of Medical Science", href: "https://sutams.edu.in/", external: true },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Contact & Address */}
          <div>
            <div className="mb-6 bg-primary-foreground/10 p-4 rounded-lg border border-primary-foreground/20 shadow-sm animate-fade-in">
              <div className="flex items-start gap-3">
                <GraduationCap className="w-8 h-8 text-accent flex-shrink-0" />
                <p className="text-sm font-medium leading-snug">
                  <span className="text-accent font-bold uppercase tracking-wider text-xs block mb-1">Accreditation</span>
                  Recognised by Royal College of Physicians and Surgeons of Glasgow, UK for part 1 & 2 MFDS
                </p>
              </div>
            </div>

            <h4 className="font-heading font-bold text-lg mb-4 text-accent border-b border-accent/30 pb-2 inline-block">Contact Us</h4>
            <div className="space-y-4 text-sm text-primary-foreground/90">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent group-hover:scale-110 transition-transform" />
                <div>
                  <strong className="block mb-1">Rajarajeswari Dental College & Hospital</strong>
                  No 14, Ramohalli Cross, Kumbalgodu,<br/>
                  Bengaluru -560074, Karnataka, India.
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent group-hover:scale-110 transition-transform" />
                <div className="flex flex-col gap-1 tracking-wide">
                  <span>+91-80-2843 7150</span>
                  <span>+91-80-2843 7468</span>
                  <span>+91 9901559955</span>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent group-hover:scale-110 transition-transform" />
                <div className="flex flex-col gap-1 text-sm">
                  <a href="mailto:principalrrdch@gmail.com" className="hover:text-accent transition-colors underline-offset-4 hover:underline">principalrrdch@gmail.com</a>
                  <a href="mailto:admission@rrdch.org" className="hover:text-accent transition-colors underline-offset-4 hover:underline">admission@rrdch.org</a>
                  <a href="mailto:info@rrdch.org" className="hover:text-accent transition-colors underline-offset-4 hover:underline">info@rrdch.org</a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick External Connections */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-accent border-b border-accent/30 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/90">
              <li>
                <a href="https://rrdch.eduwizerp.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors group">
                  <ExternalLink className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors" />
                  Campus ERP
                </a>
              </li>
              <li>
                <a href="https://drive.google.com/drive/folders/1t7QoWpaW8v_9I00_kl8bjrlotHI8JC1x?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors group">
                  <ExternalLink className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors" />
                  E-Content (Drive)
                </a>
              </li>
              <li>
                <a href="https://www.easytourz.com/BT-EmabedTour/all/2e6200684201ca03" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors group">
                  <ExternalLink className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors" />
                  Virtual Campus Tour (360°)
                </a>
              </li>
              <li>
                <a href="http://www.rrdch.org/pdf/brochure.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors group">
                  <ExternalLink className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors" />
                  Download Brochure (PDF)
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 hover:text-accent transition-colors group font-semibold"
                >
                  <Lock className="w-4 h-4 text-accent/70 group-hover:text-accent transition-colors" />
                  Admin / Staff Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-4 text-accent border-b border-accent/30 pb-2 inline-block">Connect With Us</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Stay updated with the latest news, events, and announcements from RRDCH on our social platforms.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a href="#" className="bg-primary-foreground/10 p-2.5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300 hover:-translate-y-1" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2.5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300 hover:-translate-y-1" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2.5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300 hover:-translate-y-1" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2.5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-primary-foreground/10 p-2.5 rounded-full hover:bg-accent hover:text-primary transition-all duration-300 hover:-translate-y-1" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Sister Concerns */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20">
          <p className="text-xs text-primary-foreground/60 mb-3 font-heading uppercase tracking-wider font-semibold">Rajarajeswari Group of Institutions</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {sisterConcerns.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60"></span>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-primary-foreground/5 border-t border-primary-foreground/10 py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/70 font-medium tracking-wide">
            @2013 RRDCH. All Rights Reserved.
          </p>
          <p className="text-xs text-primary-foreground/70 tracking-wide text-center md:text-right">
            Site Hosted, Designed and Maintained by <span className="font-semibold text-accent">RRDCH</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
