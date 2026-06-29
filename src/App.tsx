import { useState, type ReactNode } from "react";
import { MarketGrid } from "./components/MarketGrid";
import { CollectionGrid } from "./components/CollectionGrid";
import { SettlementToast } from "./components/SettlementToast";
import type { MarketItem } from "./data/items";

type TabContext = {
  onBuy: (item: MarketItem) => void;
};

type TabDef = {
  id: string;
  label: string;
  render: (ctx: TabContext) => ReactNode;
};

// Add a new tab by adding an entry here — no other changes needed.
const TABS: TabDef[] = [
  {
    id: "all",
    label: "All Items",
    render: ({ onBuy }) => <MarketGrid onBuy={onBuy} />,
  },
  {
    id: "collections",
    label: "Collections",
    // PULSE-3: grouped browsing view — one section of item cards per collection.
    render: ({ onBuy }) => <CollectionGrid onBuy={onBuy} />,
  },
];

export default function App() {
  const [activeId, setActiveId] = useState<string>(TABS[0].id);
  const [purchase, setPurchase] = useState<{
    item: MarketItem;
    willFail: boolean;
    nonce: number;
  } | null>(null);

  const activeTab = TABS.find((t) => t.id === activeId) ?? TABS[0];

  // Visual simulation only (PULSE-12) — randomly exercise the retry path on
  // ~half of purchases to demonstrate settlement hardening. No real payment.
  const handleBuy = (item: MarketItem) => {
    setPurchase({ item, willFail: Math.random() < 0.5, nonce: Date.now() });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="logo">◢◣</span>
          <h1>Pulse Market</h1>
        </div>
        <p className="tagline">Game items &amp; skins marketplace</p>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={t.id === activeId ? "tab active" : "tab"}
            onClick={() => setActiveId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="content">{activeTab.render({ onBuy: handleBuy })}</main>

      {purchase && (
        <SettlementToast
          key={purchase.nonce}
          item={purchase.item}
          willFail={purchase.willFail}
          onClose={() => setPurchase(null)}
        />
      )}
    </div>
  );
}
