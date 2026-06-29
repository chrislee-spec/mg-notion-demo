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
      // PULSE-3: replace this placeholder with <CollectionGrid />
      <div className="placeholder">
        <p>Collection View coming soon.</p>
        <p className="muted">
          Browse items grouped by collection to improve discovery.
        </p>
      </div>
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
