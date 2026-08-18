export function SandwichVisual({ tone = "sun", compact = false }: { tone?: string; compact?: boolean }) {
  return <div className={`food-visual ${tone} ${compact ? "compact" : ""}`} aria-hidden="true">
    <div className="food-shadow" />
    <div className="food-layer bread-top"><i /><i /></div>
    <div className="food-layer cheese" />
    <div className="food-layer egg" />
    <div className="food-layer meat" />
    <div className="food-layer bread-bottom" />
  </div>;
}
