import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { useState } from "react";
import { MessageSquare, Send, Star, CheckCircle2 } from "lucide-react";

const departments = [
  "General",
  "Oral Medicine & Radiology",
  "Oral & Maxillofacial Surgery",
  "Orthodontics",
  "Prosthodontics",
  "Periodontics",
  "Conservative Dentistry",
  "Pedodontics",
  "Oral Pathology",
  "Public Health Dentistry",
  "Administration",
  "Library",
  "Hospital",
];

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageLayout>
        <PageHero
          title="Feedback"
          subtitle="We value your opinion to continuously improve our services"
          breadcrumbs={[{ label: "Feedback" }]}
        />
        <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-3">
            Thank You for Your Feedback!
          </h2>
          <p className="text-muted-foreground max-w-md mb-6">
            Your response has been recorded. We appreciate you taking the time to help
            us improve. RRDCH strives to continuously enhance the experience for
            students, patients, and staff.
          </p>
          <button
            onClick={() => { setSubmitted(false); setRating(0); }}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
          >
            Submit Another Response
          </button>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero
        title="Feedback"
        subtitle="Share your experience to help us serve you better"
        breadcrumbs={[{ label: "Feedback" }]}
      />

      <section className="container mx-auto px-4 py-14">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-2xl shadow-sm p-8 md:p-10">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-xl text-foreground">
                Share Your Feedback
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="fb-name">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="fb-name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="fb-email">
                    Email Address
                  </label>
                  <input
                    id="fb-email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="fb-dept">
                  Department / Area <span className="text-destructive">*</span>
                </label>
                <select
                  id="fb-dept"
                  required
                  className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Overall Rating <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-110"
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hover || rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-border"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-muted-foreground self-center">
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="fb-message">
                  Your Feedback <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="fb-message"
                  required
                  rows={5}
                  placeholder="Please share your experience, suggestions, or concerns..."
                  className="w-full bg-background border border-input rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-heading font-semibold py-3 rounded-lg hover:bg-primary/90 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FeedbackPage;
