import FadeInSection from "./FadeInSection";
import { GraduationCap, BookOpen, FlaskConical, Stethoscope } from "lucide-react";

const courses = [
  {
    icon: GraduationCap,
    title: "BDS",
    desc: "Bachelor of Dental Surgery — A comprehensive 5-year programme covering all aspects of dental science with extensive clinical training.",
  },
  {
    icon: BookOpen,
    title: "MDS",
    desc: "Master of Dental Surgery — Specialise in 9 disciplines with access to advanced research facilities and expert faculty.",
  },
  {
    icon: FlaskConical,
    title: "Ph.D",
    desc: "Doctoral research programme fostering innovation in dental sciences with interdisciplinary collaboration.",
  },
];

const AcademicsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary text-center mb-10">
            Academic Programmes
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {courses.map((course) => (
            <FadeInSection key={course.title}>
              <div className="bg-popover rounded-lg p-6 border border-border hover:shadow-lg transition-shadow text-center group">
                <course.icon className="w-12 h-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading text-lg font-bold text-primary mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{course.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Special Courses Banner */}
        <FadeInSection>
          <div className="bg-primary rounded-lg p-8 text-center">
            <Stethoscope className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-primary-foreground mb-2">
              Special Programmes
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              One Year Certificate Course in Implantology (RGUHS Recognised) &bull; MFDS RCPS (Glasgow) Revision Course
            </p>
            <a
              href="#"
              className="inline-block bg-accent text-accent-foreground font-heading font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity"
            >
              Applications are Invited
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default AcademicsSection;
