"use client";

import { useState } from "react";
import { Check, Copy } from "./icons";

/** Shows a contact detail (email or phone) with a copy-to-clipboard button. */
export default function CopyEmail({
  value,
  fallbackHref,
  kind = "email address",
}: {
  value: string;
  fallbackHref: string;
  kind?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2200);
        } catch {
          window.location.href = fallbackHref;
        }
      }}
      data-cursor-label={copied ? "Copied" : "Copy"}
      className="group inline-flex items-center gap-3 text-left text-[clamp(1.25rem,2.2vw,2rem)] tracking-tight"
      aria-label={`Copy ${kind} ${value}`}
    >
      <span className="link-underline">{value}</span>
      <span className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${kind} copied to clipboard` : ""}
      </span>
    </button>
  );
}
