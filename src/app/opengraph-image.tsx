import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "#f3efe7",
        background:
          "radial-gradient(60% 70% at 85% 10%, rgba(138,108,255,0.55), transparent 70%), radial-gradient(50% 60% at 95% 80%, rgba(255,107,61,0.55), transparent 70%), #08080a",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          letterSpacing: 3,
          textTransform: "uppercase",
          opacity: 0.7,
        }}
      >
        <span>{site.role}</span>
        <span>Portfolio</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 140, fontWeight: 600, letterSpacing: -6, lineHeight: 0.95 }}>{site.name}</div>
        <div style={{ marginTop: 28, fontSize: 36, opacity: 0.75, maxWidth: 900 }}>{site.hero.intro}</div>
      </div>
    </div>,
    size,
  );
}
