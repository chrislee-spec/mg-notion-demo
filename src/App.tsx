import { useState, type ReactNode } from "react";
import { MarketGrid } from "./components/MarketGrid";

type TabDef = {
  id: string;
  label: string;
  render: () => ReactNode;
};

// Add a new tab by adding an entry here — no other changes needed.
const TABS: TabDef[] = [
  {
    id: "all",
    label: "All Items",
    render: () => <MarketGrid />,
  },
  {
    id: "collections",
    label: "Collections",
    render: () => (
      // PULSE-1: section scaffold + empty state. PULSE-2/PULSE-3 fill this
      // <section> with grouped collection data and the CollectionGrid.
      <section className="collections">
        <header className="collections-head">
          <h2 className="section-title">Collections</h2>
          <p className="muted">
            Browse items grouped by collection — Genesis, Neon Series,
            Founders Pack, and Pulse Originals.
          </p>
        </header>
        <div className="placeholder">
          <div className="empty-icon" aria-hidden="true">
            ◢◣
          </div>
          <p>No collections to show yet.</p>
          <p className="muted">
            Grouped collection browsing is on the way — check back soon.
          </p>
        </div>
      </section>
    ),
  },
];

export default function App() {
  const [activeId, setActiveId] = useState<string>(TABS[0].id);

  const activeTab = TABS.find((t) => t.id === activeId) ?? TABS[0];

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

      <main className="content">{activeTab.render()}</main>
    </div>
  );
}
