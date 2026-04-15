import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { FileDown, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

const refundRules = [
  { situation: "Cancellation before commencement of course", refund: "100% refund after deducting ₹1,000 as processing fee" },
  { situation: "Cancellation within 15 days of course commencement", refund: "80% refund of fees paid" },
  { situation: "Cancellation between 16–30 days", refund: "50% refund of fees paid" },
  { situation: "Cancellation after 30 days of commencement", refund: "No refund" },
  { situation: "Cancellation due to medical reasons (with documentation)", refund: "Case-by-case basis — maximum 80% refund" },
];

const FeeTermsPage = () => (
  <PageLayout>
    <PageHero
      title="Online Fee Payment — Cancellation & Refund Policy"
      subtitle="Terms and conditions governing online fee payments, cancellations, and refunds at RRDCH"
      breadcrumbs={[{ label: "Fee Terms" }]}
    />

    <section className="container mx-auto px-4 py-14">

      {/* Important Notice */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/40 rounded-xl p-5 flex items-start gap-4 mb-12">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-heading font-semibold text-amber-800 dark:text-amber-300 text-sm mb-1">
            Please Read Before Making a Payment
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-400/80">
            By proceeding with the online fee payment, you agree to the cancellation and
            refund policy outlined below. All payments are processed through a secure
            payment gateway. RRDCH does not store any card or banking credentials.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mb-14">
        <div className="lg:col-span-2 space-y-8">
          {/* Payment Terms */}
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Payment Terms
            </h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                "All fees must be paid in Indian Rupees (INR) through the official ERP portal.",
                "Payments can be made via Net Banking, UPI, or Debit/Credit Cards.",
                "Transaction charges, if any, will be borne by the payer.",
                "A payment receipt will be generated upon successful transaction — keep it for your records.",
                "Failed transactions will be auto-refunded within 5–7 working days by the bank.",
                "Students must update their fee payment receipt in the ERP portal.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Refund Table */}
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground mb-5 flex items-center gap-2">
              <FileDown className="w-5 h-5 text-primary" /> Cancellation & Refund Schedule
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="text-left px-5 py-3 font-heading font-semibold">Situation</th>
                    <th className="text-left px-5 py-3 font-heading font-semibold">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {refundRules.map((r, i) => (
                    <tr
                      key={i}
                      className={`border-t border-border ${i % 2 !== 0 ? "bg-muted/30" : ""}`}
                    >
                      <td className="px-5 py-3 font-medium text-foreground">{r.situation}</td>
                      <td className="px-5 py-3 text-muted-foreground">{r.refund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="font-heading font-semibold text-primary text-lg mb-3">
              Official Policy Document
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              The complete and legally binding policy document is available for download.
            </p>
            <a
              href="https://www.rrdch.org/rrdch/wp-content/uploads/2022/07/RRDCH_Online-Payment_Cancellation-Refund-Policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition w-full justify-center"
            >
              <FileDown className="w-4 h-4" /> Download PDF
            </a>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading font-semibold text-foreground text-base mb-2">
              Contact for Refund Queries
            </h3>
            <p className="text-sm text-muted-foreground mb-1">
              Finance & Accounts Office
            </p>
            <a href="tel:+918028437150" className="flex items-center gap-2 text-sm text-primary hover:underline">
              +91-80-2843 7150
            </a>
            <a href="mailto:principalrrdch@gmail.com" className="flex items-center gap-2 text-sm text-primary hover:underline mt-1">
              principalrrdch@gmail.com
            </a>
          </div>

          <a
            href="https://rrdch.eduwizerp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-primary text-primary font-heading font-semibold py-2.5 rounded-xl hover:bg-primary hover:text-primary-foreground transition w-full text-sm"
          >
            <ExternalLink className="w-4 h-4" /> Pay Fees Online (ERP)
          </a>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default FeeTermsPage;
