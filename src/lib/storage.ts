import type { Application, User } from "./types";

const USERS_KEY = "offerboard.users";
const SESSION_KEY = "offerboard.session";

function appsKey(userId: string) {
  return `offerboard.apps.${userId}`;
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getUsers(): User[] {
  return read<User[]>(USERS_KEY, []);
}

export function saveUsers(users: User[]) {
  write(USERS_KEY, users);
}

export function getSessionId(): string | null {
  return read<string | null>(SESSION_KEY, null);
}

export function setSessionId(id: string | null) {
  if (!id) localStorage.removeItem(SESSION_KEY);
  else write(SESSION_KEY, id);
}

export function getApps(userId: string): Application[] {
  return read<Application[]>(appsKey(userId), []);
}

export function saveApps(userId: string, apps: Application[]) {
  write(appsKey(userId), apps);
}
