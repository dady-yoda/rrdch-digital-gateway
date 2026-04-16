import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, ShieldCheck, UserRound, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import logoWhite from "@/assets/RRDCH FULL WHITE.png";

const DEMO_ACCOUNTS = [
  {
    role: "patient" as const,
    label: "Patient",
    email: "patient@rrdch.org",
    description: "Book & manage your dental appointments",
    icon: UserRound,
    color: "#546B41",
  },
  {
    role: "doctor" as const,
    label: "Doctor",
    email: "doctor@rrdch.org",
    description: "View schedule & manage availability",
    icon: Stethoscope,
    color: "#99AD7A",
  },
  {
    role: "admin" as const,
    label: "Admin",
    email: "admin@rrdch.org",
    description: "Full hospital oversight & CRUD",
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

  // Already logged in → redirect
  if (user) return <Navigate to={roleHome} replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.success) {
      setError(result.error ?? "Login failed. Please try again.");
    } else {
      // navigate happens via the redirect above after user state updates
      // but we navigate proactively too
      const role = email.toLowerCase().startsWith("admin")
        ? "admin"
        : email.toLowerCase().startsWith("doctor")
        ? "doctor"
        : "patient";
      const dest =
        role === "admin"
          ? "/admin/management"
          : role === "doctor"
          ? "/doctor/schedule"
          : "/patient/booking";
      navigate(dest, { replace: true });
    }
  };

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("demo1234");
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ── Left branding panel ───────────────────────────── */}
      <div
        className="hidden md:flex flex-col justify-between w-[42%] xl:w-[38%] p-10 lg:p-14"
        style={{ backgroundColor: "#546B41" }}
      >
        <div>
          {/* Logo text */}
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

        {/* Role tiles */}
        <div className="space-y-3 mb-4">
          {DEMO_ACCOUNTS.map((acc) => {
            const Icon = acc.icon;
            return (
              <button
                key={acc.role}
                onClick={() => quickLogin(acc.email)}
                className="w-full text-left flex items-center gap-4 p-3.5 rounded-xl bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 transition-all group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${acc.color}cc` }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{acc.label}</p>
                  <p className="text-white/50 text-xs leading-tight">{acc.description}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0" />
              </button>
            );
          })}
          <p className="text-white/35 text-xs text-center pt-1">
            Click a role above to auto-fill demo credentials
          </p>
        </div>
      </div>

      {/* ── Right login panel ─────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-gray-50">
        {/* Mobile header */}
        <div className="md:hidden text-center mb-8">
          <Link to="/" className="inline-block hover:opacity-80 transition-opacity" title="Back to Homepage">
            <h1
              className="font-heading text-2xl font-extrabold"
              style={{ color: "#546B41" }}
            >
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
                Sign in to access your portal
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
                  className="h-11 border-gray-200 focus:border-blue-800 focus:ring-blue-800"
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
                    placeholder="Any password (demo mode)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10 border-gray-200 focus:border-blue-800 focus:ring-blue-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  Demo mode — any password is accepted
                </p>
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
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            {/* Mobile quick-login */}
            <div className="mt-6 md:hidden">
              <p className="text-xs text-gray-400 text-center mb-3">Quick access (demo)</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.role}
                    onClick={() => quickLogin(acc.email)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: acc.color }}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>RRDCH — Est. 2013</span>
              <Badge
                variant="outline"
                className="text-xs"
                style={{ borderColor: "#546B4122", color: "#546B41" }}
              >
                Demo Mode
              </Badge>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-400 max-w-xs">
          Role is automatically detected from your email prefix.
          Use <span className="font-mono bg-gray-100 px-1 rounded">admin@</span>,{" "}
          <span className="font-mono bg-gray-100 px-1 rounded">doctor@</span>, or{" "}
          <span className="font-mono bg-gray-100 px-1 rounded">patient@</span> to test each portal.
        </p>
      </div>
    </div>
  );
}
