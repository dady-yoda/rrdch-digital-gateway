import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { ROLE_HOME } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, ShieldCheck, UserRound, ArrowRight, Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import logoWhite from "@/assets/RRDCH FULL WHITE.png";

const PORTAL_INFO = [
  {
    role: "patient" as const,
    label: "Patient Portal",
    description: "Book & manage your dental appointments",
    icon: UserRound,
    color: "#546B41",
  },
  {
    role: "doctor" as const,
    label: "Doctor Portal",
    description: "View schedule & manage availability",
    icon: Stethoscope,
    color: "#99AD7A",
  },
  {
    role: "admin" as const,
    label: "Admin Portal",
    description: "Full hospital oversight & management",
    icon: ShieldCheck,
    color: "#DCCCAC",
  },
];

export default function LoginPage() {
  const { user, login, isLoading, roleHome } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Already logged in → redirect to role home
  if (user) return <Navigate to={roleHome} replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const result = await login(email.trim(), password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error ?? "Login failed. Please check your credentials.");
    } else {
      // useAuth already updated `user` via onAuthStateChange;
      // navigate based on role returned from the context (via ROLE_HOME).
      // We read roleHome from the hook — but since state update is async,
      // we re-derive from the user's role set inside login().
      // The <Navigate> guard above will fire on next render automatically,
      // but we also push proactively here for instant UX.
      navigate(roleHome !== "/login" ? roleHome : ROLE_HOME["patient"], { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Left branding panel ───────────────────────────── */}
      <div
        className="hidden md:flex flex-col justify-between w-[42%] xl:w-[38%] p-10 lg:p-14"
        style={{ backgroundColor: "#546B41" }}
      >
        <div>
          <div className="mb-10">
            <Link to="/" className="inline-block hover:opacity-80 transition-opacity" title="Back to Homepage">
              <img src={logoWhite} alt="RRDCH Logo" className="h-[72px] sm:h-[84px] w-auto object-contain drop-shadow-md mb-2" />
            </Link>
          </div>

          <h2 className="font-heading text-white text-2xl xl:text-3xl font-bold leading-tight mb-3">
            Patient Services
            <br />
            <span style={{ color: "#DCCCAC" }}>Online Portal</span>
          </h2>
          <p className="text-white/65 text-sm leading-relaxed max-w-xs">
            Book and manage your dental appointments seamlessly, and access world-class oral healthcare with ease.
          </p>
        </div>

        {/* Portal tiles — informational only */}
        <div className="space-y-3 mb-4">
          {PORTAL_INFO.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.role}
                className="w-full text-left flex items-center gap-4 p-3.5 rounded-xl bg-white/8 border border-white/10"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${p.color}cc` }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{p.label}</p>
                  <p className="text-white/50 text-xs leading-tight">{p.description}</p>
                </div>
              </div>
            );
          })}
          <p className="text-white/35 text-xs text-center pt-1">
            Sign in with your registered credentials
          </p>
        </div>
      </div>

      {/* ── Right login panel ─────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-gray-50">
        {/* Mobile header */}
        <div className="md:hidden text-center mb-8">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity" title="Back to Homepage">
            <h1 className="font-heading text-2xl font-extrabold" style={{ color: "#546B41" }}>
              RRDCH Portal
            </h1>
          </Link>
          <p className="text-gray-500 text-sm mt-1">Dental Management System</p>
        </div>

        <Card className="w-full max-w-md shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
          <div className="h-1.5 w-full" style={{ backgroundColor: "#DCCCAC" }} />
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-xl text-gray-900">Welcome back</h2>
              <p className="text-gray-500 text-sm mt-1">
                Sign in with your RRDCH account credentials
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@rrdch.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 border-gray-200 focus:border-green-700 focus:ring-green-700"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10 border-gray-200 focus:border-green-700 focus:ring-green-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              <div className="flex items-center justify-end mt-1">
                <Link to="/forgot-password" className="text-xs font-medium hover:underline" style={{ color: "#546B41" }}>
                  Forgot password?
                </Link>
              </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                id="login-submit"
                className="w-full h-11 font-semibold text-sm"
                disabled={submitting || isLoading}
                style={{ backgroundColor: "#546B41", color: "white" }}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-medium hover:underline" style={{ color: "#546B41" }}>
                    Sign up as a patient
                  </Link>
                </p>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>RRDCH — Est. 2013</span>
              <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#546B41" }}>
                <LockKeyhole className="w-3.5 h-3.5" />
                Secure Login
              </span>
            </div>
          </CardContent>
        </Card>

        <p className="mt-5 text-center text-xs text-gray-400 max-w-xs">
          Access is granted based on your registered role.
          Contact your administrator if you cannot sign in.
        </p>
      </div>
    </div>
  );
}
