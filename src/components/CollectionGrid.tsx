import { useState } from "react";
import {
  RARITIES,
  filterCollectionsByRarity,
  getCollections,
  type RarityFilter,
} from "../api/collections";
import { ItemCard } from "./ItemCard";
import type { MarketItem } from "../data/items";

const FILTER_OPTIONS: RarityFilter[] = ["All", ...RARITIES];

// PULSE-3: grouped browsing view. Renders one section per collection — a header
// (name + item count) followed by a grid of that collection's item cards,
// reusing ItemCard. Consumes getCollections() from the PULSE-2 data module.
// PULSE-5: rarity filter chips above the grid narrow the cards within each
// collection (logic in filterCollectionsByRarity).
export function CollectionGrid({
  onBuy,
}: {
  onBuy?: (item: MarketItem) => void;
}) {
  const [rarity, setRarity] = useState<RarityFilter>("All");
  const collections = filterCollectionsByRarity(getCollections(), rarity);
  return (
    <div className="collection-view">
      <div className="rarity-filter" role="group" aria-label="Filter by rarity">
        <span className="rarity-filter-label">Rarity</span>
        {FILTER_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={`chip${option === rarity ? " chip-active" : ""}`}
            aria-pressed={option === rarity}
            onClick={() => setRarity(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {collections.length === 0 ? (
        <div className="placeholder">No {rarity} items in any collection.</div>
      ) : (
        <div className="collection-sections">
          {collections.map((c) => (
            <section key={c.collection} className="collection-section">
              <header className="collection-section-head">
                <h2 className="section-title">{c.collection}</h2>
                <span className="collection-count">
                  {c.items.length} {c.items.length === 1 ? "item" : "items"}
                </span>
              </header>
              <div className="grid">
                {c.items.map((item) => (
                  <ItemCard key={item.id} item={item} onBuy={onBuy} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
