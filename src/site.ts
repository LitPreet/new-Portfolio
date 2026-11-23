import { profile } from "./content";

/**
 * Absolute site URL. Vercel sets VERCEL_PROJECT_PRODUCTION_URL
 * (e.g. preetbhardwaj.vercel.app); set NEXT_PUBLIC_SITE_URL to override
 * once you have a custom domain. Locally it falls back to localhost.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const seo = {
  title: `${profile.searchName} (${profile.name}) · ${profile.role}`,
  description: `${profile.searchName}, also known as ${profile.name}, is a frontend engineer in ${profile.city}, India. He builds fast, polished web apps with React, Next.js and TypeScript, and currently works on Mokkup.ai at NeenOpal.`,
};

/** schema.org Person + WebSite, so Google knows every name refers to the same person. */
export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.searchName,
        alternateName: profile.aliases,
        givenName: "Preet",
        familyName: "Bhardwaj",
        url: siteUrl,
        image: `${siteUrl}${profile.photo ?? "/opengraph-image"}`,
        jobTitle: profile.role,
        description: seo.description,
        email: `mailto:${profile.email}`,
        worksFor: { "@type": "Organization", name: "NeenOpal", url: "https://neenopal.com" },
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.city,
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Chandigarh University" },
          { "@type": "CollegeOrUniversity", name: "Gurugram University" },
        ],
        knowsAbout: ["Frontend development", "React", "Next.js", "TypeScript", "Web performance", "Core Web Vitals"],
        sameAs: [profile.links.github, profile.links.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${profile.searchName} · Portfolio`,
        alternateName: [`${profile.name} portfolio`, `${profile.fullName} portfolio`],
        publisher: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-IN",
      },
    ],
  };
}
