import { items } from "../data/items";
import { ItemCard } from "./ItemCard";

// Flat "All Items" view. This is the baseline experience.
// PULSE-3 introduces a grouped CollectionGrid alongside this.
export function MarketGrid() {
  return (
    <div className="grid">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
