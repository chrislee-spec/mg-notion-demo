import { useEffect, useState } from "react";
import type { MarketItem } from "../data/items";

type Phase = "pending" | "retrying" | "settled";

// PULSE-12: visual simulation only — no real payment occurs. Settlement
// resolves after a short delay; when `willFail` is set, a simulated transient
// failure triggers exactly one retry (Pending → Retrying → Settled) to
// demonstrate the trade-settlement hardening behavior.
export function SettlementToast({
  item,
  willFail,
  onClose,
}: {
  item: MarketItem;
  willFail: boolean;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("pending");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (willFail) {
      timers.push(setTimeout(() => setPhase("retrying"), 1100));
      timers.push(setTimeout(() => setPhase("settled"), 2300));
    } else {
      timers.push(setTimeout(() => setPhase("settled"), 1300));
    }
    return () => timers.forEach(clearTimeout);
  }, [willFail]);

  // Auto-dismiss once settled.
  useEffect(() => {
    if (phase !== "settled") return;
    const t = setTimeout(onClose, 2600);
    return () => clearTimeout(t);
  }, [phase, onClose]);

  const label =
    phase === "pending" ? "Pending" : phase === "retrying" ? "Retrying" : "Settled";

  return (
    <div className={`toast toast-${phase}`} role="status" aria-live="polite">
      <span className="toast-dot" />
      <div className="toast-text">
        <span className="toast-title">
          {phase === "settled" ? "Purchase settled" : "Settling purchase"}
        </span>
        <span className="toast-sub">
          {item.name} · {label}
          {phase === "retrying" && " — transient failure, retrying…"}
        </span>
      </div>
      <span className="toast-status">{label}</span>
    </div>
  );
}
