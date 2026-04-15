import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Star, ExternalLink, BookOpen, BarChart3, CheckCircle2 } from "lucide-react";

const criteria = [
  { label: "Curricular Aspects", score: "3.50" },
  { label: "Teaching-Learning & Evaluation", score: "3.48" },
  { label: "Research, Innovations & Extension", score: "3.12" },
  { label: "Infrastructure & Learning Resources", score: "3.51" },
  { label: "Student Support & Progression", score: "3.47" },
  { label: "Governance, Leadership & Management", score: "3.52" },
  { label: "Institutional Values & Best Practices", score: "3.55" },
];

const highlights = [
  "CGPA of 3.46 out of 4.00 — A+ Grade",
  "Accreditated in 3rd cycle by NAAC",
  "Strong focus on research and innovation",
  "State-of-the-art dental hospital facilities",
  "Robust student welfare programmes",
  "Transparent governance and ethical practices",
];

const NaacPage = () => (
  <PageLayout>
    <PageHero
      title="NAAC Accreditation"
      subtitle="National Assessment & Accreditation Council — RRDCH has been awarded the A+ Grade"
      breadcrumbs={[
        { label: "Accreditation", href: "/accreditation" },
        { label: "NAAC" },
      ]}
    />

    <section className="container mx-auto px-4 py-14">
      {/* Grade Banner */}
      <div
        className="rounded-2xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8 shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, hsl(100,24%,29%) 0%, hsl(95,25%,48%) 100%)",
        }}
      >
        <div className="flex flex-col items-center justify-center bg-primary-foreground/10 rounded-2xl w-36 h-36 flex-shrink-0 border border-primary-foreground/20">
          <span className="font-heading font-black text-5xl text-primary-foreground">A+</span>
          <span className="text-primary-foreground/70 text-xs mt-1 font-medium tracking-widest">GRADE</span>
        </div>
        <div className="text-center md:text-left">
          <h2 className="font-heading font-bold text-2xl text-primary-foreground mb-2">
            3rd Cycle NAAC Accreditation
          </h2>
          <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xl">
            RRDCH has been accredited by the National Assessment and Accreditation
            Council (NAAC) with an A+ grade, reflecting the institution's sustained
            commitment to quality in dental education and patient care.
          </p>
          <a
            href="https://www.rrdch.org/accreditation/naac/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition"
          >
            <ExternalLink className="w-4 h-4" /> View Full Report
          </a>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-14">
        {/* Criteria Scores */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-xl text-foreground">
              Criteria-wise Score
            </h2>
          </div>
          <div className="space-y-3">
            {criteria.map((c) => (
              <div key={c.label} className="bg-card border border-border rounded-lg px-5 py-3 flex justify-between items-center">
                <span className="text-sm text-foreground font-medium">{c.label}</span>
                <span className="font-heading font-bold text-primary text-sm">{c.score}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-primary text-primary-foreground rounded-lg px-5 py-3 flex justify-between items-center font-heading font-bold">
            <span>CGPA</span>
            <span>3.46 / 4.00</span>
          </div>
        </div>

        {/* Highlights */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-xl text-foreground">
              Key Highlights
            </h2>
          </div>
          <ul className="space-y-4">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{h}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="font-heading font-semibold text-sm text-foreground">
                About NAAC
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The National Assessment and Accreditation Council (NAAC) is an
              autonomous body established by the University Grants Commission (UGC)
              to assess and accredit institutions of higher education in India.
            </p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default NaacPage;
