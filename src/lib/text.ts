export type Token = { text: string; em: boolean; reel?: boolean };

/**
 * Splits a line into word tokens. `*like this*` marks italic-serif emphasis
 * (can span several words), and `[reel]` marks the inline video pill.
 */
export function tokenize(line: string): Token[] {
  const out: Token[] = [];
  let em = false;
  for (const raw of line.split(/\s+/).filter(Boolean)) {
    if (raw === "[reel]") {
      out.push({ text: "", em: false, reel: true });
      continue;
    }
    const m = raw.match(/^(\*)?(.*?)(\*)?([.,!?;:)]*)$/);
    if (!m) {
      out.push({ text: raw, em });
      continue;
    }
    if (m[1]) em = true;
    out.push({ text: (m[2] ?? "") + (m[4] ?? ""), em });
    if (m[3]) em = false;
  }
  return out;
}

/** Plain-text version (for aria-labels and metadata). */
export function plain(text: string) {
  return text
    .replace(/\[reel\]/g, "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
