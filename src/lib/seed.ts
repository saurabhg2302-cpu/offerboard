import type { Application } from "./types";

export const DEMO_APPLICATIONS: Omit<Application, "id" | "createdAt">[] = [
  {
    company: "Amazon",
    role: "SDE Intern",
    type: "on-campus",
    location: "Bengaluru",
    ctc: "1.2L / month",
    stage: "interview",
    deadline: daysFromNow(4),
    appliedAt: daysFromNow(-12),
    notes: "OA cleared. Prepare graphs + system design lite.",
    jobUrl: "https://www.amazon.jobs",
  },
  {
    company: "Atlassian",
    role: "Software Engineer",
    type: "off-campus",
    location: "Remote / Bengaluru",
    ctc: "32 LPA",
    stage: "oa",
    deadline: daysFromNow(2),
    appliedAt: daysFromNow(-5),
    notes: "HackerRank OA. Focus on DSA mediums.",
  },
  {
    company: "Flipkart",
    role: "SDE-1",
    type: "on-campus",
    location: "Bengaluru",
    ctc: "21 LPA",
    stage: "applied",
    deadline: daysFromNow(9),
    appliedAt: daysFromNow(-2),
    notes: "Resume shortlisted. Wait for OA mail.",
  },
  {
    company: "Zomato",
    role: "Backend Intern",
    type: "internship",
    location: "Gurgaon",
    ctc: "80k / month",
    stage: "wishlist",
    deadline: daysFromNow(14),
    notes: "Need referral. Update resume with Node projects.",
  },
  {
    company: "Microsoft",
    role: "SWE Intern",
    type: "off-campus",
    location: "Hyderabad",
    ctc: "1.25L / month",
    stage: "offer",
    deadline: daysFromNow(21),
    appliedAt: daysFromNow(-40),
    notes: "Offer received. Decision pending vs Amazon intern.",
  },
  {
    company: "Deloitte",
    role: "Analyst",
    type: "on-campus",
    location: "Hyderabad",
    ctc: "8 LPA",
    stage: "rejected",
    appliedAt: daysFromNow(-20),
    notes: "Technical round: SQL + OOP. Revise DBMS.",
  },
];

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
