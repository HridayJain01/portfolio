/** Text that rolls to a duplicate on hover of the nearest `.roll-trigger` ancestor. */
export default function Roll({ children, className }: { children: string; className?: string }) {
  return (
    <span className={`roll ${className ?? ""}`}>
      <span className="roll-inner" data-text={children}>
        {children}
      </span>
    </span>
  );
}
