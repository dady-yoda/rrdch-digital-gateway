import FadeInSection from "./FadeInSection";
import SpotlightCard from "./SpotlightCard";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, FlaskConical, Stethoscope } from "lucide-react";

const courses = [
  {
    icon: GraduationCap,
    title: "BDS",
    desc: "Bachelor of Dental Surgery — A comprehensive 5-year programme covering all aspects of dental science with extensive clinical training.",
    link: "/course/bds",
  },
  {
    icon: BookOpen,
    title: "MDS",
    desc: "Master of Dental Surgery — Specialise in 9 disciplines with access to advanced research facilities and expert faculty.",
    link: "/course/mds",
  },
  {
    icon: FlaskConical,
    title: "Ph.D",
    desc: "Doctoral research programme fostering innovation in dental sciences with interdisciplinary collaboration.",
    link: "/course/phd",
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

        <div className="grid md:grid-cols-3 gap-6 mb-10 items-stretch">
          {courses.map((course) => (
            <FadeInSection key={course.title} className="h-full">
              <Link to={course.link} className="block h-full outline-none">
                <SpotlightCard className="bg-popover rounded-lg p-6 border border-border hover:shadow-lg transition-shadow text-center group h-full flex flex-col items-center justify-start cursor-pointer" spotlightColor="rgba(153, 173, 122, 0.2)">
                  <course.icon className="w-12 h-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-heading text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">{course.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{course.desc}</p>
                </SpotlightCard>
              </Link>
            </FadeInSection>
          ))}
        </div>

        {/* Special Courses Banner */}
        <FadeInSection>
          <div className="bg-primary rounded-lg p-8">
            <div className="text-center mb-8">
              <Stethoscope className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-primary-foreground">
                Special Programmes
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Program 1 */}
              <div className="bg-primary-foreground/10 rounded-lg p-6 text-center border border-primary-foreground/20 flex flex-col justify-between items-center transition-colors hover:bg-primary-foreground/20 shadow-sm">
                <p className="text-primary-foreground font-medium mb-6 leading-relaxed text-sm lg:text-base">
                  Applications are invited for One Year Implantology Course (Rajiv Gandhi University of Health Sciences Recognized)
                </p>
                <Link
                  to="/implantology-course"
                  className="inline-block bg-accent text-accent-foreground font-heading font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity mt-auto"
                >
                  Apply Now
                </Link>
              </div>

              {/* Program 2 */}
              <div className="bg-primary-foreground/10 rounded-lg p-6 text-center border border-primary-foreground/20 flex flex-col justify-between items-center transition-colors hover:bg-primary-foreground/20 shadow-sm">
                <p className="text-primary-foreground font-medium mb-6 leading-relaxed text-sm lg:text-base">
                  Applications are invited for MFDS RCPS (Glasgow) Part 1 & 2 Revision Course & Examination
                </p>
                <Link
                  to="/mfds-course"
                  className="inline-block bg-accent text-accent-foreground font-heading font-semibold px-6 py-2.5 rounded-md hover:opacity-90 transition-opacity mt-auto"
                >
                  Apply now
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default AcademicsSection;
