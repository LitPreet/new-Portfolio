import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { profile } from "@/content";
import { seo, siteUrl } from "@/site";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: `${profile.searchName} · Portfolio`,
  authors: [{ name: profile.fullName, url: siteUrl }],
  creator: profile.fullName,
  keywords: [
    "Preet Bhardwaj",
    "Preet Kumar",
    "Preet Kumar Bhardwaj",
    "Preet Bhardwaj frontend engineer",
    "Preet Kumar frontend developer",
    "LitPreet",
    "frontend engineer Gurugram",
    "React developer",
    "Next.js developer",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.searchName} · Portfolio`,
    title: seo.title,
    description: seo.description,
    locale: "en_IN",
    firstName: "Preet",
    lastName: "Bhardwaj",
    username: profile.github,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  // Paste the code from Google Search Console into the env var on Vercel.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

// Runs before paint so a saved theme / color never flashes the wrong look.
const themeScript = `try{var d=document.documentElement,t=localStorage.getItem('theme'),a=localStorage.getItem('accent');if(t)d.dataset.theme=t;if(a&&a!=='emerald')d.dataset.accent=a}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${hanken.variable} ${jetbrains.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
