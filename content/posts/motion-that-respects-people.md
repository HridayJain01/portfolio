---
title: "Motion that respects people"
date: "2026-10-02"
excerpt: "Animation should explain, not decorate. A few rules I follow so motion makes products clearer instead of louder."
tags: ["Motion", "Accessibility"]
---

Great motion is felt more than it is seen. When it works, people don't say *"nice animation"*. They say the product feels **fast**, **calm** or **obvious**.

## Motion is a language

Every transition makes a claim about how your interface works. A panel that slides in from the right says *"I live over here."* A card that grows into a page says *"you're going deeper into this thing."* When those claims are consistent, people build a mental model without being told anything.

## Three rules I keep coming back to

1. **Explain causality.** Motion should connect an action to its result. If you can't say what an animation explains, cut it.
2. **Be quick on the way in, quicker on the way out.** Entrances around 400–700 ms with an expo ease, exits at roughly half that.
3. **Respect the setting.** Honour `prefers-reduced-motion`. Swap movement for opacity, and never autoplay big parallax for people who opted out.

> The best interface animation is the one you'd miss if it were gone, but never notice while it's there.

## A tiny checklist

- Does it still work with motion turned off?
- Does it ever block input?
- Would it still feel good on the hundredth time?

If the answer to all three is yes, ship it.
