import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Building2, Users, BookOpen, Stethoscope, ExternalLink } from "lucide-react";

const intakeDetails = [
  { program: "BDS", seats: 100, duration: "5 Years (4+1 Internship)" },
  { program: "MDS", seats: 44, duration: "3 Years" },
  { program: "Ph.D", seats: 10, duration: "3–5 Years" },
];

const infrastructure = [
  { icon: Stethoscope, label: "Dental Chairs", value: "300+" },
  { icon: Building2, label: "Departments", value: "9" },
  { icon: Users, label: "Faculty", value: "120+" },
  { icon: BookOpen, label: "Library Books", value: "10,000+" },
];

const DciPage = () => (
  <PageLayout>
    <PageHero
      title="DCI Mandatory Disclosure"
      subtitle="Dental Council of India — Mandatory Disclosure for Rajarajeswari Dental College & Hospital"
      breadcrumbs={[{ label: "DCI Mandatory Disclosure" }]}
    />

    <section className="container mx-auto px-4 py-14">

      {/* Infrastructure Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {infrastructure.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div className="font-heading font-black text-3xl text-primary mb-1">{value}</div>
            <div className="text-sm text-muted-foreground font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* General Info */}
      <div className="grid lg:grid-cols-2 gap-10 mb-14">
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-5 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" /> Institution Details
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            {[
              ["Name of Institution", "Rajarajeswari Dental College & Hospital"],
              ["Type", "Private — Self-Financing"],
              ["Established", "2001"],
              ["Affiliated University", "Rajiv Gandhi University of Health Sciences (RGUHS), Bengaluru"],
              ["Recognition", "Dental Council of India (DCI)"],
              ["Address", "No. 14, Ramohalli Cross, Kumbalgodu, Bengaluru - 560 074"],
              ["Phone", "+91-80-2843 7150 / 7468"],
              ["Email", "principalrrdch@gmail.com"],
            ].map(([key, val]) => (
              <div key={key} className="flex border-t border-border first:border-t-0">
                <div className="w-44 flex-shrink-0 px-4 py-3 bg-muted/40 text-xs font-semibold text-muted-foreground">
                  {key}
                </div>
                <div className="px-4 py-3 text-sm text-foreground">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Intake Table */}
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Approved Intake
          </h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-5 py-3 font-heading font-semibold">Programme</th>
                  <th className="text-left px-5 py-3 font-heading font-semibold">Seats</th>
                  <th className="text-left px-5 py-3 font-heading font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {intakeDetails.map((row, i) => (
                  <tr key={row.program} className={`border-t border-border ${i % 2 !== 0 ? "bg-muted/30" : ""}`}>
                    <td className="px-5 py-3 font-medium text-foreground">{row.program}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.seats}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <h3 className="font-heading font-semibold text-primary text-sm mb-2">
              About DCI
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The Dental Council of India (DCI) is the statutory body that
              regulates dental education and practice in India under the
              Dentists Act, 1948.
            </p>
            <a
              href="https://www.rrdch.org/dci-mandatory/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> View Full Disclosure on old site
            </a>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default DciPage;
