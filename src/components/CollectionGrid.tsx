import { getCollections } from "../api/collections";
import { ItemCard } from "./ItemCard";
import type { MarketItem } from "../data/items";

// PULSE-3: grouped browsing view. Renders one section per collection — a header
// (name + item count) followed by a grid of that collection's item cards,
// reusing ItemCard. Consumes getCollections() from the PULSE-2 data module.
export function CollectionGrid({
  onBuy,
}: {
  onBuy?: (item: MarketItem) => void;
}) {
  const collections = getCollections();
  return (
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
  );
}
