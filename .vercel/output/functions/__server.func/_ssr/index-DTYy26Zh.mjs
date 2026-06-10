import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Sparkles, U as Upload, Z as Zap, F as FileSpreadsheet, C as ChartColumn, b as ChartLine, c as ChartPie, D as Download, f as ShieldCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "hero", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "badge", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }),
        " Excel Automation • Data Analysis • BI Reporting"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { children: [
        "Turn spreadsheets into ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grad", children: "insights & reports" }),
        " in seconds."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Upload any Excel or CSV file. Sheetly automatically analyzes columns, computes KPIs, builds interactive charts, and exports polished reports for your business." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-cta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "btn primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
          " Upload your file"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "btn", children: "Learn more" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Everything you need to analyze a spreadsheet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-sub", children: "Built for analysts, freelancers, and small business teams." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "features", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: f.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: f.desc })
      ] }, f.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "block", style: { background: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid-2", style: { alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "From raw data to a board-ready report" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-sub", children: "Drop your sales, inventory, marketing, or financial spreadsheet and Sheetly produces a clean dashboard plus downloadable Excel, CSV, and PDF reports." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: { color: "var(--text-muted)", lineHeight: 1.9, paddingLeft: 18 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Automatic column detection (numeric / text / date)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "KPI cards, sortable tables, search & filter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Bar, line and pie charts generated on the fly" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "One-click export to Excel, CSV and PDF" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "btn primary", style: { marginTop: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 16 }),
          " Try with sample data"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kpi-grid", style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kpi", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label", children: "Revenue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "value", children: "$284K" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "delta", children: "+12.4%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kpi", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label", children: "Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "value", children: "3,418" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "delta", children: "+5.1%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "kpi", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "label", children: "Avg Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "value", children: "$83.10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "delta", children: "+2.0%" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { padding: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-title", style: { marginBottom: 8 }, children: "Monthly Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 8, borderRadius: 999, background: "linear-gradient(90deg, var(--primary), var(--accent))" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: 6, marginTop: 12 }, children: [40, 65, 50, 80, 70, 95, 88].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            flex: 1,
            height: h,
            background: "linear-gradient(180deg, var(--primary), var(--primary-2))",
            borderRadius: 6,
            opacity: 0.9
          } }, i)) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Ready to automate your reporting?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-sub", children: "No signup required — runs entirely in your browser." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "btn primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16 }),
        " Get started"
      ] })
    ] }) })
  ] });
}
const features = [
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 20 }), title: "Drag & drop upload", desc: "Accepts .xlsx and .csv files. Instant validation and preview." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { size: 20 }), title: "Auto column detection", desc: "Identifies numeric, text and date columns automatically." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { size: 20 }), title: "KPI dashboard", desc: "Sum, average, min, max, missing values — all computed for you." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLine, { size: 20 }), title: "Interactive charts", desc: "Bar, line and pie charts generated from your data." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartPie, { size: 20 }), title: "Category insights", desc: "Slice numeric metrics by category columns instantly." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 20 }), title: "Export anywhere", desc: "Download polished Excel, CSV and PDF reports." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 20 }), title: "Sample dataset", desc: "Don't have a file? Try a built-in sales dataset." },
  { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 20 }), title: "100% private", desc: "All processing happens locally in your browser." }
];
const SplitComponent = Landing;
export {
  SplitComponent as component
};
