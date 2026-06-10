import type { Row } from "./analytics";

const categories = ["Electronics", "Apparel", "Home", "Beauty", "Sports", "Books"];
const regions = ["North", "South", "East", "West"];
const channels = ["Online", "Retail", "Wholesale"];

export function generateSampleData(n = 200): Row[] {
  const rows: Row[] = [];
  const start = new Date(2024, 0, 1).getTime();
  for (let i = 0; i < n; i++) {
    const d = new Date(start + Math.random() * 1000 * 60 * 60 * 24 * 300);
    const qty = 1 + Math.floor(Math.random() * 20);
    const price = +(10 + Math.random() * 240).toFixed(2);
    rows.push({
      OrderID: 10000 + i,
      Date: d.toISOString().slice(0, 10),
      Category: categories[Math.floor(Math.random() * categories.length)],
      Region: regions[Math.floor(Math.random() * regions.length)],
      Channel: channels[Math.floor(Math.random() * channels.length)],
      Quantity: qty,
      UnitPrice: price,
      Revenue: +(qty * price).toFixed(2),
      Discount: +(Math.random() * 0.3).toFixed(2),
    });
  }
  return rows;
}
