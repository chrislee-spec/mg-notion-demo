import { useState, type ReactNode } from "react";
import { MarketGrid } from "./components/MarketGrid";
import { getCollections } from "./api/collections";

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
    render: () => {
      // PULSE-2: list each collection name with its item count. PULSE-3 will
      // replace this list with the grouped CollectionGrid of item cards.
      const collections = getCollections();
      return (
        <section className="collections">
          <header className="collections-head">
            <h2 className="section-title">Collections</h2>
            <p className="muted">
              Browse items grouped by collection — {collections.length}{" "}
              collections in the marketplace.
            </p>
          </header>
          <ul className="collection-list">
            {collections.map((c) => (
              <li key={c.collection} className="collection-row">
                <span className="collection-name">{c.collection}</span>
                <span className="collection-count">
                  {c.items.length} {c.items.length === 1 ? "item" : "items"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      );
    },
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
