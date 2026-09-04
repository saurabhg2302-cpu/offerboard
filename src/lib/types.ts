export type Stage =
  | "wishlist"
  | "applied"
  | "oa"
  | "interview"
  | "offer"
  | "rejected";

export type DriveType = "on-campus" | "off-campus" | "internship";

export type Application = {
  id: string;
  company: string;
  role: string;
  type: DriveType;
  location: string;
  ctc: string;
  stage: Stage;
  deadline?: string;
  appliedAt?: string;
  notes: string;
  jobUrl?: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  college: string;
  branch: string;
  createdAt: string;
};

export const STAGES: { id: Stage; label: string }[] = [
  { id: "wishlist", label: "Wishlist" },
  { id: "applied", label: "Applied" },
  { id: "oa", label: "OA / Test" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Rejected" },
];
