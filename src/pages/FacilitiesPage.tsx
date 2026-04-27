import { useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import { 
  Library, 
  Utensils, 
  Dumbbell, 
  Bus, 
  Home, 
  BookOpen, 
  Users, 
  Trophy,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

import campusImg from "@/assets/hero-campus.jpg";
import hospitalImg from "@/assets/hospital.jpg";
import collegeImg from "@/assets/college-img.jpg";
import clinicalImg from "@/assets/hero-clinical.jpg";

const facilities = [
  {
    title: "Centrally Air-conditioned Auditorium",
    icon: Users,
    description: "A state-of-the-art, centrally air-conditioned auditorium with a seating capacity of 500, used for international and national conferences, cultural events, and seminars.",
    image: collegeImg,
    highlights: ["Hi-tech Audio-Visual system", "Acoustically designed", "Ideal for Guest Lectures"]
  },
  {
    title: "Digital Library & Information Center",
    icon: Library,
    description: "Equipped with over 10,000 books and numerous international journals, our library provides 24/7 digital access to e-resources through a high-speed campus network.",
    image: clinicalImg,
    highlights: ["E-Journal Subscriptions", "Separate PG Reading Area", "Digital Database"]
  },
  {
    title: "Modern Classrooms (Smart Labs)",
    icon: BookOpen,
    description: "Spacious classrooms equipped with modern teaching aids like LCD projectors and smart boards to facilitate an interactive learning environment.",
    image: campusImg,
    highlights: ["Projector-enabled", "Ergonomic Seating", "High-speed Wi-Fi"]
  },
  {
    title: "Separate Hostels for Boys & Girls",
    icon: Home,
    description: "Safe and comfortable residential facilities located within the campus, providing a home-away-from-home experience for outstation students.",
    image: hospitalImg,
    highlights: ["24/7 Security", "In-house Laundry", "Common Room with TV"]
  },
  {
    title: "Gymnasium & Fitness Center",
    icon: Dumbbell,
    description: "A well-equipped gymnasium with modern cardio and strength training equipment to ensure students maintain a healthy lifestyle.",
    image: clinicalImg,
    highlights: ["Qualified Trainers", "Yoga Classes", "Open till late"]
  },
  {
    title: "Sports & Recreation",
    icon: Trophy,
    description: "Extensive facilities for both indoor and outdoor sports including basketball, cricket, badminton, and table tennis.",
    image: collegeImg,
    highlights: ["Basketball Court", "Cricket Ground", "Indoor Game Room"]
  },
  {
    title: "Cafeteria & Mess",
    icon: Utensils,
    description: "Hygienic and spacious cafeteria serving a variety of nutritious multi-cuisine food to students, staff, and visitors.",
    image: campusImg,
    highlights: ["Hygienic Preparation", "Diverse Menu", "Affordable Prices"]
  },
  {
    title: "Transportation",
    icon: Bus,
    description: "A fleet of buses providing reliable transport services connecting the campus to all major parts of Bangalore city.",
    image: hospitalImg,
    highlights: ["GPS Tracked Buses", "Experienced Drivers", "Punctual Service"]
  }
];

const FacilitiesPage = () => {
  return (
    <PageLayout>
      <div className="bg-background min-h-screen pb-20">
        <PageHero
          title="World-Class Facilities"
          subtitle="An immersive 5-acre campus designed to foster academic excellence and student well-being."
          breadcrumbs={[{ label: "Facilities" }]}
        />

        <section className="container mx-auto px-4 py-24">
          <div className="grid gap-24">
            {facilities.map((facility, index) => (
              <FadeInSection 
                key={facility.title} 
                direction={index % 2 === 0 ? "left" : "right"}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2 relative group">
                  <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-border">
                    <img 
                      src={facility.image} 
                      alt={facility.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-primary p-6 rounded-2xl shadow-xl hidden md:block">
                    <facility.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary lg:hidden">
                      <facility.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-heading font-black text-foreground">{facility.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                    {facility.description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {facility.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="font-medium text-sm text-foreground/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <FadeInSection className="container mx-auto px-4 mt-20">
          <div className="bg-muted/30 rounded-[3rem] p-12 md:p-20 text-center border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-3xl font-heading font-black mb-6">Experience the Campus First-Hand</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Take a virtual 360° tour of our campus and facilities or visit us in person to see why RRDCH is the preferred choice for dental education.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.easytourz.com/BT-EmabedTour/all/2e6200684201ca03" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
              >
                Virtual 360° Tour <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="/#contact" 
                className="inline-flex items-center gap-2 bg-white border border-border text-foreground px-8 py-4 rounded-xl font-heading font-bold hover:bg-muted transition-colors"
              >
                Contact Admissions
              </a>
            </div>
          </div>
        </FadeInSection>
      </div>
    </PageLayout>
  );
};

export default FacilitiesPage;
