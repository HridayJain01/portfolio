import fs from "node:fs";
import path from "node:path";

/**
 * Returns `src` if it is a remote URL or a file that exists in /public, otherwise
 * undefined, so missing videos show the generative placeholder instead of
 * firing a failed request. Runs at build time on the server.
 */
export function resolveMedia(src?: string) {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  const clean = decodeURI(src.split(/[?#]/)[0]).replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", clean)) ? src : undefined;
}
