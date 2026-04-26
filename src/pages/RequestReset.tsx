import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import logoWhite from "@/assets/RRDCH FULL WHITE.png";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset link.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
        <div className="h-1.5 w-full" style={{ backgroundColor: "#DCCCAC" }} />
        <CardContent className="p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <Link to="/">
              <img src={logoWhite} alt="RRDCH Logo" className="h-16 mb-4 filter drop-shadow-md brightness-0" style={{ filter: 'brightness(0) sepia(1) hue-rotate(50deg) saturate(3) opacity(0.8)' }} />
            </Link>
            <h2 className="font-heading font-bold text-xl text-gray-900">Reset Password</h2>
            <p className="text-gray-500 text-sm mt-2">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-green-50 text-green-800 rounded-lg text-sm border border-green-200">
                A password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
              </div>
              <Link to="/login" className="inline-block">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 font-semibold text-sm"
                disabled={submitting}
                style={{ backgroundColor: "#546B41", color: "white" }}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending Link...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
              
              <div className="mt-4 text-center">
                <Link to="/login" className="text-sm font-medium hover:underline flex items-center justify-center text-gray-600">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
