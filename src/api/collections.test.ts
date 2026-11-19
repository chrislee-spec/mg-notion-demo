import { describe, expect, it } from "vitest";
import { items, type MarketItem } from "../data/items";
import {
  RARITIES,
  filterCollectionsByRarity,
  getCollections,
} from "./collections";

const fixture: MarketItem[] = [
  { id: "a1", name: "A1", collection: "Alpha", rarity: "Common", price: 1, hue: 0 },
  { id: "b1", name: "B1", collection: "Beta", rarity: "Epic", price: 2, hue: 0 },
  { id: "a2", name: "A2", collection: "Alpha", rarity: "Epic", price: 3, hue: 0 },
  { id: "b2", name: "B2", collection: "Beta", rarity: "Rare", price: 4, hue: 0 },
];

describe("getCollections", () => {
  it("groups items by collection in first-seen order", () => {
    const result = getCollections(fixture);
    expect(result.map((c) => c.collection)).toEqual(["Alpha", "Beta"]);
    expect(result[0].items.map((i) => i.id)).toEqual(["a1", "a2"]);
    expect(result[1].items.map((i) => i.id)).toEqual(["b1", "b2"]);
  });

  it("returns an empty list for no items", () => {
    expect(getCollections([])).toEqual([]);
  });

  it("covers every mock item exactly once by default", () => {
    const result = getCollections();
    const ids = result.flatMap((c) => c.items.map((i) => i.id));
    expect(ids.sort()).toEqual(items.map((i) => i.id).sort());
  });
});

describe("filterCollectionsByRarity", () => {
  it("returns collections unchanged for 'All'", () => {
    const collections = getCollections(fixture);
    expect(filterCollectionsByRarity(collections, "All")).toEqual(collections);
  });

  it("keeps only items of the selected rarity within each collection", () => {
    const result = filterCollectionsByRarity(getCollections(fixture), "Epic");
    expect(result).toEqual([
      { collection: "Alpha", items: [fixture[2]] },
      { collection: "Beta", items: [fixture[1]] },
    ]);
  });

  it("drops collections with no matching items", () => {
    const result = filterCollectionsByRarity(getCollections(fixture), "Rare");
    expect(result.map((c) => c.collection)).toEqual(["Beta"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterCollectionsByRarity(getCollections(fixture), "Legendary")).toEqual([]);
  });

  it("does not mutate the input collections", () => {
    const collections = getCollections(fixture);
    filterCollectionsByRarity(collections, "Common");
    expect(collections[0].items).toHaveLength(2);
    expect(collections[1].items).toHaveLength(2);
  });

  it("partitions the mock inventory across all rarities", () => {
    const all = getCollections();
    const total = RARITIES.reduce(
      (sum, r) =>
        sum +
        filterCollectionsByRarity(all, r).reduce((n, c) => n + c.items.length, 0),
      0,
    );
    expect(total).toBe(items.length);
  });
});
