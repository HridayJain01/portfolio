import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function portraitDataUrl() {
  const file = path.join(process.cwd(), "public", "images", "og-portrait.png");
  return fs.existsSync(file) ? `data:image/png;base64,${fs.readFileSync(file).toString("base64")}` : null;
}

export default function OpengraphImage() {
  const portrait = portraitDataUrl();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        color: "#f3efe7",
        background:
          "radial-gradient(45% 60% at 78% 45%, rgba(255,107,61,0.55), transparent 70%), radial-gradient(50% 60% at 95% 100%, rgba(138,108,255,0.55), transparent 70%), #08080a",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          width: portrait ? 720 : 1200,
        }}
      >
        <div style={{ display: "flex", fontSize: 21, letterSpacing: 2, textTransform: "uppercase", opacity: 0.7 }}>
          {site.role} · {site.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 600, letterSpacing: -5, lineHeight: 0.95 }}>{site.name}</div>
          <div style={{ marginTop: 28, fontSize: 32, opacity: 0.75, lineHeight: 1.35 }}>{site.hero.intro}</div>
        </div>
      </div>
      {portrait && (
        <img
          src={portrait}
          alt=""
          width={560}
          height={560}
          style={{ position: "absolute", right: -20, bottom: 0, width: 560, height: 560 }}
        />
      )}
    </div>,
    size,
  );
}
