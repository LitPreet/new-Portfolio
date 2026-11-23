import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { lampRows } from "@/components/Pixel";
import { headline, profile } from "@/content";

// Share card shown by LinkedIn (Featured), WhatsApp, X, Slack… when the link is pasted.
export const alt = `${profile.name} · ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const EMERALD = "#0f7a55";
const INK = "#111111";
const MUTED = "#6e6e6e";
const LINE = "#e7e7e7";

const font = (f: string) => readFile(join(process.cwd(), "assets/fonts", f));

/** The pixel lamp from the site, as an SVG data URI. */
function lampSvg() {
  const pal: Record<string, string> = { k: "#2b2b2b", S: "#ffd27a", s: "#f4a24c", b: "#9a6b4f" };
  let rects = "";
  lampRows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (pal[c]) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${pal[c]}"/>`;
    }),
  );
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 16" shape-rendering="crispEdges">${rects}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

// deterministic "contribution" strip
const levels = Array.from({ length: 42 }, (_, i) => [0, 1, 0, 2, 1, 3, 0, 2, 4, 1, 0, 3][(i * 7 + (i >> 2)) % 12]);
const levelBg = (l: number) => (l === 0 ? "#f1f1f2" : `rgba(15,122,85,${[0, 0.3, 0.55, 0.78, 1][l]})`);

export default async function Image() {
  const [regular, semibold, mono, photo] = await Promise.all([
    font("HankenGrotesk-Regular.ttf"),
    font("HankenGrotesk-SemiBold.ttf"),
    font("JetBrainsMono-Medium.ttf"),
    profile.photo ? readFile(join(process.cwd(), "public", profile.photo)) : null,
  ]);
  const [before, word, after] = headline.split(/[{}]/);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          padding: "56px 72px",
          fontFamily: "Hanken",
          color: INK,
        }}
      >
        {/* top row: status pill + lamp */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 22px",
              borderRadius: 999,
              border: `2px solid ${LINE}`,
              background: "#f6f7f6",
              fontSize: 24,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#22a35a" }} />
            Open to work
          </div>
          <img src={lampSvg()} width={70} height={80} alt="" />
        </div>

        {/* middle: photo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 48, marginTop: 28 }}>
          <div
            style={{
              display: "flex",
              padding: 8,
              borderRadius: 30,
              border: `2px solid ${LINE}`,
              background: "#ffffff",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            {photo ? (
              <img
                src={`data:image/jpeg;base64,${photo.toString("base64")}`}
                width={228}
                height={228}
                style={{ borderRadius: 22, objectFit: "cover" }}
                alt=""
              />
            ) : (
              <div
                style={{
                  width: 228,
                  height: 228,
                  borderRadius: 22,
                  background: "#e7f5ee",
                  color: EMERALD,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 72,
                  fontFamily: "Mono",
                }}
              >
                {profile.initials}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{profile.name}</div>
            <div style={{ display: "flex", fontSize: 36, color: MUTED, marginTop: 10 }}>{`${profile.role} · Gurugram, India`}</div>
            <div style={{ display: "flex", fontSize: 44, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 30 }}>
              {before}
              <span style={{ color: EMERALD, marginLeft: 10 }}>{word}</span>
              {after}
            </div>
          </div>
        </div>

        {/* bottom: stack + contribution strip */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "auto" }}>
          <div style={{ fontFamily: "Mono", fontSize: 24, color: MUTED, letterSpacing: "0.04em" }}>
            REACT · NEXT.JS · TYPESCRIPT
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", width: 14 * 22, gap: 4 }}>
            {levels.map((l, i) => (
              <div key={i} style={{ width: 18, height: 18, borderRadius: 4, background: levelBg(l) }} />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Hanken", data: regular, weight: 400, style: "normal" },
        { name: "Hanken", data: semibold, weight: 600, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
