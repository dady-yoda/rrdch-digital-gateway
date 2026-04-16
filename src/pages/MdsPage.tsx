import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { BookOpen, Calendar, GraduationCap, ClipboardCheck, Layers } from "lucide-react";

const MdsPage = () => {
  return (
    <PageLayout>
      <PageHero
        title="Master of Dental Surgery (MDS)"
        subtitle="Postgraduate Dental Degree"
        breadcrumbs={[{ label: "Courses", href: "#" }, { label: "MDS" }]}
      />

      <section className="container mx-auto px-4 py-14">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading font-bold text-2xl text-primary mb-8 flex items-center gap-3 border-b border-border pb-4">
              <BookOpen className="w-6 h-6" /> Course Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-secondary" /> Duration
                  </h3>
                  <p className="text-muted-foreground ml-7">3 Years</p>
                </div>
                
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-secondary" /> Eligibility
                  </h3>
                  <p className="text-muted-foreground ml-7">As per NEET Guidelines</p>
                </div>
              </div>

              <div className="space-y-6 flex flex-col justify-start">
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2 mb-2">
                    <ClipboardCheck className="w-5 h-5 text-secondary" /> Application Form
                  </h3>
                  <p className="text-muted-foreground ml-7 mb-2">
                    Application form will be provided at College during admission.
                  </p>
                  <a 
                    href="https://cetonline.karnataka.gov.in/kea/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-7 text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 underline underline-offset-2"
                  >
                    Link to KEA Website
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <h3 className="font-heading font-semibold text-xl text-foreground flex items-center gap-2 mb-6">
                <Layers className="w-6 h-6 text-primary" /> MDS - Course Description
              </h3>
              <div className="grid md:grid-cols-2 gap-3 text-muted-foreground ml-2">
                {[
                  "Oral Pathology & Microbiology",
                  "Public Health Dentistry",
                  "Orthodontics and Dento Facial Orthopedics",
                  "Conservative Dentistry and Endodontics",
                  "Pedodontics and Preventive Dentistry",
                  "Periodontology",
                  "Oral and Maxillofacial Surgery",
                  "Prosthetics & Crown and Bridge",
                  "Oral Medicine and Radiology",
                ].map((course, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
    </PageLayout>
  );
};

export default MdsPage;
