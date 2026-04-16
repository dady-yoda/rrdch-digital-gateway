import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { 
  ShieldAlert, 
  Phone, 
  Mail, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Search,
  Users
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const members = [
  { name: "Dr. Savita S", role: "Chairperson", designation: "Principal, RRDCH" },
  { name: "Dr. Navaneetham R", role: "Member Secretary", designation: "Professor & HOD" },
  { name: "Dr. J. Dinesh Kumar", role: "Member", designation: "Professor & HOD" },
  { name: "Dr. Rajkumar S", role: "Member", designation: "Professor" },
  { name: "Mr. Shivalingaswamy", role: "Member", designation: "Administrative Officer" },
  { name: "Local Police Inspector", role: "Member", designation: "Civil Administration" },
  { name: "Student Representative", role: "Member", designation: "General Secretary (Students)" },
];

const measures = [
  "Zero-tolerance policy against any form of ragging on campus or hostels.",
  "24/7 Anti-Ragging Helpline accessible to all students and parents.",
  "Anonymous complaint boxes strategically placed in the campus and library.",
  "Compulsory anti-ragging affidavits collected from every student and parent.",
  "Regular sensitisation workshops and orientation programs for freshers.",
  "Strict disciplinary action including immediate suspension or expulsion."
];

const AntiRaggingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animations
      gsap.from(".ar-card", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.utils.toArray<HTMLElement>(".ar-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20 overflow-hidden">
        <PageHero
          title="Anti-Ragging Compliance"
          subtitle="Upholding a zero-tolerance policy to ensure a safe, inclusive, and protected campus environment."
          breadcrumbs={[
            { label: "Committees", href: "/committee" },
            { label: "Anti-Ragging" }
          ]}
        />

        {/* Global Warning Banner */}
        <section className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="bg-red-500 text-white rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 border-4 border-background overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldAlert className="w-32 h-32" />
            </div>
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-heading font-black mb-2 uppercase tracking-tight">Ragging is a Criminal Offence</h2>
              <p className="text-white/80 leading-relaxed font-medium">
                As per the **UGC Regulations 2009** and **Supreme Court Mandates**, any act of ragging is strictly prohibited. 
                Offenders are liable for immediate expulsion and criminal prosecution under IPC.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="bg-white/10 px-6 py-3 rounded-xl text-center text-xs font-bold uppercase tracking-widest border border-white/20 whitespace-nowrap">
                Zero Tolerance Campus
              </div>
            </div>
          </div>
        </section>

        {/* Helplines Dashboard */}
        <section className="ar-section container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="ar-card bg-card border border-border rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-soft hover:border-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-black text-xl mb-2">National Helpline</h3>
              <p className="text-sm text-muted-foreground mb-6">24/7 Toll-Free Support (UGC)</p>
              <a href="tel:18001805522" className="text-2xl font-black text-primary hover:tracking-wider transition-all">
                1800-180-5522
              </a>
            </div>

            <div className="ar-card bg-card border border-border rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-soft hover:border-primary/30 transition-all group lg:scale-110 relative z-10 bg-gradient-to-br from-card to-primary/5">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 text-primary-foreground shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-black text-xl mb-2">RRDCH Anti-Ragging</h3>
              <p className="text-sm text-muted-foreground mb-6">Internal Emergency Contact</p>
              <a href="tel:+918028437150" className="text-2xl font-black text-primary transition-all">
                080-2843 7150
              </a>
              <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" /> Available 24/7
              </div>
            </div>

            <div className="ar-card bg-card border border-border rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-soft hover:border-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-black text-xl mb-2">Email Official</h3>
              <p className="text-sm text-muted-foreground mb-6">Direct Principal Redressal</p>
              <a href="mailto:principalrrdch@gmail.com" className="text-lg font-black text-primary hover:underline">
                principalrrdch@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* Preventive Measures & Committee */}
        <section className="ar-section container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-10">
                <h3 className="text-3xl font-heading font-black text-foreground mb-4 flex items-center gap-3">
                  <ShieldCheck className="text-primary w-8 h-8" /> Safety <span className="text-primary">Measures</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6">
                  Comprehensive institutional protocols to ensure a safe environment for every student.
                </p>
              </div>
              <div className="space-y-4">
                {measures.map((measure, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30 border border-border group hover:bg-white transition-colors">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80 leading-relaxed group-hover:text-foreground">{measure}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-[3rem] p-10 shadow-soft self-start">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-heading font-black text-foreground">Committee <span className="text-primary">Members</span></h3>
                <Users className="text-primary/10 w-12 h-12" />
              </div>
              <div className="space-y-6">
                {members.map((member, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-border last:border-0 hover:bg-primary/5 transition-colors rounded-xl px-4 -mx-4">
                    <div className="mb-2 md:mb-0">
                      <div className="font-heading font-bold text-foreground">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.designation}</div>
                    </div>
                    <div className="px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest text-center md:text-left self-start md:self-auto">
                      {member.role}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Search className="w-4 h-4" /> Full administrative list available in office.
                </p>
                <a 
                  href="https://www.rrdch.org/anti-ragging/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest hover:underline"
                >
                  Legacy Details <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default AntiRaggingPage;
