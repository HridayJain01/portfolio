import Image from "next/image";
import { cn } from "@/lib/utils";

/** Round photo on a warm gradient (falls back to the monogram). */
export default function Avatar({
  src,
  name,
  monogram,
  size = 48,
  className,
}: {
  src?: string;
  name: string;
  monogram: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_30%,#ff6b3d,#6d4dff_65%,#16161a)] ring-1 ring-white/15",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt={`Portrait of ${name}`} fill sizes={`${size * 2}px`} className="object-cover object-top" />
      ) : (
        <span className="serif-em grid size-full place-items-center text-lg text-bone">{monogram}</span>
      )}
    </span>
  );
}
