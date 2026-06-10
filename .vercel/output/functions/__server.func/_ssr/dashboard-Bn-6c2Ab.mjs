import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { r as readSync, u as utils, w as writeFileSync } from "../_libs/xlsx.mjs";
import { s as saveAs } from "../_libs/file-saver.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import { a as autoTable } from "../_libs/jspdf-autotable.mjs";
import { U as Upload, S as Sparkles, F as FileSpreadsheet, X, D as Download, a as FileText, C as ChartColumn, b as ChartLine, c as ChartPie, d as Search, A as ArrowUpDown } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, L as LineChart, b as Line, P as PieChart, c as Pie, d as Cell, e as Legend } from "../_libs/recharts.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function detectColumns(rows) {
  if (!rows.length) return [];
  const keys = Object.keys(rows[0]);
  return keys.map((name) => {
    const values = rows.map((r) => r[name]);
    const nonEmpty = values.filter((v) => v !== null && v !== void 0 && v !== "");
    const missing = rows.length - nonEmpty.length;
    const unique = new Set(nonEmpty.map((v) => String(v))).size;
    const nums = nonEmpty.map((v) => typeof v === "number" ? v : Number(v)).filter((n) => Number.isFinite(n));
    const isNumeric = nums.length > 0 && nums.length / nonEmpty.length >= 0.8;
    if (isNumeric) {
      const sum = nums.reduce((a, b) => a + b, 0);
      return {
        name,
        type: "number",
        missing,
        unique,
        sum,
        avg: sum / nums.length,
        min: Math.min(...nums),
        max: Math.max(...nums)
      };
    }
    const dates = nonEmpty.filter((v) => !isNaN(Date.parse(String(v))));
    const isDate = dates.length / nonEmpty.length >= 0.8 && typeof nonEmpty[0] !== "number";
    return { name, type: isDate ? "date" : "text", missing, unique };
  });
}
function aggregateByCategory(rows, categoryCol, valueCol, limit = 8) {
  const map = /* @__PURE__ */ new Map();
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
function trendSeries(rows, xCol, yCol, limit = 30) {
  const data = rows.map((r) => ({ name: String(r[xCol] ?? ""), value: Number(r[yCol]) })).filter((d) => Number.isFinite(d.value));
  return data.slice(0, limit);
}
function fmtNum(n) {
  if (n === void 0 || !Number.isFinite(n)) return "—";
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return Number.isInteger(n) ? n.toString() : n.toFixed(2);
}
const categories = ["Electronics", "Apparel", "Home", "Beauty", "Sports", "Books"];
const regions = ["North", "South", "East", "West"];
const channels = ["Online", "Retail", "Wholesale"];
function generateSampleData(n = 200) {
  const rows = [];
  const start = new Date(2024, 0, 1).getTime();
  for (let i = 0; i < n; i++) {
    const d = new Date(start + Math.random() * 1e3 * 60 * 60 * 24 * 300);
    const qty = 1 + Math.floor(Math.random() * 20);
    const price = +(10 + Math.random() * 240).toFixed(2);
    rows.push({
      OrderID: 1e4 + i,
      Date: d.toISOString().slice(0, 10),
      Category: categories[Math.floor(Math.random() * categories.length)],
      Region: regions[Math.floor(Math.random() * regions.length)],
      Channel: channels[Math.floor(Math.random() * channels.length)],
      Quantity: qty,
      UnitPrice: price,
      Revenue: +(qty * price).toFixed(2),
      Discount: +(Math.random() * 0.3).toFixed(2)
    });
  }
  return rows;
}
function exportExcel(rows, filename = "report.xlsx") {
  const ws = utils.json_to_sheet(rows);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  writeFileSync(wb, filename);
}
function exportCSV(rows, filename = "report.csv") {
  const ws = utils.json_to_sheet(rows);
  const csv = utils.sheet_to_csv(ws);
  saveAs(new Blob([csv], { type: "text/csv;charset=utf-8" }), filename);
}
function exportPDF(opts) {
  const { title, columns, rows, filename = "report.pdf" } = opts;
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text(title, 14, 18);
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated by Sheetly • ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 14, 25);
  const numericCols = columns.filter((c) => c.type === "number");
  const summary = numericCols.map((c) => [
    c.name,
    fmtNum(c.sum),
    fmtNum(c.avg),
    fmtNum(c.min),
    fmtNum(c.max),
    String(c.missing)
  ]);
  autoTable(doc, {
    startY: 32,
    head: [["Column", "Sum", "Avg", "Min", "Max", "Missing"]],
    body: summary.length ? summary : [["No numeric columns detected", "", "", "", "", ""]],
    headStyles: { fillColor: [99, 102, 241] },
    styles: { fontSize: 9 }
  });
  const previewRows = rows.slice(0, 30);
  const keys = columns.map((c) => c.name);
  const body = previewRows.map((r) => keys.map((k) => String(r[k] ?? "")));
  const startY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(`Data Preview (showing ${previewRows.length} of ${rows.length} rows)`, 14, startY);
  autoTable(doc, {
    startY: startY + 4,
    head: [keys],
    body,
    headStyles: { fillColor: [139, 92, 246] },
    styles: { fontSize: 8, cellPadding: 2 }
  });
  doc.save(filename);
}
const MAX_SIZE_MB = 10;
const COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#14b8a6"];
function Dashboard() {
  const [rows, setRows] = reactExports.useState([]);
  const [fileName, setFileName] = reactExports.useState("");
  const [fileSize, setFileSize] = reactExports.useState(0);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const [search, setSearch] = reactExports.useState("");
  const [sort, setSort] = reactExports.useState(null);
  const [chartTab, setChartTab] = reactExports.useState("bar");
  const [categoryCol, setCategoryCol] = reactExports.useState("");
  const [valueCol, setValueCol] = reactExports.useState("");
  const [trendXCol, setTrendXCol] = reactExports.useState("");
  const columns = reactExports.useMemo(() => detectColumns(rows), [rows]);
  const numericCols = reactExports.useMemo(() => columns.filter((c) => c.type === "number"), [columns]);
  const categoricalCols = reactExports.useMemo(() => columns.filter((c) => c.type !== "number"), [columns]);
  reactExports.useMemo(() => {
    if (!rows.length) return;
    if (!categoryCol && categoricalCols[0]) setCategoryCol(categoricalCols[0].name);
    if (!valueCol && numericCols[0]) setValueCol(numericCols[0].name);
    if (!trendXCol && columns[0]) setTrendXCol(columns[0].name);
  }, [rows]);
  const handleFile = reactExports.useCallback(async (file) => {
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
      const wb = readSync(buf, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const json = utils.sheet_to_json(sheet, { defval: null });
      if (!json.length) {
        setError("The file appears to be empty.");
        return;
      }
      setRows(json);
      setFileName(file.name);
      setFileSize(file.size);
      setSort(null);
      setSearch("");
      setCategoryCol("");
      setValueCol("");
      setTrendXCol("");
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
      setSort(null);
      setSearch("");
      setCategoryCol("");
      setValueCol("");
      setTrendXCol("");
      setLoading(false);
    }, 400);
  };
  const reset = () => {
    setRows([]);
    setFileName("");
    setFileSize(0);
    setError("");
    setCategoryCol("");
    setValueCol("");
    setTrendXCol("");
  };
  const filteredRows = reactExports.useMemo(() => {
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
        return dir === "asc" ? String(av ?? "").localeCompare(String(bv ?? "")) : String(bv ?? "").localeCompare(String(av ?? ""));
      });
    }
    return out;
  }, [rows, search, sort]);
  const visibleRows = filteredRows.slice(0, 100);
  const toggleSort = (col) => {
    setSort((s) => s?.col === col ? { col, dir: s.dir === "asc" ? "desc" : "asc" } : { col, dir: "asc" });
  };
  if (!rows.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-title", children: "Upload your spreadsheet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-sub", children: "Drag & drop a .xlsx or .csv file — or try the built-in sample dataset." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `dropzone ${dragOver ? "active" : ""}`,
          onDragOver: (e) => {
            e.preventDefault();
            setDragOver(true);
          },
          onDragLeave: () => setDragOver(false),
          onDrop: (e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) handleFile(f);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", style: { margin: "0 auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 22 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: loading ? "Processing..." : "Drop your file here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Accepts .xlsx, .xls and .csv • up to ",
              MAX_SIZE_MB,
              " MB"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "center", marginTop: 18 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn primary", onClick: () => inputRef.current?.click(), disabled: loading, children: [
                loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "spinner" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
                " Choose file"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: loadSample, disabled: loading, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 16 }),
                " Try sample data"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                type: "file",
                accept: ".xlsx,.xls,.csv",
                hidden: true,
                onChange: (e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }
              }
            )
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "alert error", style: { marginTop: 16 }, children: error })
    ] }) });
  }
  const totalRows = rows.length;
  const totalCols = columns.length;
  const totalMissing = columns.reduce((a, c) => a + c.missing, 0);
  const totalNumeric = numericCols.length;
  const categoryData = categoryCol && valueCol ? aggregateByCategory(rows, categoryCol, valueCol, 8) : [];
  const trend = trendXCol && valueCol ? trendSeries(rows, trendXCol, valueCol, 30) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { justifyContent: "space-between", marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-title", style: { marginBottom: 4 }, children: "Analytics Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", style: { gap: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "file-pill", style: { marginTop: 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { size: 14 }),
          " ",
          fileName,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "var(--text-muted)" }, children: [
            "• ",
            (fileSize / 1024).toFixed(1),
            " KB"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn ghost", style: { padding: 4 }, onClick: reset, title: "Clear", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: () => exportCSV(rows, fileName.replace(/\.[^.]+$/, "") + ".csv"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
          " CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "btn", onClick: () => exportExcel(rows, fileName.replace(/\.[^.]+$/, "") + ".xlsx"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
          " Excel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "btn primary",
            onClick: () => exportPDF({
              title: "Sheetly Report — " + fileName,
              columns,
              rows,
              filename: fileName.replace(/\.[^.]+$/, "") + ".pdf"
            }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 16 }),
              " PDF Report"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kpi-grid", style: { marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Total Records", value: fmtNum(totalRows) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Columns Detected", value: String(totalCols) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Numeric Columns", value: String(totalNumeric) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kpi, { label: "Missing Values", value: fmtNum(totalMissing) })
    ] }),
    numericCols.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-title", children: "Numeric Column Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chip", children: [
          numericCols.length,
          " numeric"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Column" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Sum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Average" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Min" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Max" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Missing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Unique" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: numericCols.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: c.name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: fmtNum(c.sum) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: fmtNum(c.avg) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: fmtNum(c.min) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: fmtNum(c.max) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: c.missing }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: c.unique })
        ] }, c.name)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", style: { flexWrap: "wrap", gap: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "row", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `tab ${chartTab === "bar" ? "active" : ""}`, onClick: () => setChartTab("bar"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 14 }),
            " Bar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `tab ${chartTab === "line" ? "active" : ""}`, onClick: () => setChartTab("line"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLine, { size: 14 }),
            " Line"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: `tab ${chartTab === "pie" ? "active" : ""}`, onClick: () => setChartTab("pie"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { size: 14 }),
            " Pie"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          chartTab === "line" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "X axis", value: trendXCol, onChange: setTrendXCol, options: columns.map((c) => c.name) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Category", value: categoryCol, onChange: setCategoryCol, options: categoricalCols.map((c) => c.name) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Value", value: valueCol, onChange: setValueCol, options: numericCols.map((c) => c.name) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", height: 340 }, children: [
        chartTab === "bar" && categoryData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: categoryData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#eef2f7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: "#6366f1", radius: [8, 8, 0, 0] })
        ] }) }),
        chartTab === "line" && trend.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trend, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#eef2f7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fontSize: 12 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "value", stroke: "#8b5cf6", strokeWidth: 2.5, dot: false })
        ] }) }),
        chartTab === "pie" && categoryData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: categoryData, dataKey: "value", nameKey: "name", outerRadius: 120, label: true, children: categoryData.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {})
        ] }) }),
        (chartTab !== "line" && categoryData.length === 0 || chartTab === "line" && trend.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "alert info", style: { marginTop: 8 }, children: "Select a category and a numeric value column to render the chart." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-header", style: { flexWrap: "wrap", gap: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-title", children: "Data Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chip num", children: [
            filteredRows.length,
            " rows"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row", style: { position: "relative" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 14, style: { position: "absolute", left: 10, color: "var(--text-muted)" } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: "input",
                placeholder: "Search rows...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                style: { paddingLeft: 30 }
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-wrap", style: { maxHeight: 480 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { onClick: () => toggleSort(c.name), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "inline-flex", gap: 6, alignItems: "center" }, children: [
          c.name,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chip", style: { padding: "1px 6px", fontSize: 10 }, children: c.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { size: 12 })
        ] }) }, c.name)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: visibleRows.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: columns.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: String(r[c.name] ?? "") }, c.name)) }, i)) })
      ] }) }),
      filteredRows.length > visibleRows.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: { color: "var(--text-muted)", fontSize: 13, marginTop: 8 }, children: [
        "Showing first ",
        visibleRows.length,
        " of ",
        filteredRows.length,
        " rows. Export to view all."
      ] })
    ] })
  ] }) });
}
function Kpi({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kpi", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "value", children: value })
  ] });
}
function Select({
  label,
  value,
  onChange,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "inline-flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--text-muted)" }, children: [
    label,
    ":",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value, onChange: (e) => onChange(e.target.value), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "—" }),
      options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o))
    ] })
  ] });
}
const SplitComponent = Dashboard;
export {
  SplitComponent as component
};
