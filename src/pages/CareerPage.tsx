import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Briefcase, MapPin, Clock, ExternalLink, Mail, Download } from "lucide-react";

const openings = [
  {
    title: "Senior Lecturer — Orthodontics",
    dept: "Orthodontics",
    type: "Full-Time",
    location: "Bengaluru",
    exp: "3+ years",
    desc: "We are looking for an experienced dentist with an MDS in Orthodontics to join our faculty team.",
  },
  {
    title: "Senior Lecturer — Periodontics",
    dept: "Periodontics",
    type: "Full-Time",
    location: "Bengaluru",
    exp: "3+ years",
    desc: "Seeking a motivated MDS (Periodontics) graduate for teaching and clinical responsibilities.",
  },
  {
    title: "Tutor / Demonstrator — Conservative Dentistry",
    dept: "Conservative Dentistry",
    type: "Full-Time",
    location: "Bengaluru",
    exp: "0–2 years",
    desc: "Entry-level academic position for BDS graduates with interest in teaching and research.",
  },
  {
    title: "Staff Nurse",
    dept: "Hospital Administration",
    type: "Full-Time",
    location: "Bengaluru",
    exp: "1+ year",
    desc: "Qualified nursing staff required for dental hospital operations and patient care management.",
  },
  {
    title: "Lab Technician — Dental Materials",
    dept: "Prosthodontics",
    type: "Full-Time",
    location: "Bengaluru",
    exp: "2+ years",
    desc: "Experienced dental lab technician for prosthetics lab work and student training support.",
  },
];

const CareerPage = () => (
  <PageLayout>
    <PageHero
      title="Career Opportunities"
      subtitle="Join the RRDCH family — we are always looking for passionate educators, clinicians, and support staff"
      breadcrumbs={[{ label: "Career" }]}
    />

    <section className="container mx-auto px-4 py-14">
      {/* Intro */}
      <div className="grid lg:grid-cols-3 gap-8 mb-14">
        <div className="lg:col-span-2">
          <h2 className="font-heading font-bold text-xl text-foreground mb-4">
            Why Work at RRDCH?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Rajarajeswari Dental College & Hospital is one of Karnataka's leading
            dental institutions, offering a vibrant academic environment, world-class
            infrastructure, and a culture of research and compassionate care. We invest
            in the growth of our people and welcome talent from across the country.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Competitive remuneration as per DCI/RGUHS norms",
              "Access to state-of-the-art dental clinical facilities",
              "Encouragement and support for research & publications",
              "Conference and CPD/CME sponsorship",
              "Collaborative, inclusive campus culture",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <h3 className="font-heading font-semibold text-primary text-lg mb-2">
            How to Apply
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Send your updated CV along with a cover letter mentioning the position
            applied for to our HR department.
          </p>
          <a
            href="mailto:principalrrdch@gmail.com"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-3"
          >
            <Mail className="w-4 h-4" /> principalrrdch@gmail.com
          </a>
          <a
            href="https://www.rrdch.org/career/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-3"
          >
            <ExternalLink className="w-4 h-4" /> View on old site
          </a>
          <button className="mt-2 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-lg hover:bg-primary/90 transition">
            <Download className="w-4 h-4" /> Download Application Form
          </button>
        </div>
      </div>

      {/* Openings */}
      <h2 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-primary" /> Current Openings
      </h2>
      <div className="space-y-4">
        {openings.map((job, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-heading font-bold text-base text-foreground mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{job.desc}</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" /> {job.type}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Briefcase className="w-3 h-3" /> {job.exp} experience
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    {job.dept}
                  </span>
                </div>
              </div>
              <a
                href="mailto:principalrrdch@gmail.com"
                className="flex-shrink-0 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default CareerPage;
