import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alok Patel — Logic & Lens",
  description: "AI, engineering and visual storytelling. Explore Alok Patel’s work in LLM evaluation, machine learning, video editing and videography.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
