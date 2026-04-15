import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Trophy, Star, Globe, Award } from "lucide-react";

const recognitions = [
  {
    icon: Trophy,
    year: "2025",
    title: "NABH Accreditation (Renewed)",
    body: "National Accreditation Board for Hospitals & Healthcare Providers",
    desc: "Hospital re-accredited for maintaining exemplary standards in patient safety and quality of care.",
  },
  {
    icon: Star,
    year: "2024",
    title: "NAAC A+ Grade",
    body: "National Assessment & Accreditation Council (UGC)",
    desc: "Awarded an A+ grade in the 3rd cycle of assessment, confirming sustained academic excellence.",
  },
  {
    icon: Globe,
    year: "2023",
    title: "IAO Recognition",
    body: "International Accreditation Organisation",
    desc: "Recognised as an institution of global academic significance.",
  },
  {
    icon: Award,
    year: "2022",
    title: "RCPSG Recognition",
    body: "Royal College of Physicians & Surgeons of Glasgow, UK",
    desc: "Recognised for Part 1 & 2 Membership of the Faculty of Dental Surgery (MFDS) examinations.",
  },
  {
    icon: Award,
    year: "2021",
    title: "SLMC Recognition",
    body: "Sri Lanka Medical Council",
    desc: "RRDCH degrees recognised by the Sri Lanka Medical Council.",
  },
  {
    icon: Trophy,
    year: "2020",
    title: "ISO 9001:2015 Certification",
    body: "International Organisation for Standardisation",
    desc: "ISO certification for quality management systems across academic and hospital operations.",
  },
];

const RecognitionsPage = () => (
  <PageLayout>
    <PageHero
      title="Recognitions & Awards"
      subtitle="Milestones that reflect our unwavering commitment to excellence in dental education and healthcare"
      breadcrumbs={[{ label: "Recognitions" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-muted-foreground leading-relaxed">
          Over the years, Rajarajeswari Dental College & Hospital has earned recognition
          from prestigious national and international bodies, affirming our dedication to
          quality education, patient care, and institutional leadership.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
        <div className="space-y-8">
          {recognitions.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="relative flex gap-6">
                {/* Circle */}
                <div className="w-16 flex-shrink-0 flex items-start justify-center pt-1 z-10">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                {/* Card */}
                <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <h3 className="font-heading font-bold text-base text-foreground">
                      {r.title}
                    </h3>
                    <span className="text-xs font-heading font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {r.year}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mb-2">{r.body}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default RecognitionsPage;
