import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
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
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
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

  /**
   * Build an AuthUser from a Supabase session user + profiles row.
   * Falls back gracefully if the profiles table has no matching row yet.
   */
  async function buildAuthUser(supabaseUser: { id: string; email?: string }): Promise<AuthUser | null> {
    let { data: profile, error } = await supabase
      .from("profiles")
      .select("full_name, role, department")
      .eq("id", supabaseUser.id)
      .single();

    if (error || !profile) {
      console.warn("[AuthContext] Profile missing, creating default profile.");
      // Auto-create profile if missing to prevent lockouts for existing accounts
      const isOwner = supabaseUser.email === "karthikpc039@gmail.com";
      const defaultRole = isOwner ? "admin" : "patient";
      
      const { data: newProfile, error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: supabaseUser.id,
          full_name: supabaseUser.email?.split('@')[0] || "User",
          role: defaultRole
        })
        .select("full_name, role, department")
        .single();
        
      if (insertError || !newProfile) {
         console.error("[AuthContext] Could not create fallback profile:", insertError?.message);
         (window as any)._lastProfileError = insertError?.message || error?.message || "Unknown error";
         return null;
      }
      profile = newProfile;
    }

    const role = (profile.role as Role) ?? "patient";

    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? "",
      name: profile.full_name ?? supabaseUser.email ?? "User",
      role,
      department: profile.department ?? undefined,
    };
  }

  // ── Restore session on mount ───────────────────────────
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        const authUser = await buildAuthUser(session.user);
        if (mounted) setUser(authUser);
      }
      if (mounted) setIsLoading(false);
    });

    // Keep in sync with Supabase auth state changes (tab focus, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        if (session?.user) {
          const authUser = await buildAuthUser(session.user);
          setUser(authUser);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ── Login ──────────────────────────────────────────────
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      setIsLoading(false);
      return {
        success: false,
        error: error?.message ?? "Login failed. Please check your credentials.",
      };
    }

    const authUser = await buildAuthUser(data.user);

    if (!authUser) {
      // We store the last build error on the window object just for debugging
      const lastError = (window as any)._lastProfileError || "Profile missing or table does not exist.";
      await supabase.auth.signOut();
      setIsLoading(false);
      return {
        success: false,
        error: `Account setup incomplete. Supabase Error: ${lastError}`,
      };
    }

    setUser(authUser);
    setIsLoading(false);
    return { success: true };
  };

  // ── Logout ─────────────────────────────────────────────
  const logout = async () => {
    await supabase.auth.signOut();
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
