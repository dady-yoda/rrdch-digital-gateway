import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Award, ExternalLink, FileDown } from "lucide-react";

const accreditations = [
  {
    name: "NAAC",
    label: "National Assessment & Accreditation Council",
    grade: "A+",
    desc: "RRDCH has been accredited by NAAC with a high grade, recognising academic excellence and institutional quality.",
    href: "/accreditation/naac",
    internal: true,
    badge: "A+ Grade",
  },
  {
    name: "NABH",
    label: "National Accreditation Board for Hospitals",
    grade: "",
    desc: "NABH accreditation certifying that RRDCH hospital meets the highest quality and safety standards in patient care.",
    href: "https://www.rrdch.org/rrdch/wp-content/uploads/2025/07/NABH-accredited.pdf",
    internal: false,
    badge: "Accredited",
  },
  {
    name: "ISO",
    label: "International Organisation for Standardisation",
    grade: "",
    desc: "ISO certification demonstrating adherence to internationally recognised quality management systems.",
    href: "https://www.rrdch.org/rrdch/wp-content/uploads/2026/02/ISO-certificate-of-registration-12.05.2027.pdf",
    internal: false,
    badge: "Certified",
  },
  {
    name: "IAO",
    label: "International Accreditation Organisation",
    grade: "",
    desc: "Recognised by IAO as an institution of global academic excellence.",
    href: "https://www.iao.org/India-Karnataka/RajaRajeswari-Dental-College-And-Hospital",
    internal: false,
    badge: "Member",
  },
  {
    name: "RCPSG",
    label: "Royal College of Physicians & Surgeons of Glasgow",
    grade: "",
    desc: "Recognised by RCPSG, UK for Part 1 & 2 MFDS examinations, enabling students to pursue international qualifications.",
    href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/RCPSG.pdf",
    internal: false,
    badge: "Recognised",
  },
  {
    name: "SLMC",
    label: "Sri Lanka Medical Council",
    grade: "",
    desc: "RRDCH is recognised by the Sri Lanka Medical Council for dental degrees.",
    href: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/07/SLMC.pdf",
    internal: false,
    badge: "Recognised",
  },
  {
    name: "NIRF",
    label: "National Institutional Ranking Framework",
    grade: "",
    desc: "Ranked by the Ministry of Education, Government of India as part of the NIRF framework for dental colleges.",
    href: "/accreditation/nirf",
    internal: true,
    badge: "Ranked",
  },
  {
    name: "AISHE",
    label: "All India Survey on Higher Education",
    grade: "",
    desc: "Registered with AISHE conducted by the Ministry of Education to capture institutional data and quality metrics.",
    href: "https://www.rrdch.org/rrdch/wp-content/uploads/2023/02/RRDCH-AISHE_Certificate-1.pdf",
    internal: false,
    badge: "Registered",
  },
];

const AccreditationPage = () => (
  <PageLayout>
    <PageHero
      title="Accreditations & Certifications"
      subtitle="RRDCH holds multiple national and international accreditations affirming academic and clinical excellence"
      breadcrumbs={[{ label: "Accreditation" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Award className="w-4 h-4" />
          Quality Assurance
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Our commitment to excellence is validated by leading accreditation bodies
          nationally and internationally. Each certification reflects our dedication
          to quality education, patient care, and institutional governance.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {accreditations.map((acc) => (
          <div
            key={acc.name}
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-sm">
                {acc.name.slice(0, 3)}
              </div>
              <span className="text-xs font-medium bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full border border-secondary/30">
                {acc.badge}
              </span>
            </div>
            <h3 className="font-heading font-bold text-base text-foreground mb-1">
              {acc.name}
            </h3>
            <p className="text-xs text-muted-foreground mb-3 font-medium">
              {acc.label}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {acc.desc}
            </p>
            <a
              href={acc.href}
              target={acc.internal ? undefined : "_blank"}
              rel={acc.internal ? undefined : "noopener noreferrer"}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {acc.internal ? (
                <>View Details <span aria-hidden>→</span></>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  View Certificate
                  <ExternalLink className="w-3 h-3" />
                </>
              )}
            </a>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default AccreditationPage;
