import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { TrendingUp, ExternalLink, Info, BarChart3 } from "lucide-react";

const parameters = [
  { label: "Teaching, Learning & Resources", weight: "30%", score: "—" },
  { label: "Research and Professional Practice", weight: "30%", score: "—" },
  { label: "Graduation Outcomes", weight: "20%", score: "—" },
  { label: "Outreach and Inclusivity", weight: "10%", score: "—" },
  { label: "Perception", weight: "10%", score: "—" },
];

const NirfPage = () => (
  <PageLayout>
    <PageHero
      title="NIRF Ranking"
      subtitle="National Institutional Ranking Framework — Ministry of Education, Govt. of India"
      breadcrumbs={[
        { label: "Accreditation", href: "/accreditation" },
        { label: "NIRF" },
      ]}
    />

    <section className="container mx-auto px-4 py-14">
      {/* Intro Card */}
      <div className="grid lg:grid-cols-3 gap-8 mb-14">
        <div
          className="col-span-2 rounded-2xl p-8 shadow-lg text-primary-foreground"
          style={{
            background:
              "linear-gradient(135deg, hsl(100,24%,29%) 0%, hsl(95,25%,48%) 100%)",
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-accent" />
            <h2 className="font-heading font-bold text-xl">NIRF Ranking Overview</h2>
          </div>
          <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">
            Rajarajeswari Dental College & Hospital participates in the National
            Institutional Ranking Framework (NIRF) introduced by the Ministry of
            Education, Government of India. NIRF ranks institutions across multiple
            parameters to provide students and stakeholders with transparent,
            data-driven insights.
          </p>
          <a
            href="https://www.rrdch.org/nirf/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition"
          >
            <ExternalLink className="w-4 h-4" /> View NIRF Data Sheet
          </a>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <p className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Ranking Category
            </p>
            <p className="font-heading font-bold text-2xl text-primary mb-1">
              Dental
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Ministry of Education
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              NIRF evaluates dental colleges on five broad parameters. RRDCH
              submits data annually for assessment.
            </p>
          </div>
        </div>
      </div>

      {/* Parameters */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-xl text-foreground">
            Ranking Parameters
          </h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-6 py-3 font-heading font-semibold">#</th>
                <th className="text-left px-6 py-3 font-heading font-semibold">Parameter</th>
                <th className="text-left px-6 py-3 font-heading font-semibold">Weightage</th>
                <th className="text-left px-6 py-3 font-heading font-semibold">Score (2024)</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((p, i) => (
                <tr
                  key={p.label}
                  className={`border-t border-border ${i % 2 === 0 ? "" : "bg-muted/40"}`}
                >
                  <td className="px-6 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-6 py-3 font-medium text-foreground">{p.label}</td>
                  <td className="px-6 py-3 text-muted-foreground">{p.weight}</td>
                  <td className="px-6 py-3 text-muted-foreground">{p.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-3 flex items-start gap-1.5">
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          Detailed scores are published annually by the Ministry of Education on the official NIRF portal.
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <h3 className="font-heading font-semibold text-primary text-lg mb-2">About NIRF</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The National Institutional Ranking Framework (NIRF) was approved by the
          Ministry of Human Resource Development (now Ministry of Education) in
          September 2015. It outlines a methodology to rank institutions across the
          country based on Teaching, Learning and Resources; Research and
          Professional Practices; Graduation Outcomes; Outreach and Inclusivity;
          and Perception.
        </p>
      </div>
    </section>
  </PageLayout>
);

export default NirfPage;
