import { useState } from "react";
import { MarketGrid } from "./components/MarketGrid";

type Tab = "all" | "collections";

export default function App() {
  const [tab, setTab] = useState<Tab>("all");

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
        <button
          className={tab === "all" ? "tab active" : "tab"}
          onClick={() => setTab("all")}
        >
          All Items
        </button>
        <button
          className={tab === "collections" ? "tab active" : "tab"}
          onClick={() => setTab("collections")}
        >
          Collections
        </button>
      </nav>

      <main className="content">
        {tab === "all" ? (
          <MarketGrid />
        ) : (
          // PULSE-3: replace this placeholder with <CollectionGrid />
          <div className="placeholder">
            <p>Collection View coming soon.</p>
            <p className="muted">
              Browse items grouped by collection to improve discovery.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
