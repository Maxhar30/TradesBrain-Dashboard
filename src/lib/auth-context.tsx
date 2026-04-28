"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setAuthCookie, clearAuthCookie, getAuthToken } from "@/lib/cookies";
import { disconnectSocket } from "@/lib/socket";

interface User {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "dispatcher";
  companyName: string;
  companyId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  companyName: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  });

  // Rehydrate from cookie on mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setState({ user: null, token: null, loading: false });
      return;
    }

    api
      .get<User>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((user) => setState({ user, token, loading: false }))
      .catch(() => {
        clearAuthCookie();
        setState({ user: null, token: null, loading: false });
      });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { token, user } = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      setAuthCookie(token);
      setState({ user, token, loading: false });

      const params = new URLSearchParams(window.location.search);
      router.push(params.get("from") ?? "/dashboard");
    },
    [router]
  );

  const register = useCallback(
    async (data: RegisterPayload) => {
      const { token, user } = await api.post<AuthResponse>(
        "/auth/register",
        data
      );
      setAuthCookie(token);
      setState({ user, token, loading: false });
      router.push("/dashboard");
    },
    [router]
  );

  const logout = useCallback(() => {
    clearAuthCookie();
    disconnectSocket();
    setState({ user: null, token: null, loading: false });
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
