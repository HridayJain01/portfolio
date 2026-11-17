---
title: "Why I prototype in code"
date: "2026-07-18"
excerpt: "Static mockups lie about the things that matter most: timing, data and touch. Here's how I prototype in the real medium."
tags: ["Process", "Prototyping"]
---

A mockup is a photograph of a product that doesn't exist yet. It's beautiful, but it can't tell you how a list feels with 3,000 items, how a gesture feels under your thumb, or how long a loading state really lasts.

## The medium is the message

When I prototype in code I'm forced to answer the questions that sink products later:

- What happens with **real data**: long names, empty states, slow networks?
- How does it feel on a **real device** at 60 fps, or 30?
- Where does focus go when you use a **keyboard**?

## A workflow that stays fast

I keep a scratch Next.js project with my motion primitives, a few fake APIs and a deploy preview per branch. A new idea goes from sketch to a link I can send someone in under an hour.

```tsx
// a throwaway prototype is still worth typing properly
export function Card({ title }: { title: string }) {
  return <article className="card">{title}</article>;
}
```

The goal isn't production code. It's *production feelings*, early enough to change course.
