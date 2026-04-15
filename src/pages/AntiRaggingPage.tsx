import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { ShieldAlert, Phone, Mail, AlertTriangle, CheckCircle2, ExternalLink } from "lucide-react";

const members = [
  { name: "Dr. [Principal Name]", role: "Chairperson", designation: "Principal & HOD" },
  { name: "Dr. [Faculty Name]", role: "Convener", designation: "Senior Faculty Member" },
  { name: "Dr. [Faculty Name]", role: "Member", designation: "Faculty Representative" },
  { name: "Mr. / Ms. [Non-Teaching Staff]", role: "Member", designation: "Administrative Staff" },
  { name: "Student Representative", role: "Member", designation: "Senior Year BDS Student" },
  { name: "Parent Representative", role: "Member", designation: "Parent / Guardian" },
  { name: "NGO / Alumni Representative", role: "Member", designation: "Civil Society Representative" },
];

const measures = [
  "Zero-tolerance policy against ragging in any form",
  "24×7 helpline accessible to all students",
  "Confidential complaint mechanism with assured non-victimisation",
  "Sensitisation programmes at the start of every academic year",
  "Regular monitoring of hostels, canteen, and common areas",
  "Strict disciplinary action including expulsion for proven cases",
];

const AntiRaggingPage = () => (
  <PageLayout>
    <PageHero
      title="Anti-Ragging Committee"
      subtitle="RRDCH maintains a strict zero-tolerance policy against ragging in accordance with UGC regulations"
      breadcrumbs={[
        { label: "Committee", href: "/committee" },
        { label: "Anti-Ragging" },
      ]}
    />

    <section className="container mx-auto px-4 py-14">
      {/* Alert Banner */}
      <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 flex items-start gap-4 mb-12">
        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-heading font-bold text-destructive text-sm mb-1">
            Ragging is a Criminal Offence
          </p>
          <p className="text-sm text-muted-foreground">
            Any act of ragging is a punishable offence under UGC Regulations 2009 and
            the Karnataka Educational Institutions (Prevention of Ragging) Act. Offenders
            may face suspension, expulsion, and/or criminal prosecution.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-14">
        {/* Helplines */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-xl text-foreground">Helplines</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">UGC National Anti-Ragging Helpline</p>
                <a href="tel:1800-180-5522" className="font-heading font-bold text-lg text-primary hover:underline">
                  1800-180-5522
                </a>
                <p className="text-xs text-muted-foreground">Toll Free — 24×7</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">RRDCH Anti-Ragging Helpline</p>
                <a href="tel:+918028437150" className="font-heading font-bold text-lg text-primary hover:underline">
                  +91-80-2843 7150
                </a>
                <p className="text-xs text-muted-foreground">College Office</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-1">Email Complaints To</p>
                <a href="mailto:principalrrdch@gmail.com" className="font-heading font-semibold text-primary hover:underline text-sm">
                  principalrrdch@gmail.com
                </a>
              </div>
            </div>
            <a
              href="https://www.rrdch.org/anti-ragging/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-2"
            >
              <ExternalLink className="w-4 h-4" /> View full Anti-Ragging details
            </a>
          </div>
        </div>

        {/* Measures */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-xl text-foreground">
              Preventive Measures
            </h2>
          </div>
          <ul className="space-y-3">
            {measures.map((m) => (
              <li key={m} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Committee Members */}
      <div>
        <h2 className="font-heading font-bold text-xl text-foreground mb-6">
          Committee Members
        </h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-5 py-3 font-heading font-semibold">#</th>
                <th className="text-left px-5 py-3 font-heading font-semibold">Name</th>
                <th className="text-left px-5 py-3 font-heading font-semibold">Role</th>
                <th className="text-left px-5 py-3 font-heading font-semibold">Designation</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={i} className={`border-t border-border ${i % 2 !== 0 ? "bg-muted/30" : ""}`}>
                  <td className="px-5 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-5 py-3 font-medium text-foreground">{m.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{m.role}</td>
                  <td className="px-5 py-3 text-muted-foreground">{m.designation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default AntiRaggingPage;
