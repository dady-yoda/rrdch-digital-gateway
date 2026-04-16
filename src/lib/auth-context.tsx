import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ROLE_HOME, type Role } from "@/lib/config";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
  roleHome: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// ── Seeded mock users for demo quick-login ─────────────────
const SEEDED_USERS: Record<string, AuthUser> = {
  "admin@rrdch.org": {
    id: "u-admin-001",
    name: "Dr. Rajeshwari Nair",
    email: "admin@rrdch.org",
    role: "admin",
  },
  "doctor@rrdch.org": {
    id: "u-doc-001",
    name: "Dr. Anitha Rao",
    email: "doctor@rrdch.org",
    role: "doctor",
    department: "Orthodontics",
  },
  "patient@rrdch.org": {
    id: "u-pat-001",
    name: "Karthik Reddy",
    email: "patient@rrdch.org",
    role: "patient",
  },
};

function detectRole(email: string): Role {
  const lower = email.toLowerCase();
  if (lower.startsWith("admin")) return "admin";
  if (lower.startsWith("doctor") || lower.startsWith("dr.") || lower.startsWith("dr ")) return "doctor";
  return "patient";
}

function toDisplayName(email: string): string {
  return email
    .split("@")[0]
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const STORAGE_KEY = "rrdch_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    _password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 900)); // simulate latency

    if (!email.trim()) {
      setIsLoading(false);
      return { success: false, error: "Please enter your email address." };
    }

    const lower = email.toLowerCase().trim();
    const authUser: AuthUser = SEEDED_USERS[lower] ?? {
      id: `u-${Date.now()}`,
      name: toDisplayName(lower),
      email: lower,
      role: detectRole(lower),
    };

    setUser(authUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const roleHome = user ? ROLE_HOME[user.role] : "/login";

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, roleHome }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
