import chairmanImg from "@/assets/chairman.jpg";
import FadeInSection from "./FadeInSection";
import { Building2, Users } from "lucide-react";

const LeadershipSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Chairman's Message */}
        <FadeInSection>
          <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
            <div className="md:w-1/3 flex-shrink-0">
              <img
                src={chairmanImg}
                alt="Dr. A.C. Shanmugam, Chairman"
                className="rounded-lg shadow-lg w-full max-w-[300px] mx-auto border-4 border-accent"
                loading="lazy"
                width={512}
                height={640}
              />
              <p className="text-center mt-3 font-heading font-semibold text-primary text-sm">
                Dr. A.C. Shanmugam
              </p>
              <p className="text-center text-xs text-muted-foreground">Founder Chairman</p>
            </div>
            <div className="md:w-2/3">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">
                Chairman's Message
              </h2>
              <blockquote className="border-l-4 border-accent pl-6 text-muted-foreground leading-relaxed italic">
                "Our vision is to create an institution of excellence that produces skilled dental professionals
                who serve society with compassion and competence. Rajarajeswari Dental College & Hospital has
                been at the forefront of dental education and research, nurturing talent and fostering innovation
                since its inception. We are committed to providing world-class infrastructure, experienced faculty,
                and a learning environment that inspires students to achieve their fullest potential."
              </blockquote>
            </div>
          </div>
        </FadeInSection>

        {/* College & Hospital Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <FadeInSection>
            <div className="bg-card rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <Building2 className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-primary mb-3">The College</h3>
              <p className="text-muted-foreground leading-relaxed">
                Spread across a lush 5-acre campus, RRDCH offers state-of-the-art facilities including
                modern lecture halls, advanced simulation labs, a well-stocked library with over 10,000 volumes,
                and dedicated research centers. Our BDS, MDS, and Ph.D programmes are designed to produce
                dental professionals of the highest caliber.
              </p>
            </div>
          </FadeInSection>
          <FadeInSection>
            <div className="bg-card rounded-lg p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold text-primary mb-3">The Hospital</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our 200-chair dental hospital caters to over 500 patients daily, providing students with
                unparalleled clinical exposure. With 9 specialised departments, advanced diagnostic equipment,
                and a dedicated implant center, the hospital ensures students gain hands-on experience with
                real-world dental care from their very first year.
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
