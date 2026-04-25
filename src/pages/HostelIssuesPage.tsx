import { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { 
  Building, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  Ticket,
  Clock,
  MessageSquare,
  FileText
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HostelIssuesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [resolutionTime, setResolutionTime] = useState("");
  
  // form state
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [prefResTime, setPrefResTime] = useState("Within 24 hrs");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    if (!isSubmitted) {
      const ctx = gsap.context(() => {
        gsap.from(".form-section", {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out"
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isSubmitted]);

  const handleCategoryChange = (cat: string) => {
    setCategoryError(false);
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategories.length === 0) {
      setCategoryError(true);
      return;
    }
    setTicketId(`TKT-${Math.floor(100000 + Math.random() * 900000)}`);
    setResolutionTime(prefResTime);
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <PageLayout>
      <div ref={containerRef} className="bg-background min-h-screen pb-20">
        <PageHero
          title="Hostel Issues Application"
          subtitle="Report your hostel-related issues quickly and track their resolution status."
          breadcrumbs={[
            { label: "Committees", href: "/committee" },
            { label: "Hostel Issues" }
          ]}
        />

        <section className="container mx-auto px-4 -mt-10 relative z-10">
          {!isSubmitted ? (
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Anonymous Toggle */}
                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10 form-section">
                  <div>
                    <h3 className="font-heading font-bold text-lg">Anonymous Submission?</h3>
                    <p className="text-sm text-muted-foreground">Your personal details will be hidden from the authorities.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} />
                    <div className="w-14 h-7 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Student Details */}
                {!isAnonymous && (
                  <div className="form-section">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <User className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-heading font-black">Student Details</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Name *</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Student ID / Roll Number *</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. RRDCH-2023-045" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Department & Year *</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. BDS 2nd Year" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Contact Number *</label>
                        <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="+91" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-foreground">Email ID *</label>
                        <input required type="email" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="your.email@example.com" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Hostel Details */}
                <div className="form-section pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Building className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-heading font-black">Hostel Details</h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Hostel Name *</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. Boys Hostel A" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Room Number *</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. 204" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Floor Number *</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="e.g. 2nd Floor" />
                    </div>
                  </div>
                </div>

                {/* Complaint Details */}
                <div className="form-section pt-6 border-t border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-heading font-black">Complaint Details</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground">Complaint Category * (Select at least one)</label>
                      <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${categoryError ? 'p-3 border border-red-500/50 rounded-xl bg-red-500/5' : ''}`}>
                        {["Maintenance", "Cleanliness & Hygiene", "Food / Mess", "Security", "Noise / Roommate Issue", "Internet / Wi-Fi", "Water / Electricity", "Other"].map((cat) => (
                          <label key={cat} className={`flex items-center gap-3 p-3 rounded-xl border border-border bg-background hover:border-primary/50 cursor-pointer transition-all ${selectedCategories.includes(cat) ? 'border-primary bg-primary/5' : ''}`}>
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 text-primary rounded border-border focus:ring-primary" 
                              checked={selectedCategories.includes(cat)}
                              onChange={() => handleCategoryChange(cat)}
                            />
                            <span className="text-sm font-medium">{cat}</span>
                          </label>
                        ))}
                      </div>
                      {categoryError && (
                        <p className="text-sm text-red-500 font-bold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> Please select at least one complaint category.
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Complaint Title *</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Short heading for the issue" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground">Complaint Description *</label>
                      <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Please describe the issue in detail..."></textarea>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Date & Time of Incident *</label>
                        <input required type="datetime-local" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Attachment (Proof) - Optional</label>
                        <input type="file" accept="image/*,video/*" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prioritization */}
                <div className="form-section pt-6 border-t border-border">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground">Priority Level</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground">Preferred Resolution Time</label>
                      <select 
                        value={prefResTime}
                        onChange={(e) => setPrefResTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                      >
                        <option value="Within 24 hrs">Within 24 hrs</option>
                        <option value="3 days">3 days</option>
                        <option value="1 week">1 week</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border flex justify-end">
                  <button type="submit" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-heading font-black text-lg hover:shadow-lg hover:-translate-y-1 transition-all">
                    Submit Complaint
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border border-border rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-primary"></div>
                
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                
                <h2 className="text-3xl font-heading font-black mb-2">Complaint Submitted Successfully!</h2>
                <p className="text-muted-foreground mb-8">We have successfully received your complaint. Our team will look into it shortly.</p>
                
                <div className="bg-muted/50 rounded-2xl p-6 text-left space-y-6 mb-8">
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Unique Ticket ID</div>
                      <div className="text-xl font-heading font-black text-primary">{ticketId}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Current Status</div>
                      <div className="inline-flex px-3 py-1 bg-orange-100 text-orange-700 text-xs font-black uppercase tracking-wider rounded-full">
                        Pending
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Estimated Resolution Time</div>
                      <div className="text-sm font-bold">{resolutionTime}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/80 transition-all w-full sm:w-auto justify-center">
                    <MessageSquare className="w-4 h-4" /> Add Comments / Follow Up
                  </button>
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setTicketId("");
                    }}
                    className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-all w-full sm:w-auto justify-center"
                  >
                    File Another Issue
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
};

export default HostelIssuesPage;
