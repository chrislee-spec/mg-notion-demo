// Mock marketplace inventory for Pulse Market.
// Each item belongs to a `collection` — the Collection View feature (PULSE-1..5)
// is built on top of this grouping.

export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface MarketItem {
  id: string;
  name: string;
  collection: string;
  rarity: Rarity;
  price: number; // in USD
  hue: number; // 0-360, used for the placeholder art gradient
}

export const items: MarketItem[] = [
  { id: "itm_001", name: "Aurora Blade", collection: "Genesis", rarity: "Legendary", price: 240.0, hue: 280 },
  { id: "itm_002", name: "Genesis Visor", collection: "Genesis", rarity: "Epic", price: 88.5, hue: 300 },
  { id: "itm_003", name: "Founders Coin", collection: "Genesis", rarity: "Rare", price: 32.0, hue: 320 },
  { id: "itm_004", name: "Neon Wraith", collection: "Neon Series", rarity: "Legendary", price: 199.99, hue: 190 },
  { id: "itm_005", name: "Pulse Glove", collection: "Neon Series", rarity: "Epic", price: 64.0, hue: 170 },
  { id: "itm_006", name: "Circuit Mask", collection: "Neon Series", rarity: "Rare", price: 27.5, hue: 150 },
  { id: "itm_007", name: "Voxel Crate", collection: "Neon Series", rarity: "Common", price: 6.0, hue: 130 },
  { id: "itm_008", name: "Ember Wrap", collection: "Founders Pack", rarity: "Epic", price: 72.0, hue: 20 },
  { id: "itm_009", name: "Molten Sigil", collection: "Founders Pack", rarity: "Rare", price: 41.0, hue: 35 },
  { id: "itm_010", name: "Ash Token", collection: "Founders Pack", rarity: "Common", price: 4.5, hue: 50 },
  { id: "itm_011", name: "Tidal Skin", collection: "Pulse Originals", rarity: "Epic", price: 59.0, hue: 210 },
  { id: "itm_012", name: "Deep Current", collection: "Pulse Originals", rarity: "Rare", price: 22.0, hue: 230 },
];
