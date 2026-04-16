import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { BookOpen, ExternalLink, Calendar, GraduationCap } from "lucide-react";

const MfdsCoursePage = () => {
  return (
    <PageLayout>
      <PageHero
        title="MFDS RCPS (Glasgow)"
        subtitle="Part 1 & 2 Revision Course & Examination"
        breadcrumbs={[{ label: "Academics", href: "/#academics" }, { label: "MFDS RCPS" }]}
      />

      <section className="container mx-auto px-4 py-14">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Course Details & Apply Column */}
            <div className="flex flex-col space-y-8">
              {/* Course Details Block */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm flex-1">
                <h2 className="font-heading font-bold text-2xl text-primary mb-6 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" /> Course Overview
                </h2>
                <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
                  <p>
                    RRDCH is glad to inform you that students with <span className="font-bold text-foreground">BDS/MDS</span> can now validate their degrees internationally by passing the <span className="font-bold text-foreground">MFDS RCPS (Glasgow)</span> examination.
                  </p>
                  
                  <div className="grid sm:grid-cols-1 gap-4 mt-8">
                    <div className="flex items-start gap-3 bg-muted/40 p-5 rounded-xl border border-border/50">
                      <Calendar className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">Course Schedule</h3>
                        <p className="text-sm mt-1">Pre-course revision sessions and examinations.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-muted/40 p-5 rounded-xl border border-border/50">
                      <GraduationCap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">Eligibility</h3>
                        <p className="text-sm mt-1">Open to BDS and MDS Graduates seeking international validation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Block */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center shadow-sm">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                  Apply for Admission
                </h2>
                <p className="text-muted-foreground mx-auto max-w-sm mb-6 text-sm">
                  The application form will be provided at the College during admission. Ensure you meet the eligibility criteria. For online applications, please visit the official KEA portal.
                </p>
                <a
                  href="https://cetonline.karnataka.gov.in/kea/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition shadow-md hover:shadow-lg text-base"
                >
                  Apply Now (KEA Portal) <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Course Brochure Column */}
            <div className="flex flex-col h-full">
              <h2 className="font-heading font-bold text-xl text-primary mb-4 shrink-0 px-2 flex items-center gap-2">
                Course Brochure
              </h2>
              <div className="bg-background rounded-2xl p-2 border border-border shadow-sm ring-4 ring-offset-2 ring-primary/20 overflow-hidden h-full flex items-center justify-center transition-all hover:ring-primary/40">
                <img 
                  src="http://www.rrdch.org/rrdch/wp-content/uploads/2016/03/Pamphlet.jpg" 
                  alt="MFDS RCPS Course Brochure" 
                  className="w-full h-auto object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </PageLayout>
  );
};

export default MfdsCoursePage;
