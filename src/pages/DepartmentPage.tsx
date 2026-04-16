import { useParams, Navigate, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { departmentsData } from "@/data/departmentsData";
import { Activity, Shield, Scissors, Crosshair, Heart, PenTool as Tool, MoveDiagonal, Users, Microscope, Disc, BookOpen, ActivitySquare, CheckCircle2 } from "lucide-react";

const getIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Activity, Shield, Scissors, Crosshair, Heart, Tool, MoveDiagonal, Users, Microscope, Disc, BookOpen, ActivitySquare
  };
  const IconComponent = icons[iconName] || Activity;
  return <IconComponent className="w-10 h-10 text-primary" />;
};

const DepartmentPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id || !(id in departmentsData)) {
    return <Navigate to="/404" replace />;
  }

  const dept = departmentsData[id as keyof typeof departmentsData];

  return (
    <PageLayout>
      <PageHero
        title={dept.name}
        subtitle="Department Excellence at RRDCH"
        breadcrumbs={[{ label: "Departments", href: "#" }, { label: dept.name }]}
      />

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex flex-shrink-0 items-center justify-center">
                    {getIcon(dept.icon)}
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-2xl text-foreground">
                      Overview
                    </h2>
                    <div className="w-12 h-1 bg-secondary mt-2 rounded-full"></div>
                  </div>
                </div>
                
                {dept.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed text-lg mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                
                <div className="mt-8 pt-8 border-t border-border grid sm:grid-cols-2 gap-4">
                  {dept.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="font-medium text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar / Quick Menu */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-md">
                <h3 className="font-heading font-bold text-xl mb-4">Explore More</h3>
                <ul className="space-y-3 font-medium text-sm">
                  {Object.values(departmentsData).map((d) => (
                    <li key={d.id}>
                      <Link to={`/department/${d.id}`} className={`block hover:text-secondary hover:translate-x-1 transition-all ${d.id === id ? 'text-secondary' : 'text-primary-foreground/80'}`}>
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DepartmentPage;
