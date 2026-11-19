// PULSE-2: client-side data module that groups marketplace items by collection.
// Consumed by the Collections tab (names + counts here; PULSE-3 renders the grid).
import { items, type MarketItem, type Rarity } from "../data/items";

export interface Collection {
  /** Collection name, e.g. "Genesis". */
  collection: string;
  /** Items belonging to this collection, in their original order. */
  items: MarketItem[];
}

/**
 * Group the flat `items` list into collections, preserving the order each
 * collection is first seen in the source data. `source` defaults to the mock
 * inventory; it is a parameter so the logic can be tested in isolation.
 */
export function getCollections(source: MarketItem[] = items): Collection[] {
  const byName = new Map<string, MarketItem[]>();
  for (const item of source) {
    const group = byName.get(item.collection);
    if (group) {
      group.push(item);
    } else {
      byName.set(item.collection, [item]);
    }
  }
  return Array.from(byName, ([collection, groupItems]) => ({
    collection,
    items: groupItems,
  }));
}

// PULSE-5: rarity filtering for the Collections view.

/** Every rarity, lowest to highest; drives the filter control's options. */
export const RARITIES: readonly Rarity[] = ["Common", "Rare", "Epic", "Legendary"];

/** "All" means no rarity filter is applied. */
export type RarityFilter = Rarity | "All";

/**
 * Narrow each collection to items of the given rarity. Collections left with
 * no matching items are dropped. Pure: the input collections are not mutated.
 */
export function filterCollectionsByRarity(
  collections: Collection[],
  rarity: RarityFilter,
): Collection[] {
  if (rarity === "All") return collections;
  return collections
    .map((c) => ({
      collection: c.collection,
      items: c.items.filter((item) => item.rarity === rarity),
    }))
    .filter((c) => c.items.length > 0);
}
