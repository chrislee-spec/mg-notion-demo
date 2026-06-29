// PULSE-2: client-side data module that groups marketplace items by collection.
// Consumed by the Collections tab (names + counts here; PULSE-3 renders the grid).
import { items, type MarketItem } from "../data/items";

export interface Collection {
  /** Collection name, e.g. "Genesis". */
  collection: string;
  /** Items belonging to this collection, in their original order. */
  items: MarketItem[];
}

/**
 * Group the flat `items` list into collections, preserving the order each
 * collection is first seen in the source data.
 */
export function getCollections(): Collection[] {
  const byName = new Map<string, MarketItem[]>();
  for (const item of items) {
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
