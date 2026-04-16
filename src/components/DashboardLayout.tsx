import { useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  BookOpen,
  LogOut,
  Menu,
  X,
  Home,
  Stethoscope,
  ShieldCheck,
  UserRound,
  ClipboardList,
  Clock,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const ROLE_NAV: Record<string, NavItem[]> = {
  patient: [
    { label: "Book Appointment", href: "/patient/booking", icon: Calendar },
  ],
  doctor: [
    { label: "My Dashboard", href: "/doctor/schedule", icon: ClipboardList },
  ],
  admin: [
    { label: "Management Console", href: "/admin/management", icon: ShieldCheck },
  ],
};

const ROLE_LABELS: Record<string, string> = {
  patient: "Patient Portal",
  doctor: "Doctor Portal",
  admin: "Admin Console",
};

const ROLE_ICONS: Record<string, React.ElementType> = {
  patient: UserRound,
  doctor: Stethoscope,
  admin: ShieldCheck,
};

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const role = user?.role ?? "patient";
  const navItems = ROLE_NAV[role] ?? [];
  const RoleIcon = ROLE_ICONS[role];
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  const SidebarContent = () => (
    <div className="flex flex-col h-full select-none">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity" title="Back to Homepage">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <RoleIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm font-heading leading-tight">RRDCH</p>
            <p className="text-white/55 text-xs">{ROLE_LABELS[role]}</p>
          </div>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <Separator className="my-2 bg-white/10" />

        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-all text-sm"
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          Back to Website
        </Link>
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border-2 border-white/20 flex-shrink-0">
            <AvatarFallback
              className="text-sm font-bold"
              style={{ backgroundColor: "#99AD7A", color: "#fff" }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate leading-tight">{user?.name}</p>
            <p className="text-white/45 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="w-full text-white/60 hover:text-white hover:bg-white/10 justify-start gap-2 text-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 z-30"
        style={{ backgroundColor: "#546B41" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 z-50 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#546B41" }}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* Main area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-heading font-bold text-gray-800 text-base sm:text-lg leading-tight">
            {title}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Badge
              variant="outline"
              className="capitalize text-xs hidden sm:flex"
              style={{ borderColor: "#546B41", color: "#546B41" }}
            >
              {role}
            </Badge>
            {/* Mobile logout */}
            <button
              onClick={handleLogout}
              className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
