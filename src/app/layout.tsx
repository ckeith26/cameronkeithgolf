import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ChatWidget } from "@/components/interactive/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cameron Keith | D1 Golfer & AI Engineer",
    template: "%s | Cameron Keith",
  },
  description:
    "Dartmouth D1 golfer, AI researcher, and startup founder. Building at the intersection of athletic discipline and engineering depth.",
  metadataBase: new URL("https://camkeith.me"),
  openGraph: {
    title: "Cameron Keith | D1 Golfer & AI Engineer",
    description:
      "Dartmouth D1 golfer, AI researcher, and startup founder. Building at the intersection of athletic discipline and engineering depth.",
    url: "https://camkeith.me",
    siteName: "Cameron Keith",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cameron Keith | D1 Golfer & AI Engineer",
    description:
      "Dartmouth D1 golfer, AI researcher, and startup founder.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
