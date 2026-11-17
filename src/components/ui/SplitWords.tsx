import { Fragment } from "react";
import { tokenize } from "@/lib/text";
import { cn } from "@/lib/utils";

/**
 * Renders text as masked words ready for a reveal animation.
 * `*emphasis*` becomes italic serif.
 */
export default function SplitWords({
  text,
  wordClassName,
  emClassName = "serif-em",
}: {
  text: string;
  wordClassName?: string;
  emClassName?: string;
}) {
  const tokens = tokenize(text).filter((t) => !t.reel);
  return (
    <>
      {tokens.map((t, i) => (
        <Fragment key={i}>
          <span className="mask" aria-hidden="true">
            <span className={cn("mask-inner", wordClassName, t.em && emClassName)}>{t.text}</span>
          </span>
          {i < tokens.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
