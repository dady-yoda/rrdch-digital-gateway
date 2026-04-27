import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ROLE_HOME, type Role } from "@/lib/config";

// ─── Types ────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  roleHome: string;
}

// ─── Context ──────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount & listen to cross-tab auth changes
  useEffect(() => {
    const loadSession = () => {
      const stored = localStorage.getItem("rrdch_mock_auth");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    loadSession();

    // Listen for cross-tab auth changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "rrdch_mock_auth") {
        loadSession();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ── Login ──────────────────────────────────────────────
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock logic
    const lowerEmail = email.toLowerCase();
    let role: Role = "patient";
    let name = "John Doe";
    let department: string | undefined = undefined;
    let id = "mock-" + Date.now();

    if (lowerEmail.includes("admin")) {
      role = "admin";
      name = "System Admin";
      id = "admin-123";
    } else if (lowerEmail.includes("doctor") || lowerEmail.includes("dr")) {
      role = "doctor";
      name = "Dr. Smith";
      department = "Orthodontics";
      id = "doc-123";
    } else {
      role = "patient";
      name = lowerEmail.split("@")[0] || "Patient";
      id = "patient-demo-123";
    }

    const authUser: AuthUser = {
      id,
      email,
      name,
      role,
      department,
    };

    localStorage.setItem("rrdch_mock_auth", JSON.stringify(authUser));
    setUser(authUser);
    setIsLoading(false);
    
    return { success: true, user: authUser };
  };

  // ── Logout ─────────────────────────────────────────────
  const logout = async () => {
    localStorage.removeItem("rrdch_mock_auth");
    setUser(null);
  };

  const roleHome = user ? ROLE_HOME[user.role] : "/login";

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, roleHome }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
