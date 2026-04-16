import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import {
  Users,
  Eye,
  Target,
  Heart,
  Star,
  BookOpen,
  Building2,
  UserCheck,
  ChevronRight,
  GraduationCap,
  Stethoscope,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { useLocation, useNavigate } from "react-router-dom";

type Tab = "overview" | "trust" | "management" | "vision" | "council";

const tabs: { id: Tab; label: string; path: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", path: "/about-us", icon: Building2 },
  { id: "trust", label: "Trust", path: "/about-us/trust", icon: Heart },
  { id: "management", label: "Management", path: "/about-us/management", icon: Users },
  { id: "vision", label: "Vision & Mission", path: "/about-us/vision", icon: Eye },
  { id: "council", label: "Governing Council", path: "/about-us/council", icon: UserCheck },
];

const trustInstitutions = [
  "RajaRajeswari Medical College & Hospital",
  "RajaRajeswari Dental College & Hospital",
  "RajaRajeswari College of Engineering",
  "ACS College of Engineering",
  "RajaRajeswari College & School of Nursing",
  "RajaRajeswari College of Physiotherapy",
  "RajaRajeswari Institute of Allied Health Sciences",
  "Sri Uthradom Thirunal Academy of Medical Science",
];

const COLORS = {
  darkGreen: "hsl(100, 24%, 34%)",
  mediumGreen: "hsl(95, 25%, 58%)",
  accentGold: "hsl(35, 40%, 76%)",
};

const governingCouncil = [
  { name: "Sri A. C. Shanmugam", role: "Chairman", icon: Star, color: COLORS.darkGreen },
  { name: "Dr. Edwin Devadoss", role: "Dean & Member Secretary", icon: GraduationCap, color: COLORS.mediumGreen },
  { name: "Smt. Lalitha Laxmi A C S", role: "Member", icon: UserCheck, color: COLORS.darkGreen },
  { name: "Sri A C S ArunKumar", role: "Member", icon: UserCheck, color: COLORS.mediumGreen },
  { name: "Dr. Girish H C", role: "Principal & Member", icon: Stethoscope, color: COLORS.darkGreen },
  { name: "Sri S. Vijayanand", role: "Member", icon: UserCheck, color: COLORS.mediumGreen },
];

const managementValues = [
  {
    icon: GraduationCap,
    title: "Quality Education",
    desc: "Providing quality dental education to all deserving students irrespective of their social and economic backgrounds.",
    color: COLORS.darkGreen,
  },
  {
    icon: Heart,
    title: "Moral Values",
    desc: "Inculcating moral values and discipline to shape students into responsible, compassionate dental professionals.",
    color: COLORS.mediumGreen,
  },
  {
    icon: Globe,
    title: "Global Standards",
    desc: "Maintaining world-class infrastructure and academic standards recognised by NAAC, NABH, DCI and international bodies.",
    color: COLORS.darkGreen,
  },
  {
    icon: BookOpen,
    title: "Research & Innovation",
    desc: "Encouragng cutting-edge dental research and publishing in national and international journals.",
    color: COLORS.mediumGreen,
  },
];

const AboutUsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = location.pathname;
    const currentTab = tabs.find(t => t.path === path)?.id || "overview";
    setActiveTab(currentTab);
  }, [location]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: (i % 4) * 0.1,
          ease: "power3.out",
        });
      });
      gsap.utils.toArray<HTMLElement>(".about-heading").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 95%" },
          opacity: 0,
          x: -20,
          duration: 0.9,
          ease: "power2.out",
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20 overflow-hidden">
        <PageHero
          title="About RRDCH"
          subtitle="A legacy of excellence in dental education, patient care and research since 1992."
          breadcrumbs={[{ label: "About Us" }]}
        />

        {/* ── Tab Navigation ── */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
              {tabs.map(({ id, label, icon: Icon, path }) => (
                <button
                  key={id}
                  onClick={() => navigate(path)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeTab === id
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════ OVERVIEW ══════════════════ */}
        {activeTab === "overview" && (
          <section className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="about-heading">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Est. 1992</p>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6 leading-tight">
                  Where <span className="text-primary">Excellence</span> Meets Compassion
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  RajaRajeswari Dental College &amp; Hospital was established in the year 1992 with just 40 admissions
                  in the BDS course, housed in a rented building measuring 40,000 sq. ft. Today it has grown into a
                  full-fledged Postgraduate Dental Institution with 100 BDS admissions and MDS courses in all
                  specialties of Dental Surgery.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  In addition, PhD in Orthodontics, Periodontology and a Certificate Course in Implantology are also
                  offered. The college is recognised by DCI, Government of Karnataka and Government of India, and is
                  affiliated to Rajiv Gandhi University of Health Sciences, Karnataka. It is accredited by NAAC with an
                  <strong className="text-foreground"> A+ Grade</strong>.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: "1992", label: "Year Established", color: "hsl(100,24%,34%)" },
                  { value: "100+", label: "BDS Seats", color: "hsl(95,25%,58%)" },
                  { value: "A+", label: "NAAC Grade", color: "hsl(100,24%,34%)" },
                  { value: "30+", label: "Years of Excellence", color: "hsl(95,25%,58%)" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="about-card bg-card border border-border rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <p className="text-4xl font-black mb-2" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Address card */}
            <div className="about-card bg-primary text-primary-foreground rounded-3xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/[0.03] rounded-full w-[600px] h-[600px] -top-40 -right-40 blur-3xl pointer-events-none" />
              <div className="relative z-10 grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/50 mb-2">Address</p>
                  <p className="font-heading font-semibold leading-relaxed">
                    No. 14, Ramohalli Cross, Kumbalgodu,<br />
                    Bengaluru – 560 074,<br />
                    Karnataka, India.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/50 mb-2">Phone</p>
                  <p className="font-heading font-semibold">+91-80-2843 7150</p>
                  <p className="font-heading font-semibold">+91-80-2843 7468</p>
                  <p className="font-heading font-semibold">+91 9901559955</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/50 mb-2">Email</p>
                  <p className="font-heading font-semibold">principalrrdch@gmail.com</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ TRUST ══════════════════ */}
        {activeTab === "trust" && (
          <section className="container mx-auto px-4 py-20">
            <div className="about-heading max-w-3xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">The Foundation</p>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6">
                Moogambigai <span className="text-primary">Charitable Trust</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Chairman <strong className="text-foreground">Sri A. C. Shanmugam, B.A., LLB</strong> — a former Member
                of Parliament and Member of the Legislative Assembly — established the{" "}
                <strong className="text-foreground">Moogambigai Charitable and Educational Trust (Regd.)</strong> in the
                year <strong className="text-foreground">1992</strong>, with the noble intention of gifting professional
                education to the deserving youth of the nation.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 mb-16">
              {/* Chairman profile */}
              <div className="about-card bg-card border border-border rounded-3xl p-10 relative overflow-hidden group hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-40 h-40 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity translate-x-10 -translate-y-6">
                  <Star className="w-full h-full text-primary" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-1">Sri A. C. Shanmugam</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-5">Founder Chairman, B.A., LLB</p>
                <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary pl-5">
                  "A former MP and MLA who envisioned building world-class professional institutions accessible to all
                  sections of society — driven by compassion, commitment and patriotism."
                </p>
              </div>

              {/* Trust overview */}
              <div className="about-card bg-muted/30 border border-border rounded-3xl p-10">
                <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                  Institutions Under the Trust
                </h3>
                <ul className="space-y-3">
                  {trustInstitutions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center text-primary mt-0.5 shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium text-foreground/80">{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Highlight strip */}
            <div className="about-card bg-primary text-primary-foreground rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 rounded-full w-96 h-96 mx-auto -top-20 blur-3xl pointer-events-none" />
              <p className="text-5xl font-black mb-3 relative z-10">8+</p>
              <p className="text-primary-foreground/70 text-lg relative z-10">
                Premier institutions under Moogambigai Charitable &amp; Educational Trust spanning medicine, dentistry,
                engineering and allied health sciences.
              </p>
            </div>
          </section>
        )}

        {/* ══════════════════ MANAGEMENT ══════════════════ */}
        {activeTab === "management" && (
          <section className="container mx-auto px-4 py-20">
            <div className="about-heading max-w-3xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Leadership</p>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6">
                Our <span className="text-primary">Management</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The management of RRDCH is committed to providing quality dental education to all deserving students
                irrespective of their social and economic backgrounds, and to inculcate moral values and discipline
                to make them responsible professionals and valuable citizens.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {managementValues.map((v, i) => (
                <div
                  key={i}
                  className="about-card group bg-card border border-border rounded-3xl p-10 hover:shadow-2xl transition-all hover:-translate-y-1 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] group-hover:opacity-[0.09] transition-opacity translate-x-8 -translate-y-4"
                    style={{ color: v.color }}
                  >
                    <v.icon className="w-full h-full" />
                  </div>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${v.color}15`, color: v.color }}
                  >
                    <v.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Mission statement banner */}
            <div className="about-card bg-muted/30 border border-border rounded-3xl p-10 md:p-14">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-3xl font-heading font-black text-foreground mb-5">
                    Committed to a <span className="text-primary">Brighter Future</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    The management strives to build an institution that stands as a beacon of quality, integrity and
                    service — ensuring every student who walks through our doors leaves as a skilled clinician and an
                    ethical human being.
                  </p>
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                    <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                    DCI Recognised | RGUHS Affiliated | NAAC A+ Accredited
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "100", label: "BDS Seats" },
                    { value: "9+", label: "MDS Specialties" },
                    { value: "PhD", label: "Research Programmes" },
                    { value: "5 Acres", label: "Campus" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white dark:bg-card border border-border rounded-2xl p-6 text-center shadow-soft">
                      <p className="text-3xl font-black text-primary mb-1">{s.value}</p>
                      <p className="text-xs uppercase font-bold tracking-wider text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══════════════════ VISION & MISSION ══════════════════ */}
        {activeTab === "vision" && (
          <section className="container mx-auto px-4 py-20">
            <div className="about-heading text-center max-w-3xl mx-auto mb-20">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Our Purpose</p>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
                Vision &amp; <span className="text-primary">Mission</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                The guiding principles that have shaped RRDCH since 1992.
              </p>
            </div>

            {/* Vision */}
            <div className="about-card bg-primary text-primary-foreground rounded-3xl p-12 md:p-16 mb-10 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/60">Our Vision</p>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading font-black mb-6 leading-tight">
                    To be a Globally Recognised Centre of Excellence
                  </h3>
                  <p className="text-primary-foreground/75 text-lg leading-relaxed">
                    To be a globally recognised, premier dental institution committed to providing outstanding dental
                    education, innovative research and comprehensive oral healthcare — thereby promoting the overall
                    well-being of the community.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    "Global recognition in dental education",
                    "Innovative research and clinical excellence",
                    "Comprehensive oral healthcare delivery",
                    "Community well-being and social responsibility",
                  ].map((pt, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 rounded-2xl px-5 py-4 border border-white/10">
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                      <span className="text-sm font-medium">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="about-card bg-card border border-border rounded-3xl p-12 md:p-16 relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Target className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Our Mission</p>
                  </div>
                  <h3 className="text-3xl font-heading font-black text-foreground mb-6 leading-tight">
                    Delivering Quality Care &amp; Education
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To provide high-quality dental education through modern curriculum, state-of-the-art infrastructure
                    and ethical clinical training — nurturing compassionate professionals who serve society with skill,
                    integrity and empathy.
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    { title: "Academic Excellence", desc: "Modern curriculum aligned with DCI and global dental education standards." },
                    { title: "Clinical Training", desc: "Hands-on patient care experience from day one, guided by expert faculty." },
                    { title: "Research Culture", desc: "Encouraging scholarly inquiry, publications and evidence-based dentistry." },
                    { title: "Community Outreach", desc: "Regular dental camps and awareness programmes for underserved populations." },
                  ].map((m, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <p className="font-heading font-bold text-foreground text-sm mb-1">{m.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Policy */}
            <div className="about-card mt-10 bg-muted/30 border border-border rounded-3xl p-10 text-center">
              <BookOpen className="w-10 h-10 text-primary mx-auto mb-5" />
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Quality Policy</h3>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed italic">
                "RRDCH is committed to continual improvement in dental education, patient care and institutional
                governance — fostering an environment of learning, ethics and service that benefits students,
                patients and the community at large."
              </p>
            </div>
          </section>
        )}

        {/* ══════════════════ GOVERNING COUNCIL ══════════════════ */}
        {activeTab === "council" && (
          <section className="container mx-auto px-4 py-20">
            <div className="about-heading max-w-3xl mb-16">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Leadership</p>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6">
                Governing <span className="text-primary">Council</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The Governing Council of RajaRajeswari Dental College &amp; Hospital is composed of distinguished
                leaders who guide the institution's academic, clinical and administrative excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {governingCouncil.map((member, i) => (
                <div
                  key={i}
                  className="about-card group bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-24 h-24 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity translate-x-6 -translate-y-4"
                    style={{ color: member.color }}
                  >
                    <member.icon className="w-full h-full" />
                  </div>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${member.color}15`, color: member.color }}
                  >
                    <member.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">{member.role}</p>
                </div>
              ))}
            </div>

            {/* Regulatory strip */}
            <div className="about-card bg-muted/30 border border-border rounded-3xl p-10">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
                Regulatory <span className="text-primary">Compliance</span>
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Dental Council of India (DCI) Recognised",
                  "Government of Karnataka Approved",
                  "RGUHS Affiliated",
                  "MoH&FW, Govt. of India Permitted",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white dark:bg-card border border-border rounded-2xl p-5 shadow-soft">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
};

export default AboutUsPage;
