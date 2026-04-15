import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { ShieldCheck, FileText, Users, HelpCircle } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Medical Coverage",
    desc: "All regular employees and their dependants are covered under ESI for medical benefits including outpatient, inpatient, and specialist care.",
  },
  {
    icon: FileText,
    title: "Sickness Benefits",
    desc: "Employees receive cash compensation at 70% of average daily wages during certified sickness periods for up to 91 days in a year.",
  },
  {
    icon: Users,
    title: "Maternity & Dependant Benefits",
    desc: "Maternity benefits of up to 26 weeks and dependant benefits for family members in case of employment injury or death.",
  },
  {
    icon: HelpCircle,
    title: "Disablement & Rehabilitation",
    desc: "Permanent and temporary disablement benefits along with vocational rehabilitation support for insured persons.",
  },
];

const EsiPage = () => (
  <PageLayout>
    <PageHero
      title="Employee State Insurance (ESI)"
      subtitle="Statutory benefits protecting RRDCH employees under the ESI Act, 1948"
      breadcrumbs={[{ label: "ESI" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="max-w-3xl mb-12">
        <h2 className="font-heading font-bold text-2xl text-primary mb-4">
          About ESI at RRDCH
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Rajarajeswari Dental College & Hospital is registered under the
          Employees' State Insurance Act, 1948. All eligible employees
          contribute to and benefit from the ESI scheme, which provides
          comprehensive social security covering health, maternity, disability,
          and other welfare benefits.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          The ESI scheme is administered by the Employees' State Insurance
          Corporation (ESIC) under the Ministry of Labour & Employment,
          Government of India. RRDCH ensures timely remittance of contributions
          and smooth processing of all employee claims.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-base text-foreground mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Contribution Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm mb-14">
        <div className="bg-primary px-6 py-4">
          <h3 className="font-heading font-bold text-primary-foreground text-lg">
            Contribution Rates (2024–25)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="text-left px-6 py-3 font-heading font-semibold text-foreground">
                  Contributor
                </th>
                <th className="text-left px-6 py-3 font-heading font-semibold text-foreground">
                  Rate
                </th>
                <th className="text-left px-6 py-3 font-heading font-semibold text-foreground">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-6 py-3 font-medium text-foreground">
                  Employer
                </td>
                <td className="px-6 py-3 text-muted-foreground">3.25%</td>
                <td className="px-6 py-3 text-muted-foreground">
                  Of gross wages
                </td>
              </tr>
              <tr className="border-t border-border bg-muted/40">
                <td className="px-6 py-3 font-medium text-foreground">
                  Employee
                </td>
                <td className="px-6 py-3 text-muted-foreground">0.75%</td>
                <td className="px-6 py-3 text-muted-foreground">
                  Of gross wages (exempt if wages ≤ ₹176/day)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <h3 className="font-heading font-semibold text-primary text-lg mb-2">
          ESI Queries
        </h3>
        <p className="text-sm text-muted-foreground">
          For ESI-related queries, contact the HR & Administration office at{" "}
          <a
            href="mailto:principalrrdch@gmail.com"
            className="text-primary underline underline-offset-4"
          >
            principalrrdch@gmail.com
          </a>{" "}
          or call{" "}
          <a href="tel:+918028437150" className="text-primary underline underline-offset-4">
            +91-80-2843 7150
          </a>
          .
        </p>
      </div>
    </section>
  </PageLayout>
);

export default EsiPage;
