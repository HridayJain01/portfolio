import { cn } from "@/lib/utils";

/** Small "(02) — About" section marker with a hairline. */
export default function SectionLabel({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("eyebrow flex items-center gap-4 text-mute", className)}>
      <span className="text-bone">({index})</span>
      <span className="h-px w-10 bg-line" />
      <span>{label}</span>
    </div>
  );
}
