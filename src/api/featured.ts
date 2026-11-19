// PULSE-23: featured-collection designation (editorial selection).
//
// The featured collection is chosen editorially in a runtime config file,
// `public/merchandising.json`, which is fetched by the browser at load time and
// is NOT bundled into the JS build. Changing which collection is featured means
// editing that one JSON file on the host — no code change, rebuild, or deploy.
//
// "Exactly one" is enforced structurally: the config holds a single
// `featuredCollection` string (not a list), and it must name a collection that
// exists in the catalog. Anything else resolves to "no featured collection".
//
// Consumers (hero slot PULSE-20, "Featured" badge PULSE-22) should read it via
// `useFeaturedCollection()` and, for item cards, `isFeaturedItem()`.
import { useEffect, useState } from "react";
import { getCollections, type Collection } from "./collections";
import type { MarketItem } from "../data/items";

/** Shape of `public/merchandising.json`. */
export interface MerchandisingConfig {
  /** Name of the single featured collection, e.g. "Neon Series". */
  featuredCollection?: unknown;
}

export const MERCHANDISING_CONFIG_URL = "/merchandising.json";

/**
 * Resolve the config against the catalog. Returns exactly one collection, or
 * null when the config is missing, malformed, or names an unknown collection.
 */
export function resolveFeaturedCollection(
  config: MerchandisingConfig | null | undefined,
  collections: Collection[] = getCollections(),
): Collection | null {
  const name = config?.featuredCollection;
  if (typeof name !== "string" || name.trim() === "") return null;
  const match = collections.find((c) => c.collection === name.trim());
  if (!match) {
    console.warn(`[featured] "${name}" is not a known collection; nothing is featured.`);
    return null;
  }
  return match;
}

/** Fetch the runtime config (uncached) and resolve the featured collection. */
export async function loadFeaturedCollection(
  url: string = MERCHANDISING_CONFIG_URL,
  fetchImpl: typeof fetch = fetch,
): Promise<Collection | null> {
  try {
    const res = await fetchImpl(url, { cache: "no-store" });
    if (!res.ok) return null;
    return resolveFeaturedCollection((await res.json()) as MerchandisingConfig);
  } catch {
    return null;
  }
}

/** True when the item belongs to the current featured collection. */
export function isFeaturedItem(
  item: MarketItem,
  featured: Collection | null,
): boolean {
  return featured !== null && item.collection === featured.collection;
}

/**
 * React hook exposing the current featured collection to the storefront.
 * `featured` is null while loading or when nothing is (validly) featured.
 */
export function useFeaturedCollection(): {
  featured: Collection | null;
  loading: boolean;
} {
  const [state, setState] = useState<{ featured: Collection | null; loading: boolean }>({
    featured: null,
    loading: true,
  });
  useEffect(() => {
    let cancelled = false;
    loadFeaturedCollection().then((featured) => {
      if (!cancelled) setState({ featured, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}
