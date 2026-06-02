import { createContext, useContext, useEffect, useState, createElement, ReactNode } from "react";
import { User, mockUsers } from "./mock-data";

interface StoredUser extends User {
  password: string;
}

interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  favoriteTeamId?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "apex.users";
const SESSION_KEY = "apex.session";

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const seed: StoredUser[] = mockUsers.map(u => ({ ...u, password: "password123" }));
  localStorage.setItem(USERS_KEY, JSON.stringify(seed));
  return seed;
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
    try {
      const sid = localStorage.getItem(SESSION_KEY);
      if (sid) {
        const u = loadUsers().find(x => x.id === sid);
        if (u) {
          const { password: _p, ...safe } = u;
          setUser(safe);
        }
      }
    } catch {}
    setLoading(false);
  }, []);

  const login: AuthContextValue["login"] = async (email, password) => {
    const users = loadUsers();
    const u = users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === password);
    if (!u) return { ok: false, error: "Invalid email or password" };
    localStorage.setItem(SESSION_KEY, u.id);
    const { password: _p, ...safe } = u;
    setUser(safe);
    return { ok: true };
  };

  const signup: AuthContextValue["signup"] = async (data) => {
    const users = loadUsers();
    if (users.some(x => x.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, error: "Email already registered" };
    }
    if (users.some(x => x.username.toLowerCase() === data.username.toLowerCase())) {
      return { ok: false, error: "Username already taken" };
    }
    const newUser: StoredUser = {
      id: `u${Date.now()}`,
      email: data.email,
      username: data.username,
      password: data.password,
      fullName: data.fullName,
      avatar: data.fullName.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase(),
      role: "fan",
      favoriteTeamId: data.favoriteTeamId,
      teamsRegistered: [],
      predictionsMade: 0,
      predictionAccuracy: 0,
      fanLevel: 1,
      bio: "",
      location: "",
      verified: false,
      joinedAt: new Date().toISOString(),
      notifications: { email: true, push: true, matchAlerts: true, newsletter: true },
    };
    const next = [...users, newUser];
    saveUsers(next);
    localStorage.setItem(SESSION_KEY, newUser.id);
    const { password: _p, ...safe } = newUser;
    setUser(safe);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
