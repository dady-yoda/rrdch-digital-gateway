import FadeInSection from "./FadeInSection";
import { Calendar, Heart, BookOpen } from "lucide-react";

const newsItems = [
  { title: "Republic Day 2026 Celebrations", date: "Jan 26, 2026", category: "Events" },
  { title: "National Dentist Day — Free Dental Checkup Camp", date: "Mar 6, 2026", category: "Events" },
  { title: "CDE Programme on Advanced Endodontics", date: "Feb 15, 2026", category: "CDE" },
  { title: "Rural Dental Camp at Kumbalgodu", date: "Feb 20, 2026", category: "Outreach" },
  { title: "Nasha Mukt Bharat Abhiyaan Awareness Drive", date: "Mar 1, 2026", category: "Social" },
  { title: "Workshop on Digital Dentistry & CAD/CAM", date: "Mar 10, 2026", category: "CDE" },
];

const categoryColors: Record<string, string> = {
  Events: "bg-secondary/20 text-secondary-foreground",
  CDE: "bg-accent/40 text-accent-foreground",
  Outreach: "bg-primary/10 text-primary",
  Social: "bg-muted text-muted-foreground",
};

const UpdatesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary text-center mb-10">
            News & Updates
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, i) => (
            <FadeInSection key={i}>
              <div className="bg-card rounded-lg p-5 border border-border hover:shadow-md transition-shadow group cursor-pointer">
                <span className={`text-xs px-2 py-1 rounded font-medium ${categoryColors[item.category]}`}>
                  {item.category}
                </span>
                <h3 className="font-heading font-semibold text-primary mt-3 mb-2 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Social Commitment */}
        <FadeInSection>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border flex gap-4 items-start">
              <Heart className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-semibold text-primary mb-2">Rural Dental Camps</h3>
                <p className="text-sm text-muted-foreground">
                  Regular dental health camps in rural areas providing free dental care and awareness.
                </p>
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border flex gap-4 items-start">
              <BookOpen className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-semibold text-primary mb-2">CDE Programmes</h3>
                <p className="text-sm text-muted-foreground">
                  Continuing Dental Education workshops keeping practitioners updated with latest techniques.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default UpdatesSection;
