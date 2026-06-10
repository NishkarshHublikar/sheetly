import { useCallback, useMemo, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  Upload, FileSpreadsheet, Sparkles, Download, FileText, X, Search,
  ArrowUpDown, BarChart3, LineChart as LineIcon, PieChart as PieIcon,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  type ColumnInfo, type Row, detectColumns, aggregateByCategory, trendSeries, fmtNum,
} from "../lib/analytics";
import { generateSampleData } from "../lib/sample";
import { exportCSV, exportExcel, exportPDF } from "../lib/exporters";

const MAX_SIZE_MB = 10;
const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6"];

export default function Dashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{ col: string; dir: "asc" | "desc" } | null>(null);
  const [chartTab, setChartTab] = useState<"bar" | "line" | "pie">("bar");
  const [categoryCol, setCategoryCol] = useState<string>("");
  const [valueCol, setValueCol] = useState<string>("");
  const [trendXCol, setTrendXCol] = useState<string>("");

  const columns = useMemo(() => detectColumns(rows), [rows]);
  const numericCols = useMemo(() => columns.filter((c) => c.type === "number"), [columns]);
  const categoricalCols = useMemo(() => columns.filter((c) => c.type !== "number"), [columns]);

  // Default selections
  useMemo(() => {
    if (!rows.length) return;
    if (!categoryCol && categoricalCols[0]) setCategoryCol(categoricalCols[0].name);
    if (!valueCol && numericCols[0]) setValueCol(numericCols[0].name);
    if (!trendXCol && columns[0]) setTrendXCol(columns[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const handleFile = useCallback(async (file: File) => {
    setError("");
    const name = file.name.toLowerCase();
    if (!name.endsWith(".xlsx") && !name.endsWith(".csv") && !name.endsWith(".xls")) {
      setError("Unsupported file type. Please upload .xlsx, .xls, or .csv");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File too large. Max ${MAX_SIZE_MB} MB.`);
      return;
    }
    setLoading(true);
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<Row>(sheet, { defval: null });
      if (!json.length) {
        setError("The file appears to be empty.");
        return;
      }
      setRows(json);
      setFileName(file.name);
      setFileSize(file.size);
      setSort(null); setSearch("");
      setCategoryCol(""); setValueCol(""); setTrendXCol("");
    } catch (e) {
      console.error(e);
      setError("Failed to parse the file. Please check the format.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSample = () => {
    setLoading(true);
    setTimeout(() => {
      const data = generateSampleData(220);
      setRows(data);
      setFileName("sample-sales-2024.xlsx");
      setFileSize(JSON.stringify(data).length);
      setSort(null); setSearch("");
      setCategoryCol(""); setValueCol(""); setTrendXCol("");
      setLoading(false);
    }, 400);
  };

  const reset = () => {
    setRows([]); setFileName(""); setFileSize(0); setError("");
    setCategoryCol(""); setValueCol(""); setTrendXCol("");
  };

  // Filtered + sorted rows
  const filteredRows = useMemo(() => {
    let out = rows;
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter((r) => Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q)));
    }
    if (sort) {
      const { col, dir } = sort;
      out = [...out].sort((a, b) => {
        const av = a[col], bv = b[col];
        const an = Number(av), bn = Number(bv);
        if (Number.isFinite(an) && Number.isFinite(bn)) return dir === "asc" ? an - bn : bn - an;
        return dir === "asc"
          ? String(av ?? "").localeCompare(String(bv ?? ""))
          : String(bv ?? "").localeCompare(String(av ?? ""));
      });
    }
    return out;
  }, [rows, search, sort]);

  const visibleRows = filteredRows.slice(0, 100);

  const toggleSort = (col: string) => {
    setSort((s) => s?.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "asc" });
  };

  // ====== EMPTY STATE ======
  if (!rows.length) {
    return (
      <section className="block">
        <div className="container">
          <h1 className="section-title">Upload your spreadsheet</h1>
          <p className="section-sub">Drag & drop a .xlsx or .csv file — or try the built-in sample dataset.</p>

          <div
            className={`dropzone ${dragOver ? "active" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault(); setDragOver(false);
              const f = e.dataTransfer.files?.[0]; if (f) handleFile(f);
            }}
          >
            <div className="feature-icon" style={{ margin: "0 auto" }}><Upload size={22} /></div>
            <h3>{loading ? "Processing..." : "Drop your file here"}</h3>
            <p>Accepts .xlsx, .xls and .csv • up to {MAX_SIZE_MB} MB</p>
            <div className="row" style={{ justifyContent: "center", marginTop: 18 }}>
              <button className="btn primary" onClick={() => inputRef.current?.click()} disabled={loading}>
                {loading ? <span className="spinner" /> : <Upload size={16} />} Choose file
              </button>
              <button className="btn" onClick={loadSample} disabled={loading}>
                <Sparkles size={16} /> Try sample data
              </button>
            </div>
            <input
              ref={inputRef} type="file" accept=".xlsx,.xls,.csv" hidden
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
          </div>

          {error && <div className="alert error" style={{ marginTop: 16 }}>{error}</div>}
        </div>
      </section>
    );
  }

  // ====== DASHBOARD ======
  const totalRows = rows.length;
  const totalCols = columns.length;
  const totalMissing = columns.reduce((a, c) => a + c.missing, 0);
  const totalNumeric = numericCols.length;

  const categoryData =
    categoryCol && valueCol ? aggregateByCategory(rows, categoryCol, valueCol, 8) : [];
  const trend = trendXCol && valueCol ? trendSeries(rows, trendXCol, valueCol, 30) : [];

  return (
    <section className="block">
      <div className="container">
        {/* Header */}
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <h1 className="section-title" style={{ marginBottom: 4 }}>Analytics Dashboard</h1>
            <div className="row" style={{ gap: 8 }}>
              <span className="file-pill" style={{ marginTop: 0 }}>
                <FileSpreadsheet size={14} /> {fileName}
                <span style={{ color: "var(--text-muted)" }}>• {(fileSize / 1024).toFixed(1)} KB</span>
                <button className="btn ghost" style={{ padding: 4 }} onClick={reset} title="Clear"><X size={14} /></button>
              </span>
            </div>
          </div>
          <div className="row">
            <button className="btn" onClick={() => exportCSV(rows, fileName.replace(/\.[^.]+$/, "") + ".csv")}>
              <Download size={16} /> CSV
            </button>
            <button className="btn" onClick={() => exportExcel(rows, fileName.replace(/\.[^.]+$/, "") + ".xlsx")}>
              <Download size={16} /> Excel
            </button>
            <button className="btn primary"
              onClick={() => exportPDF({
                title: "Sheetly Report — " + fileName, columns, rows,
                filename: fileName.replace(/\.[^.]+$/, "") + ".pdf",
              })}>
              <FileText size={16} /> PDF Report
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="kpi-grid" style={{ marginBottom: 18 }}>
          <Kpi label="Total Records" value={fmtNum(totalRows)} />
          <Kpi label="Columns Detected" value={String(totalCols)} />
          <Kpi label="Numeric Columns" value={String(totalNumeric)} />
          <Kpi label="Missing Values" value={fmtNum(totalMissing)} />
        </div>

        {/* Numeric summary */}
        {numericCols.length > 0 && (
          <div className="card" style={{ marginBottom: 18 }}>
            <div className="card-header">
              <div className="card-title">Numeric Column Summary</div>
              <span className="chip">{numericCols.length} numeric</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Column</th><th>Sum</th><th>Average</th><th>Min</th><th>Max</th><th>Missing</th><th>Unique</th>
                  </tr>
                </thead>
                <tbody>
                  {numericCols.map((c) => (
                    <tr key={c.name}>
                      <td><strong>{c.name}</strong></td>
                      <td>{fmtNum(c.sum)}</td>
                      <td>{fmtNum(c.avg)}</td>
                      <td>{fmtNum(c.min)}</td>
                      <td>{fmtNum(c.max)}</td>
                      <td>{c.missing}</td>
                      <td>{c.unique}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Chart controls */}
        <div className="card" style={{ marginBottom: 18 }}>
          <div className="card-header" style={{ flexWrap: "wrap", gap: 12 }}>
            <div className="row">
              <div className="tabs">
                <button className={`tab ${chartTab === "bar" ? "active" : ""}`} onClick={() => setChartTab("bar")}>
                  <BarChart3 size={14} /> Bar
                </button>
                <button className={`tab ${chartTab === "line" ? "active" : ""}`} onClick={() => setChartTab("line")}>
                  <LineIcon size={14} /> Line
                </button>
                <button className={`tab ${chartTab === "pie" ? "active" : ""}`} onClick={() => setChartTab("pie")}>
                  <PieIcon size={14} /> Pie
                </button>
              </div>
            </div>
            <div className="row">
              {chartTab === "line" ? (
                <Select label="X axis" value={trendXCol} onChange={setTrendXCol} options={columns.map((c) => c.name)} />
              ) : (
                <Select label="Category" value={categoryCol} onChange={setCategoryCol} options={categoricalCols.map((c) => c.name)} />
              )}
              <Select label="Value" value={valueCol} onChange={setValueCol} options={numericCols.map((c) => c.name)} />
            </div>
          </div>

          <div style={{ width: "100%", height: 340 }}>
            {chartTab === "bar" && categoryData.length > 0 && (
              <ResponsiveContainer>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
            {chartTab === "line" && trend.length > 0 && (
              <ResponsiveContainer>
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eef2f7" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
            {chartTab === "pie" && categoryData.length > 0 && (
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={120} label>
                    {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip /><Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
            {((chartTab !== "line" && categoryData.length === 0) ||
              (chartTab === "line" && trend.length === 0)) && (
              <div className="alert info" style={{ marginTop: 8 }}>
                Select a category and a numeric value column to render the chart.
              </div>
            )}
          </div>
        </div>

        {/* Data table */}
        <div className="card">
          <div className="card-header" style={{ flexWrap: "wrap", gap: 12 }}>
            <div className="card-title">Data Preview</div>
            <div className="row">
              <span className="chip num">{filteredRows.length} rows</span>
              <div className="row" style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 10, color: "var(--text-muted)" }} />
                <input className="input" placeholder="Search rows..." value={search}
                  onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft: 30 }} />
              </div>
            </div>
          </div>
          <div className="table-wrap" style={{ maxHeight: 480 }}>
            <table>
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c.name} onClick={() => toggleSort(c.name)}>
                      <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                        {c.name}
                        <span className="chip" style={{ padding: "1px 6px", fontSize: 10 }}>{c.type}</span>
                        <ArrowUpDown size={12} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r, i) => (
                  <tr key={i}>
                    {columns.map((c) => <td key={c.name}>{String(r[c.name] ?? "")}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredRows.length > visibleRows.length && (
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8 }}>
              Showing first {visibleRows.length} of {filteredRows.length} rows. Export to view all.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="kpi">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label style={{ display: "inline-flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--text-muted)" }}>
      {label}:
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
