import type { MarketItem } from "../data/items";

const rarityColor: Record<string, string> = {
  Common: "#8b9bb4",
  Rare: "#3b82f6",
  Epic: "#a855f7",
  Legendary: "#f59e0b",
};

export function ItemCard({ item }: { item: MarketItem }) {
  return (
    <div className="card">
      <div
        className="card-art"
        style={{
          background: `linear-gradient(135deg, hsl(${item.hue} 70% 55%), hsl(${
            item.hue + 40
          } 70% 35%))`,
        }}
      />
      <div className="card-body">
        <div className="card-row">
          <span className="card-name">{item.name}</span>
          <span className="card-price">${item.price.toFixed(2)}</span>
        </div>
        <div className="card-row">
          <span className="card-collection">{item.collection}</span>
          <span className="rarity" style={{ color: rarityColor[item.rarity] }}>
            {item.rarity}
          </span>
        </div>
      </div>
    </div>
  );
}
