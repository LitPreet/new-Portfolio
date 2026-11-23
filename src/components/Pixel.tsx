/**
 * Tiny pixel-art renderer. Each string is a row; each character is a pixel
 * looked up in the palette ('.' = transparent). Adjacent same-color pixels
 * are merged into one rect to keep the SVG small.
 */
export function Pixel({
  rows,
  palette,
  scale = 3,
  className,
  title,
}: {
  rows: string[];
  palette: Record<string, string>;
  scale?: number;
  className?: string;
  title?: string;
}) {
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  const rects: React.ReactNode[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      if (c === "." || !palette[c]) {
        x++;
        continue;
      }
      let run = 1;
      while (row[x + run] === c) run++;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={palette[c]} />);
      x += run;
    }
  });

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {rects}
    </svg>
  );
}

const K = "var(--pix-k)";

// ---------- art ----------

export const lampRows = [
  "....kkkkkk....",
  "...kSSSSSSk...",
  "...kSSSSSSk...",
  "..kSSSSSSSSk..",
  "..kSSSSSSSSk..",
  ".kSSSSSSSSSSk.",
  ".kssssssssssk.",
  ".kkkkkkkkkkkk.",
  "......kk......",
  "......kk......",
  "......kk......",
  "......kk......",
  "......kk......",
  "....kkkkkk....",
  "...kbbbbbbk...",
  "...kkkkkkkk...",
];

export const lampPalette = (on: boolean) => ({
  k: K,
  S: on ? "#ffd27a" : "#b8b2a4",
  s: on ? "#f4a24c" : "#958f82",
  b: "#9a6b4f",
});

export const starRows = [".s.", "sss", ".s."];

export const planeRows = [
  "...........kk",
  ".........kkWk",
  ".......kkWWk.",
  ".....kkWWWWk.",
  "...kkWWWWWk..",
  ".kkWWWWWWWk..",
  "kkkkkGGWWk...",
  ".....kGGk....",
  "......kk.....",
];

export const planePalette = { k: K, W: "#ffffff", G: "#c9cfd8" };

export const catRows = [
  "...k...k..................",
  "..kOk.kOk.................",
  "..kOOkOOk.................",
  ".kOOOOOOOkkkkkkkkk........",
  ".kOkkOkkOOOOOOOOOOkk......",
  ".kOOOOOOOOoOOoOOOOOOk.....",
  ".kOOOpOOOOOOOOOOOOOOk.kk..",
  "..kOOOOOOoOOoOOOOOOOkkOk..",
  "...kkkkkkkkkkkkkkkkkkOk...",
  ".kLLLLLLLLLLLLLLLLLLLLk...",
  "kLLLLLLLLLLLLLLLLLLLLLLk..",
  "kkkkkkkkkkkkkkkkkkkkkkkk..",
];

// same cat, eyes open and ears up
export const catAwakeRows = [
  "..k.....k.................",
  ".kOk...kOk................",
  ".kOOkkkOOk................",
  ".kOOOOOOOOkkkkkkkkk.......",
  ".kOkWOOkWOOOOOOOOOOkk.....",
  ".kOkkOOkkOOoOOoOOOOOOk....",
  ".kOOOpOOOOOOOOOOOOOOOk.kk.",
  "..kOOOOOOoOOoOOOOOOOOkkOk.",
  "...kkkkkkkkkkkkkkkkkkkOk..",
  ".kLLLLLLLLLLLLLLLLLLLLk...",
  "kLLLLLLLLLLLLLLLLLLLLLLk..",
  "kkkkkkkkkkkkkkkkkkkkkkkk..",
];

export const catPalette = { k: K, O: "#f2a65a", o: "#d9853b", p: "#f28b9b", L: "#c3c7ce", W: "#ffffff" };
