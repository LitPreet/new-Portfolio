/** Color for a GitHub contribution level (0–4), blended from the accent. */
export const levelColor = (level: number) =>
  level === 0 ? "var(--soft)" : `color-mix(in srgb, var(--accent) ${[0, 32, 55, 78, 100][level]}%, var(--soft))`;
