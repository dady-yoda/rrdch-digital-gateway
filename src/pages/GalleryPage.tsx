import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import FadeInSection from "@/components/FadeInSection";
import SpotlightCard from "@/components/SpotlightCard";
import { Image, Video, ArrowLeft, Play, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DomeGallery from "@/components/DomeGallery/DomeGallery";

const categories = [
  {
    id: "photos",
    icon: Image,
    title: "Photo Gallery",
    description:
      "Browse through our extensive collection of photographs capturing campus life, clinical sessions, academic events, cultural programmes, sports activities, and more.",
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

const photoItems = [
  { id: 1, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2024/01/IMG-20240119-WA0073.jpg", title: "Graduation Ceremony 2023", category: "Events" },
  { id: 2, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/03/IMG-20210224-WA0029.jpg", title: "Clinical Discussion", category: "Clinical" },
  { id: 3, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2024/01/IMG-20240119-WA0054.jpg", title: "Certificate Distribution", category: "Events" },
  { id: 4, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/03/IMG-20210224-WA0030.jpg", title: "State-of-the-art Clinical Suite", category: "Clinical" },
  { id: 5, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2024/01/IMG-20240119-WA0056.jpg", title: "Academic Milestone", category: "Events" },
  { id: 6, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/03/IMG-20210224-WA0031.jpg", title: "Research Presentation", category: "Clinical" },
  { id: 7, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2024/01/IMG-20240119-WA0055.jpg", title: "Graduation Day Highlights", category: "Events" },
  { id: 8, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/03/IMG-20210224-WA0032.jpg", title: "Clinical Team Meet", category: "Clinical" },
  { id: 9, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2024/01/IMG-20240119-WA0057.jpg", title: "Cultural Celebration", category: "Events" },
  { id: 10, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2024/01/IMG-20240119-WA0071.jpg", title: "Faculty Convocation", category: "Events" },
  { id: 11, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/01/DSC_2824.jpg", title: "Annual Day Celebrations", category: "Campus Life" },
  { id: 12, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2021/01/DSC_2598.jpg", title: "Sports Meet Winners", category: "Sports" },
  { id: 13, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2020/01/DSC0636.jpg", title: "Community Health Camp", category: "Outreach" },
  { id: 14, src: "https://www.rrdch.org/rrdch/wp-content/uploads/2020/01/DSC_4045.jpg", title: "White Coat Ceremony", category: "Events" },
];

const videoItems = [
  { 
    id: 1, 
    src: "https://www.youtube.com/embed/RHipNov_9qE", 
    thumbnail: "https://img.youtube.com/vi/RHipNov_9qE/maxresdefault.jpg", 
    title: "Official RRDCH Corporate Video", 
    duration: "4:12" 
  },
  { 
    id: 2, 
    src: "https://www.youtube.com/embed/guH7wUQmmSY", 
    thumbnail: "https://img.youtube.com/vi/guH7wUQmmSY/maxresdefault.jpg", 
    title: "Campus Infrastructure Tour", 
    duration: "3:58" 
  },
  { 
    id: 3, 
    src: "https://www.youtube.com/embed/V1i5aMMdoI8", 
    thumbnail: "https://img.youtube.com/vi/V1i5aMMdoI8/maxresdefault.jpg", 
    title: "17th Graduation Day Highlights", 
    duration: "8:45" 
  },
  { 
    id: 4, 
    src: "https://www.youtube.com/embed/0nQDnnQ6-bk", 
    thumbnail: "https://img.youtube.com/vi/0nQDnnQ6-bk/maxresdefault.jpg", 
    title: "Student Experience & Testimonials", 
    duration: "5:20" 
  },
  { 
    id: 5, 
    src: "https://www.youtube.com/embed/4V4hn9KCFSY", 
    thumbnail: "https://img.youtube.com/vi/4V4hn9KCFSY/maxresdefault.jpg", 
    title: "Advanced Clinical Labs Walkthrough", 
    duration: "6:15" 
  },
  { 
    id: 6, 
    src: "https://www.youtube.com/embed/obJeFiz7Ps0", 
    thumbnail: "https://img.youtube.com/vi/obJeFiz7Ps0/maxresdefault.jpg", 
    title: "Cultural Gala Evening", 
    duration: "12:30" 
  },
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const renderCategoryGrid = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
    >
      {categories.map((cat) => (
        <FadeInSection key={cat.id} className="h-full">
          <SpotlightCard
            className="bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 p-8 h-full flex flex-col cursor-pointer"
            spotlightColor="rgba(84, 107, 65, 0.18)"
            onClick={() => setSelectedCategory(cat.id)}
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 flex-shrink-0">
              <cat.icon className="w-7 h-7 text-primary" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground mb-3">
              {cat.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {cat.description}
            </p>
            <ul className="space-y-1.5 mb-6 flex-1">
              {cat.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(cat.id);
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors self-start mt-auto"
            >
              {cat.cta}
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </SpotlightCard>
        </FadeInSection>
      ))}
    </motion.div>
  );

  const renderPhotoGallery = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-[#0A0A0C] flex flex-col overflow-hidden"
    >
      {/* Immersive Background Dome */}
      <div className="absolute inset-0 z-0">
        <DomeGallery 
          images={photoItems.map(item => ({ src: item.src, alt: item.title }))} 
          fit={0.8}
          segments={45}
          grayscale={false}
          openedImageWidth="600px"
          openedImageHeight="600px"
          overlayBlurColor="#0A0A0C"
          minRadius={800}
        />
      </div>

      {/* Overlaid UI - Top Bar */}
      <div className="relative z-10 p-6 md:p-10 flex items-center justify-between pointer-events-none">
        <motion.button 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => setSelectedCategory(null)}
          className="pointer-events-auto flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-white px-6 py-3 rounded-full border border-white/10 transition-all font-heading font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Categories
        </motion.button>

        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-right"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">
            Photo <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-white/60 text-sm font-medium mt-2">
            RRDCH Digital Archive
          </p>
        </motion.div>
      </div>
      
      {/* Bottom Center Instruction */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex items-center gap-3 shadow-2xl">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
            Drag to Rotate • Click to Inspect
          </span>
        </div>
      </motion.div>

      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#0A0A0C] to-transparent z-1 pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0A0A0C] to-transparent z-1 pointer-events-none opacity-60" />
    </motion.div>
  );

  const renderVideoGallery = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </button>
        <h2 className="text-2xl font-bold text-foreground">Video Gallery</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videoItems.map((video) => (
          <Dialog key={video.id}>
            <DialogTrigger asChild>
              <div className="group space-y-3 cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground px-1">{video.title}</h3>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none shadow-none aspect-video">
              <iframe
                src={`${video.src}?autoplay=1`}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </motion.div>
  );

  return (
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
              {selectedCategory === "videos" ? <Video className="w-4 h-4" /> : <Image className="w-4 h-4" />}
              {selectedCategory === "photos" ? "Photo Gallery" : selectedCategory === "videos" ? "Video Gallery" : "Photo & Video Gallery"}
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {selectedCategory 
                ? `Viewing our latest ${selectedCategory} collection. Click on items to expand.`
                : "A visual journey through Rajarajeswari Dental College & Hospital — our campus, our people, and our milestones."}
            </p>
          </div>
        </FadeInSection>

        <AnimatePresence mode="wait">
          {!selectedCategory && renderCategoryGrid()}
          {selectedCategory === "photos" && renderPhotoGallery()}
          {selectedCategory === "videos" && renderVideoGallery()}
        </AnimatePresence>
      </section>
    </PageLayout>
  );
};

export default GalleryPage;
