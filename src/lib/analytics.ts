export type Row = Record<string, unknown>;

export type ColumnType = "number" | "date" | "text";

export interface ColumnInfo {
  name: string;
  type: ColumnType;
  missing: number;
  unique: number;
  sum?: number;
  avg?: number;
  min?: number;
  max?: number;
}

export function detectColumns(rows: Row[]): ColumnInfo[] {
  if (!rows.length) return [];
  const keys = Object.keys(rows[0]);
  return keys.map((name) => {
    const values = rows.map((r) => r[name]);
    const nonEmpty = values.filter((v) => v !== null && v !== undefined && v !== "");
    const missing = rows.length - nonEmpty.length;
    const unique = new Set(nonEmpty.map((v) => String(v))).size;

    const nums = nonEmpty
      .map((v) => (typeof v === "number" ? v : Number(v)))
      .filter((n) => Number.isFinite(n));
    const isNumeric = nums.length > 0 && nums.length / nonEmpty.length >= 0.8;

    if (isNumeric) {
      const sum = nums.reduce((a, b) => a + b, 0);
      return {
        name, type: "number" as const, missing, unique,
        sum, avg: sum / nums.length, min: Math.min(...nums), max: Math.max(...nums),
      };
    }
    const dates = nonEmpty.filter((v) => !isNaN(Date.parse(String(v))));
    const isDate = dates.length / nonEmpty.length >= 0.8 && typeof nonEmpty[0] !== "number";
    return { name, type: isDate ? "date" : "text", missing, unique };
  });
}

export function aggregateByCategory(rows: Row[], categoryCol: string, valueCol: string, limit = 8) {
  const map = new Map<string, number>();
  for (const r of rows) {
    const k = String(r[categoryCol] ?? "—");
    const v = Number(r[valueCol]);
    if (!Number.isFinite(v)) continue;
    map.set(k, (map.get(k) ?? 0) + v);
  }
  const arr = [...map.entries()].map(([name, value]) => ({ name, value }));
  arr.sort((a, b) => b.value - a.value);
  return arr.slice(0, limit);
}

export function trendSeries(rows: Row[], xCol: string, yCol: string, limit = 30) {
  const data = rows
    .map((r) => ({ name: String(r[xCol] ?? ""), value: Number(r[yCol]) }))
    .filter((d) => Number.isFinite(d.value));
  return data.slice(0, limit);
}

export function fmtNum(n: number | undefined) {
  if (n === undefined || !Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Number.isInteger(n) ? n.toString() : n.toFixed(2);
}
