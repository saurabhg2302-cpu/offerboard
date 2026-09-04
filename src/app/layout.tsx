import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "OfferBoard — Campus placement tracker",
  description:
    "Track campus and off-campus applications from wishlist to offer. Built by Saurabh Kumar Gautam, B.Tech CSE.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
