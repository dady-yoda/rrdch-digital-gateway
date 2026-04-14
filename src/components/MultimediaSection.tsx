import FadeInSection from "./FadeInSection";
import { Play, Award, Library, Dumbbell, Coffee } from "lucide-react";

const facilities = [
  { icon: Library, label: "Library" },
  { icon: Dumbbell, label: "Sports" },
  { icon: Coffee, label: "Cafeteria" },
];

const MultimediaSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Video */}
        <FadeInSection>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary text-center mb-8">
            Campus Experience
          </h2>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative aspect-video bg-foreground/10 rounded-lg overflow-hidden border border-border shadow-md">
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-2 opacity-70" />
                  <p className="text-sm text-muted-foreground">Official College Walkthrough</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Awards */}
        <FadeInSection>
          <div className="bg-primary rounded-lg p-8 mb-12 flex flex-col md:flex-row items-center gap-6">
            <Award className="w-16 h-16 text-accent flex-shrink-0" />
            <div>
              <h3 className="font-heading text-xl font-bold text-primary-foreground mb-2">
                Awards & Recognitions
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                NAAC 'A+' Accredited &bull; NABH Accredited Hospital &bull; ISO 9001:2015 Certified &bull;
                Recognised by Royal College of Physicians and Surgeons of Glasgow, UK &bull;
                IAO Member &bull; SLMC Recognised
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Facilities Grid */}
        <FadeInSection>
          <h3 className="font-heading text-xl font-bold text-primary text-center mb-6">
            Campus Facilities
          </h3>
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {facilities.map((f) => (
              <div
                key={f.label}
                className="bg-popover rounded-lg p-6 border-2 border-secondary/30 hover:border-secondary text-center group transition-all hover:shadow-lg cursor-pointer"
              >
                <f.icon className="w-10 h-10 text-secondary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-heading font-semibold text-sm text-primary">{f.label}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default MultimediaSection;
