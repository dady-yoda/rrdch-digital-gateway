import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import logoWhite from "@/assets/RRDCH FULL WHITE.png";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Optional: Verify if there is a session or hash in the URL to allow updating
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Handle no session, maybe they didn't click the link or it expired
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
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
            <h2 className="font-heading font-bold text-xl text-gray-900">Set New Password</h2>
            <p className="text-gray-500 text-sm mt-2">
              Please enter your new password below.
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4 text-green-600">
                <CheckCircle2 className="w-16 h-16" />
              </div>
              <h3 className="font-bold text-lg">Password Updated!</h3>
              <p className="text-sm text-gray-600">Your password has been successfully reset.</p>
              <Button
                className="w-full mt-4 text-white"
                style={{ backgroundColor: "#546B41" }}
                onClick={() => navigate("/login")}
              >
                Sign In Now
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 font-semibold text-sm mt-2"
                disabled={submitting}
                style={{ backgroundColor: "#546B41", color: "white" }}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
