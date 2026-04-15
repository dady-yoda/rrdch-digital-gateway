import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Download, BookOpen, GraduationCap, Stethoscope } from "lucide-react";

const highlights = [
  { icon: GraduationCap, label: "BDS Programme", desc: "4-year degree + 1-year compulsory internship" },
  { icon: GraduationCap, label: "MDS Programme", desc: "3-year postgraduate course across 9 specialities" },
  { icon: Stethoscope, label: "300+ Dental Chairs", desc: "State-of-the-art multi-specialty dental hospital" },
  { icon: BookOpen, label: "10,000+ Books", desc: "Comprehensive library with journals and e-resources" },
];

const BrochurePage = () => (
  <PageLayout>
    <PageHero
      title="College Brochure"
      subtitle="Everything you need to know about Rajarajeswari Dental College & Hospital — in one document"
      breadcrumbs={[{ label: "Brochure" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Preview Card */}
        <div>
          <div
            className="rounded-2xl p-8 text-primary-foreground shadow-xl relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, hsl(100,24%,25%) 0%, hsl(100,24%,34%) 50%, hsl(95,25%,50%) 100%)",
            }}
          >
            {/* Decorative */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 bg-primary-foreground" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 bg-accent" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/60 font-heading font-semibold tracking-widest uppercase">
                    Official Publication
                  </p>
                  <p className="font-heading font-bold text-lg text-primary-foreground">
                    RRDCH Brochure 2025–26
                  </p>
                </div>
              </div>

              <h2 className="font-heading font-black text-3xl text-primary-foreground mb-2 leading-tight">
                Rajarajeswari Dental College & Hospital
              </h2>
              <p className="text-primary-foreground/70 text-sm mb-2">
                No. 14, Ramohalli Cross, Kumbalgodu, Bengaluru – 560074
              </p>
              <p className="text-primary-foreground/70 text-sm mb-8">
                Affiliated to RGUHS · Recognised by DCI · Multi-Accredited Institution
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {["NAAC A+ Graded", "NABH Accredited", "ISO Certified", "RCPSG Recognised"].map((tag) => (
                  <div
                    key={tag}
                    className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg px-3 py-2 text-xs font-medium text-primary-foreground text-center"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading font-bold py-3 rounded-xl hover:opacity-90 transition text-sm"
              >
                <Download className="w-5 h-5" /> Download Brochure (PDF)
              </a>
              <p className="text-xs text-primary-foreground/40 text-center mt-2">
                Approx. 4.2 MB · PDF Format
              </p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
            What's Inside the Brochure?
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            The RRDCH prospectus covers all the information a prospective student,
            parent, or partner organisation needs — from courses and fee structure to
            faculty, infrastructure, and campus life.
          </p>

          <div className="grid grid-cols-2 gap-5 mb-8">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="bg-card border border-border rounded-xl p-5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              For physical copies of the brochure, please visit the Admission Office at
              our Kumbalgodu campus or contact us at{" "}
              <a href="tel:+918028437150" className="text-primary font-medium underline underline-offset-4">
                +91-80-2843 7150
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default BrochurePage;
