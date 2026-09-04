"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { hashPassword, uid } from "./crypto";
import { DEMO_APPLICATIONS } from "./seed";
import {
  getApps,
  getSessionId,
  getUsers,
  saveApps,
  saveUsers,
  setSessionId,
} from "./storage";
import type { Application, User } from "./types";

type AuthState = {
  ready: boolean;
  user: User | null;
  applications: Application[];
  register: (input: {
    name: string;
    email: string;
    password: string;
    college: string;
    branch: string;
  }) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  loginDemo: () => Promise<void>;
  logout: () => void;
  upsertApp: (app: Application) => void;
  deleteApp: (id: string) => void;
  setStage: (id: string, stage: Application["stage"]) => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const users = getUsers();
    const sid = getSessionId();
    const found = users.find((u) => u.id === sid) ?? null;
    setUser(found);
    if (found) setApplications(getApps(found.id));
    setReady(true);
  }, []);

  const persistApps = useCallback((userId: string, next: Application[]) => {
    setApplications(next);
    saveApps(userId, next);
  }, []);

  const register: AuthState["register"] = useCallback(async (input) => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
      return "An account with this email already exists.";
    }
    const user: User = {
      id: uid(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      passwordHash: await hashPassword(input.password),
      college: input.college.trim(),
      branch: input.branch.trim(),
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, user]);
    setSessionId(user.id);
    setUser(user);
    persistApps(user.id, []);
    return null;
  }, [persistApps]);

  const login: AuthState["login"] = useCallback(async (email, password) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email.trim().toLowerCase());
    if (!found || found.passwordHash !== (await hashPassword(password))) {
      return "Invalid email or password.";
    }
    setSessionId(found.id);
    setUser(found);
    setApplications(getApps(found.id));
    return null;
  }, []);

  const loginDemo = useCallback(async () => {
    const email = "demo@offerboard.dev";
    const users = getUsers();
    let demo = users.find((u) => u.email === email);
    if (!demo) {
      demo = {
        id: "demo-user",
        name: "Saurabh Kumar Gautam",
        email,
        passwordHash: await hashPassword("demo"),
        college: "B.Tech CSE",
        branch: "B.Tech CSE",
        createdAt: new Date().toISOString(),
      };
      saveUsers([...users, demo]);
    } else {
      demo = {
        ...demo,
        name: "Saurabh Kumar Gautam",
        college: "B.Tech CSE",
        branch: "B.Tech CSE",
      };
      saveUsers(users.map((u) => (u.id === demo!.id ? demo! : u)));
    }
    const existing = getApps(demo.id);
    const apps =
      existing.length > 0
        ? existing
        : DEMO_APPLICATIONS.map((row) => ({
            ...row,
            id: uid(),
            createdAt: new Date().toISOString(),
          }));
    setSessionId(demo.id);
    setUser(demo);
    persistApps(demo.id, apps);
  }, [persistApps]);

  const logout = useCallback(() => {
    setSessionId(null);
    setUser(null);
    setApplications([]);
  }, []);

  const upsertApp = useCallback(
    (app: Application) => {
      if (!user) return;
      const next = applications.some((a) => a.id === app.id)
        ? applications.map((a) => (a.id === app.id ? app : a))
        : [app, ...applications];
      persistApps(user.id, next);
    },
    [applications, persistApps, user],
  );

  const deleteApp = useCallback(
    (id: string) => {
      if (!user) return;
      persistApps(
        user.id,
        applications.filter((a) => a.id !== id),
      );
    },
    [applications, persistApps, user],
  );

  const setStage = useCallback(
    (id: string, stage: Application["stage"]) => {
      if (!user) return;
      persistApps(
        user.id,
        applications.map((a) => (a.id === id ? { ...a, stage } : a)),
      );
    },
    [applications, persistApps, user],
  );

  const value = useMemo(
    () => ({
      ready,
      user,
      applications,
      register,
      login,
      loginDemo,
      logout,
      upsertApp,
      deleteApp,
      setStage,
    }),
    [
      ready,
      user,
      applications,
      register,
      login,
      loginDemo,
      logout,
      upsertApp,
      deleteApp,
      setStage,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
