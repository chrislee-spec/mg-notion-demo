import { describe, expect, it, vi } from "vitest";
import shippedConfig from "../../public/merchandising.json";
import { getCollections } from "./collections";
import { items } from "../data/items";
import {
  isFeaturedItem,
  loadFeaturedCollection,
  resolveFeaturedCollection,
} from "./featured";

const fakeFetch = (body: unknown, ok = true) =>
  vi.fn(async () => ({ ok, json: async () => body })) as unknown as typeof fetch;

describe("resolveFeaturedCollection", () => {
  it("resolves exactly one collection by name", () => {
    const featured = resolveFeaturedCollection({ featuredCollection: "Genesis" });
    expect(featured?.collection).toBe("Genesis");
    expect(featured?.items.every((i) => i.collection === "Genesis")).toBe(true);
  });

  it("returns null for missing, non-string, or list values", () => {
    expect(resolveFeaturedCollection(null)).toBeNull();
    expect(resolveFeaturedCollection({})).toBeNull();
    expect(resolveFeaturedCollection({ featuredCollection: "" })).toBeNull();
    expect(
      resolveFeaturedCollection({ featuredCollection: ["Genesis", "Neon Series"] }),
    ).toBeNull();
  });

  it("returns null for an unknown collection", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(resolveFeaturedCollection({ featuredCollection: "Nope" })).toBeNull();
  });
});

describe("loadFeaturedCollection", () => {
  it("reads the featured collection from runtime config", async () => {
    const featured = await loadFeaturedCollection(
      "/merchandising.json",
      fakeFetch({ featuredCollection: "Founders Pack" }),
    );
    expect(featured?.collection).toBe("Founders Pack");
  });

  it("picks up a changed config without code changes", async () => {
    const a = await loadFeaturedCollection("x", fakeFetch({ featuredCollection: "Genesis" }));
    const b = await loadFeaturedCollection("x", fakeFetch({ featuredCollection: "Pulse Originals" }));
    expect(a?.collection).toBe("Genesis");
    expect(b?.collection).toBe("Pulse Originals");
  });

  it("returns null on HTTP or network failure", async () => {
    expect(await loadFeaturedCollection("x", fakeFetch({}, false))).toBeNull();
    const failing = vi.fn(async () => {
      throw new Error("offline");
    }) as unknown as typeof fetch;
    expect(await loadFeaturedCollection("x", failing)).toBeNull();
  });
});

describe("shipped config", () => {
  it("public/merchandising.json names a real collection", () => {
    expect(resolveFeaturedCollection(shippedConfig, getCollections())).not.toBeNull();
  });
});

describe("isFeaturedItem", () => {
  it("flags only items in the featured collection", () => {
    const featured = resolveFeaturedCollection({ featuredCollection: "Genesis" });
    const flagged = items.filter((i) => isFeaturedItem(i, featured));
    expect(flagged.map((i) => i.collection)).toEqual(["Genesis", "Genesis", "Genesis"]);
    expect(isFeaturedItem(items[0], null)).toBe(false);
  });
});
