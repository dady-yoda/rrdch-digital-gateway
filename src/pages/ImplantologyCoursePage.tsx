import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useState } from "react";
import { CheckCircle2, Send, Phone, Mail, User, BookOpen, GraduationCap, MapPin, Calendar, ClipboardCheck } from "lucide-react";

const ImplantologyCoursePage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <PageHero
          title="Application Submitted"
          subtitle="One Year Implantology Course (RGUHS Recognized)"
          breadcrumbs={[{ label: "Implantology Course", href: "/implantology-course" }, { label: "Success" }]}
        />
        <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-3">
            Thank You for Applying!
          </h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Your application for the One Year Implantology Course has been successfully received. 
            Our admissions department will review your details and contact you shortly regarding the next steps.
          </p>
          <button
            onClick={() => { setSubmitted(false); }}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
          >
            Go Back
          </button>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero
        title="One Year Implantology Course"
        subtitle="Rajiv Gandhi University of Health Sciences Recognized"
        breadcrumbs={[{ label: "Academics", href: "/#academics" }, { label: "Implantology Course" }]}
      />

      <section className="container mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Course Details Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <h2 className="font-heading font-bold text-xl text-primary mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Course Details
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Applications are invited from <span className="font-bold text-foreground">BDS & MDS Graduates</span> for a one-year Certificate course in Implantology at Rajarajeswari Dental College & Hospital.
                </p>
                <div className="flex items-start gap-3 pt-2">
                  <Calendar className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>Course Starting: <span className="text-foreground font-medium">July 2026</span> (Tentative)</span>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>Recognized by: <span className="text-foreground font-medium">Rajiv Gandhi University of Health Sciences (RGUHS)</span></span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-heading font-bold text-sm text-foreground mb-4">Contact for Particulars:</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <div className="text-xs">
                      <p className="text-muted-foreground">Dean</p>
                      <p className="font-medium text-foreground">+91 99000 28022</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <div className="text-xs">
                      <p className="text-muted-foreground">Principal</p>
                      <p className="font-medium text-foreground">+91 99000 28018</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <div className="text-xs">
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">deanrrdch@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/40 rounded-2xl p-6 text-xs text-muted-foreground italic">
              * Applications are processed on a first-come, first-served basis subject to eligibility criteria and interview performance.
            </div>
          </div>

          {/* Application Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-2 mb-8 border-b border-border pb-4">
                <ClipboardCheck className="w-6 h-6 text-primary" />
                <h2 className="font-heading font-bold text-2xl text-foreground">
                  Online Application Form
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wider">
                      <User className="w-4 h-4" /> Personal Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-name">
                        Name of the Candidate <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="app-name"
                        type="text"
                        required
                        className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Sex <span className="text-destructive">*</span>
                        </label>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="sex" value="male" className="accent-primary" required />
                            <span className="text-sm">Male</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="sex" value="female" className="accent-primary" />
                            <span className="text-sm">Female</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-dob">
                          Date of Birth <span className="text-destructive">*</span>
                        </label>
                        <input id="app-dob" type="date" required className="w-full bg-background border border-input rounded-lg px-4 py-2 text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-age">
                          Age
                        </label>
                        <input id="app-age" type="number" className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-email">
                          Email <span className="text-destructive">*</span>
                        </label>
                        <input id="app-email" type="email" required className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-father">
                        Father's Name
                      </label>
                      <input
                        id="app-father"
                        type="text"
                        className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-phone">
                        Contact Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="app-phone"
                        type="tel"
                        required
                        className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                    </div>
                  </div>

                  {/* Academic Info & Address */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wider">
                      <GraduationCap className="w-4 h-4" /> Academic & Details
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-qualification">
                        Educational Qualification <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="app-qualification"
                        type="text"
                        required
                        placeholder="e.g. BDS, MDS"
                        className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-address">
                        Address for Correspondence <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="app-address"
                        required
                        rows={3}
                        className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="app-description">
                        Description
                      </label>
                      <textarea
                        id="app-description"
                        rows={4}
                        placeholder="Any additional details or questions..."
                        className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                      />
                    </div>
                  </div>
                </div>


                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-heading font-semibold py-4 rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <Send className="w-5 h-5" /> Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ImplantologyCoursePage;
