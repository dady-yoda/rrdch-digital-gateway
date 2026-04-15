import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { Users, ChevronRight, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const committees = [
  {
    name: "Anti-Ragging Committee",
    description:
      "Statutory committee mandated by the UGC to prevent, prohibit and punish ragging in and around the campus. Handles complaints and promotes a safe environment for all students.",
    href: "/committee/anti-ragging",
    internal: true,
    highlight: true,
    icon: ShieldAlert,
  },
  {
    name: "Internal Complaints Committee (ICC)",
    description:
      "Constituted under the Sexual Harassment of Women at Workplace Act, 2013 to redress complaints related to sexual harassment.",
    href: "#",
    internal: true,
    highlight: false,
    icon: Users,
  },
  {
    name: "Student Grievance Redressal Committee",
    description:
      "Addresses academic and non-academic grievances of students and ensures swift, fair resolution in accordance with institutional norms.",
    href: "#",
    internal: true,
    highlight: false,
    icon: Users,
  },
  {
    name: "Ethics Committee",
    description:
      "Oversees ethical practices in research, clinical settings, and academics, ensuring compliance with national and international standards.",
    href: "#",
    internal: true,
    highlight: false,
    icon: Users,
  },
  {
    name: "Examination Committee",
    description:
      "Manages scheduling, conduct, and evaluation of all university and internal examinations with integrity and transparency.",
    href: "#",
    internal: true,
    highlight: false,
    icon: Users,
  },
  {
    name: "Cultural Committee",
    description:
      "Organises cultural and extracurricular activities to foster student talent, teamwork, and community engagement.",
    href: "#",
    internal: true,
    highlight: false,
    icon: Users,
  },
];

const CommitteePage = () => (
  <PageLayout>
    <PageHero
      title="Committees"
      subtitle="RRDCH constitutes statutory and welfare committees to uphold a safe, fair, and supportive campus environment"
      breadcrumbs={[{ label: "Committee" }]}
    />

    <section className="container mx-auto px-4 py-14">
      <div className="max-w-2xl mb-10">
        <p className="text-muted-foreground leading-relaxed">
          In compliance with regulatory mandates and institutional values, RRDCH has
          established various committees comprising faculty members, students, and
          external representatives. These committees ensure the well-being, rights,
          and academic progression of all members of the college community.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {committees.map((c) => {
          const Icon = c.icon;
          const CardContent = (
            <div
              className={`bg-card border rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full ${
                c.highlight
                  ? "border-primary/40 ring-1 ring-primary/20"
                  : "border-border"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    c.highlight ? "bg-primary" : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${c.highlight ? "text-primary-foreground" : "text-primary"}`}
                  />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground leading-snug">
                  {c.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {c.description}
              </p>
              {c.internal && c.href !== "#" && (
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  View Details <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );

          return c.href !== "#" && c.internal ? (
            <Link key={c.name} to={c.href} className="block">
              {CardContent}
            </Link>
          ) : (
            <div key={c.name}>{CardContent}</div>
          );
        })}
      </div>
    </section>
  </PageLayout>
);

export default CommitteePage;
