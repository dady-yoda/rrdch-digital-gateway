import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import logoWhite from "@/assets/RRDCH FULL WHITE.png";

export default function SignupPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect
  if (user) navigate("/", { replace: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // 1. Sign up the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Explicitly insert into profiles as 'patient'
        const { error: profileError } = await supabase.from('profiles').insert({
          id: authData.user.id,
          full_name: name,
          role: 'patient',
          phone: phone || null,
        });

        if (profileError) {
          console.error("Profile creation error:", profileError);
          // Normally we'd want a trigger to do this reliably, but per instructions we do it here
        }
        
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-gray-900">Account Created!</h2>
            <p className="text-gray-600 text-sm">
              Your patient account has been created successfully. You can now sign in to book appointments and view your vault.
            </p>
            <Button
              className="w-full mt-4 text-white"
              style={{ backgroundColor: "#546B41" }}
              onClick={() => navigate("/login")}
            >
              Proceed to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Left branding panel ── */}
      <div
        className="hidden md:flex flex-col justify-between w-[42%] xl:w-[38%] p-10 lg:p-14"
        style={{ backgroundColor: "#546B41" }}
      >
        <div>
          <div className="mb-10">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
              <img src={logoWhite} alt="RRDCH Logo" className="h-[72px] sm:h-[84px] w-auto object-contain drop-shadow-md mb-2" />
            </Link>
          </div>
          <h2 className="font-heading text-white text-2xl xl:text-3xl font-bold leading-tight mb-3">
            Join the RRDCH
            <br />
            <span style={{ color: "#DCCCAC" }}>Patient Network</span>
          </h2>
          <p className="text-white/65 text-sm leading-relaxed max-w-xs">
            Create a patient account to book appointments, manage your health records securely, and connect with our specialists.
          </p>
        </div>
        <div className="mt-auto">
          <p className="text-white/50 text-xs">For staff accounts, contact administration.</p>
        </div>
      </div>

      {/* ── Right signup panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-gray-50">
        <div className="md:hidden text-center mb-8">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
            <h1 className="font-heading text-2xl font-extrabold" style={{ color: "#546B41" }}>
              RRDCH Portal
            </h1>
          </Link>
        </div>

        <Card className="w-full max-w-md shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
          <div className="h-1.5 w-full" style={{ backgroundColor: "#DCCCAC" }} />
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-xl text-gray-900">Create Patient Account</h2>
              <p className="text-gray-500 text-sm mt-1">Register for secure portal access</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  required
                />
              </div>

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

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
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
                    <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign Up <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-medium hover:underline" style={{ color: "#546B41" }}>
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
