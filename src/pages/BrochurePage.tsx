import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { 
  Download, 
  BookOpen, 
  GraduationCap, 
  Stethoscope, 
  Target, 
  Compass, 
  Award, 
  Users, 
  Microscope, 
  ShieldCheck, 
  Library, 
  HeartPulse, 
  Construction,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import chairmanImg from "@/assets/chairman.jpg";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: GraduationCap, label: "BDS Programme", desc: "4-year degree + 1-year compulsory internship with exposure to 300+ daily out-patients." },
  { icon: Microscope, label: "MDS Programme", desc: "Advanced 3-year postgraduate courses across 9 specialized dental disciplines." },
  { icon: Stethoscope, label: "NABH Accredited", desc: "The first dental college in Karnataka to be accredited by the National Accreditation Board for Hospitals." },
  { icon: Award, label: "NAAC A+ Graded", desc: "Recognized for excellence in education, infrastructure, and research with the highest grading." },
];

const departments = [
  { name: "Oral Medicine & Radiology", icon: Microscope },
  { name: "Prosthodontics and Crown & Bridge", icon: Stethoscope },
  { name: "Oral & Maxillofacial Surgery", icon: HeartPulse },
  { name: "Periodontology", icon: Target },
  { name: "Pedodontics & Preventive Dentistry", icon: Users },
  { name: "Conservative Dentistry & Endodontics", icon: ShieldCheck },
  { name: "Orthodontics & Dentofacial Orthopedics", icon: Compass },
  { name: "Public Health Dentistry", icon: HeartPulse },
  { name: "Oral & Maxillofacial Pathology", icon: Microscope },
  { name: "Implantology", icon: Construction },
  { name: "Research & Publication", icon: BookOpen },
  { name: "Orofacial Pain", icon: HeartPulse },
];

const facilities = [
  { title: "Digital Library", desc: "Over 10,000 books and international journals with 24/7 digital access." },
  { title: "Modern Clinics", icon: Stethoscope, desc: "300+ electronic dental chairs with state-of-the-art diagnostic equipment." },
  { title: "Hi-Tech Labs", icon: Microscope, desc: "Specialized labs for phantom head training and porcelain work." },
  { title: "Auditorium", icon: Users, desc: "Centrally air-conditioned 500-seater venue for international conferences." },
];

const BrochurePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections and elements as they enter viewport
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background text-foreground scroll-smooth">
        <PageHero
          title="Digital Prospectus"
          subtitle="A comprehensive guide to academic excellence, clinical mastery, and institutional heritage at RRDCH."
          breadcrumbs={[{ label: "Brochure" }]}
        />

        {/* Vision & Mission Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="fade-up bg-primary/5 border border-primary/20 p-10 rounded-3xl relative overflow-hidden group hover:bg-primary/10 transition-colors">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4 text-primary">Our Vision</h2>
                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  "To provide world-class dental education, research, and community services by fostering ethical practices and spiritual values."
                </p>
              </div>
            </div>

            <div className="fade-up bg-secondary/5 border border-secondary/20 p-10 rounded-3xl relative overflow-hidden group hover:bg-secondary/10 transition-colors">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center mb-6 shadow-lg shadow-secondary/20">
                  <Compass className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4 text-secondary">Our Mission</h2>
                <p className="text-lg leading-relaxed text-muted-foreground italic">
                  "To promote quality dental healthcare to the society through innovative research and empathetic patient care of global standards."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chairman's Message */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="fade-up relative">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                  <img 
                    src={chairmanImg} 
                    alt="Chairman" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-accent p-8 rounded-2xl shadow-xl max-w-[280px]">
                  <p className="text-accent-foreground font-heading font-bold text-xl mb-1">Dr. A. C. Shanmugam</p>
                  <p className="text-accent-foreground/70 text-xs uppercase tracking-widest font-semibold">B.A., L.L.B, FIMSA, FRCPS (Glasgow, UK)</p>
                </div>
              </div>
              <div className="fade-up">
                <h3 className="text-primary font-heading font-bold text-sm tracking-widest uppercase mb-4">Founder's Message</h3>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-8 leading-tight">
                  Shaping the Future of <span className="text-primary">Dental Excellence</span>
                </h2>
                <div className="prose prose-sm md:prose-base text-muted-foreground leading-relaxed space-y-4">
                  <p>
                    RajaRajeswari Dental College & Hospital (RRDCH) was founded with a clear objective: to bring world-class dental education and healthcare to the doorstep of every citizen. 
                  </p>
                  <p>
                    Since 1992, we have transitioned from a humble start to a premier postgraduate institution. Our 5-acre campus in Bengaluru is not just a place of learning; it is a center of clinical innovation where students are trained to be compassionate clinicians and ethical leaders.
                  </p>
                  <p>
                    We invite you to explore our digital prospectus and join us in our journey towards creating a healthier society through dental excellence.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-border">
                    <Award className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm font-bold">NAAC A+</p>
                      <p className="text-[10px] text-muted-foreground">Highest Grade</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-card p-4 rounded-xl shadow-sm border border-border">
                    <ShieldCheck className="w-8 h-8 text-secondary" />
                    <div>
                      <p className="text-sm font-bold">NABH</p>
                      <p className="text-[10px] text-muted-foreground">Certified Hospital</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Overview */}
        <section className="py-24 container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 fade-up">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Academic Programs</h2>
            <p className="text-muted-foreground">Comprehensive dental education from graduation to doctoral research.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <div key={i} className="fade-up bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{item.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Departments Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="fade-up">
                <p className="text-primary-foreground/60 font-heading font-bold uppercase tracking-widest text-xs mb-4">Departments</p>
                <h2 className="text-4xl md:text-5xl font-heading font-black">Clinical & Academic <br /> <span className="text-accent">Specialities</span></h2>
              </div>
              <p className="fade-up text-primary-foreground/70 max-w-md text-sm leading-relaxed">
                RRDCH boasts 12 full-fledged departments equipped with advanced diagnostic and surgical tools, offering comprehensive specialized care and training.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {departments.map((dept, i) => (
                <div key={i} className="fade-up bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl p-5 backdrop-blur-sm transition-all group flex items-center gap-4 cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <dept.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-medium text-sm">{dept.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Infrastructure Highlights */}
        <section className="py-24 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="fade-up">
              <h2 className="text-4xl font-heading font-bold mb-8">World-Class <span className="text-secondary">Infrastructure</span></h2>
              <div className="space-y-6">
                {facilities.map((f, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-2xl border border-border bg-card/50 hover:bg-card transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      {i === 0 ? <Library className="w-6 h-6" /> : i === 1 ? <HeartPulse className="w-6 h-6" /> : i === 2 ? <Microscope className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-1">{f.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="fade-up h-full flex flex-col justify-between pt-10">
              <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-10 relative overflow-hidden h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="text-2xl font-heading font-black text-primary mb-6">Patient-Centric Care</h3>
                  <p className="text-muted-foreground mb-8 text-lg">
                    With an average of 300+ patients daily, our students receive unparalleled clinical exposure. This hands-on training is facilitated by 300+ hi-tech dental chairs and advanced digital imaging systems.
                  </p>
                  <div className="mt-auto pt-10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white/50 dark:bg-card rounded-2xl border border-border">
                        <p className="text-3xl font-black text-primary mb-1">300+</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Dental Chairs</p>
                      </div>
                      <div className="text-center p-4 bg-white/50 dark:bg-card rounded-2xl border border-border">
                        <p className="text-3xl font-black text-secondary mb-1">5+</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Acres Campus</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Opportunities */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-heading font-bold mb-10 fade-up">International Recognitions</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80 fade-up">
              {["RCPS (Glasgow)", "Royal College of Surgeons (UK)", "DCI Recognized", "RGUHS Affiliated"].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                  <span className="font-heading font-bold uppercase tracking-widest text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 leading-tight">
                  Start Your Journey <br /> With <span className="text-primary">RRDCH</span> Today.
                </h2>
                <p className="text-background/70 mb-10 text-lg max-w-md">
                  Join a community of clinical innovators and ethical practitioners in the heart of Bengaluru.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="http://www.rrdch.org/pdf/brochure.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-heading font-bold hover:scale-105 transition-transform"
                  >
                    <Download className="w-5 h-5" /> Download Full PDF
                  </a>
                  <a 
                    href="/#contact" 
                    className="flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-2xl font-heading font-bold hover:bg-white/20 transition-colors"
                  >
                    Enquire Now <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="bg-white/10 border border-white/20 rounded-3xl p-10 backdrop-blur-md">
                <h4 className="font-heading font-bold text-xl mb-6">Admission Office</h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm text-background/80">No. 14, Ramohalli Cross, Kumbalgodu, <br /> Mysore Road, Bengaluru – 560074</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <a href="tel:+918028437150" className="text-sm font-bold hover:text-primary transition-colors">+91-80-2843 7150</a>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <a href="mailto:principalrrdch@gmail.com" className="text-sm font-bold hover:text-primary transition-colors">principalrrdch@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default BrochurePage;
