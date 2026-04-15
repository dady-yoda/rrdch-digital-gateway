import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import SpotlightCard from "@/components/SpotlightCard";
import { Image, Video, ExternalLink } from "lucide-react";

const categories = [
  {
    id: "photos",
    icon: Image,
    title: "Photo Gallery",
    description:
      "Browse through our extensive collection of photographs capturing campus life, clinical sessions, academic events, cultural programmes, sports activities, and more.",
    link: "https://www.rrdch.org/photo-gallery/",
    cta: "View Photo Gallery",
    highlights: [
      "Campus & Infrastructure",
      "Clinical Sessions",
      "Convocation & Events",
      "Cultural Programmes",
      "Sports & Recreation",
      "Community Outreach",
    ],
  },
  {
    id: "videos",
    icon: Video,
    title: "Video Gallery",
    description:
      "Watch official videos including the campus aerial view, college walkthrough, department showcases, annual day celebrations, and student testimonials.",
    link: "https://www.rrdch.org/video-gallery/",
    cta: "View Video Gallery",
    highlights: [
      "Campus Aerial View",
      "College Walkthrough",
      "Department Showcases",
      "Annual Day Celebrations",
      "Student Testimonials",
      "Accreditation Events",
    ],
  },
];

const GalleryPage = () => (
  <PageLayout>
    <PageHero
      title="Gallery"
      subtitle="Explore RRDCH through photos and videos — from campus life to clinical excellence"
      breadcrumbs={[{ label: "Gallery" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <FadeInSection>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Image className="w-4 h-4" />
            Photo &amp; Video Gallery
          </div>
          <p className="text-muted-foreground leading-relaxed">
            A visual journey through Rajarajeswari Dental College &amp; Hospital — our campus,
            our people, and our milestones.
          </p>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <FadeInSection key={cat.id} className="h-full">
            <SpotlightCard
              className="bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 p-8 h-full flex flex-col"
              spotlightColor="rgba(84, 107, 65, 0.18)"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 flex-shrink-0">
                <cat.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                {cat.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {cat.description}
              </p>

              {/* Highlights list */}
              <ul className="space-y-1.5 mb-6 flex-1">
                {cat.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={cat.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors self-start mt-auto"
              >
                {cat.cta}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </SpotlightCard>
          </FadeInSection>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default GalleryPage;
