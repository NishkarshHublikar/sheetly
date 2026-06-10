import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as TrendingUp, e as Database, B as Briefcase, a as FileText } from "../_libs/lucide-react.mjs";
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "section-title", children: "About Sheetly" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "section-sub", style: { maxWidth: 720 }, children: "Sheetly is a portfolio-grade web application that demonstrates end-to-end Excel automation, data analysis, and business reporting — all running client-side in modern browsers." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "features", style: { marginTop: 24 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UseCase,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 20 }),
          title: "Sales Reporting",
          text: "Upload monthly sales spreadsheets to instantly see revenue, average order value, top categories, and trend lines."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UseCase,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { size: 20 }),
          title: "Operations Analytics",
          text: "Analyze inventory, logistics, or production CSVs. Detect missing values, outliers, and summarize by category."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UseCase,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { size: 20 }),
          title: "Finance Summaries",
          text: "Aggregate expense or transaction exports from your accounting tool and produce clean PDF summaries for stakeholders."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UseCase,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { size: 20 }),
          title: "Client Reporting",
          text: "Freelancers can transform raw client data into branded Excel, CSV, and PDF reports in minutes — not hours."
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card", style: { marginTop: 32 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { marginTop: 0 }, children: "Tech Stack" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "var(--text-muted)" }, children: "React 18 + TypeScript • Vite • Recharts • SheetJS (xlsx) • jsPDF • Lucide Icons. Modern component architecture with a clean, scalable folder structure suitable for production use." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "What this project showcases" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: { color: "var(--text-muted)", lineHeight: 1.9 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Python-style data automation, implemented in TypeScript for the browser" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Robust file parsing, validation, and dynamic schema detection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Beautiful SaaS-style UI/UX with responsive layouts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Multi-format export pipeline (Excel / CSV / PDF)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Production-ready code structure ideal for client engagements" })
      ] })
    ] })
  ] }) });
}
function UseCase({ icon, title, text }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: text })
  ] });
}
const SplitComponent = About;
export {
  SplitComponent as component
};
