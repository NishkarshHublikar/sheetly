import { Link } from "@tanstack/react-router";
import {
  Upload, BarChart3, FileSpreadsheet, Download, Zap, ShieldCheck, LineChart, PieChart, Sparkles,
} from "lucide-react";

export default function Landing() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="badge"><Sparkles size={14} /> Excel Automation • Data Analysis • BI Reporting</span>
          <h1>
            Turn spreadsheets into <span className="grad">insights & reports</span> in seconds.
          </h1>
          <p>
            Upload any Excel or CSV file. Sheetly automatically analyzes columns, computes KPIs,
            builds interactive charts, and exports polished reports for your business.
          </p>
          <div className="hero-cta">
            <Link to="/dashboard" className="btn primary"><Upload size={16} /> Upload your file</Link>
            <Link to="/about" className="btn">Learn more</Link>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <h2 className="section-title">Everything you need to analyze a spreadsheet</h2>
          <p className="section-sub">Built for analysts, freelancers, and small business teams.</p>
          <div className="features">
            {features.map((f) => (
              <div className="feature" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "white", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center" }}>
            <div>
              <h2 className="section-title">From raw data to a board-ready report</h2>
              <p className="section-sub">
                Drop your sales, inventory, marketing, or financial spreadsheet and Sheetly
                produces a clean dashboard plus downloadable Excel, CSV, and PDF reports.
              </p>
              <ul style={{ color: "var(--text-muted)", lineHeight: 1.9, paddingLeft: 18 }}>
                <li>Automatic column detection (numeric / text / date)</li>
                <li>KPI cards, sortable tables, search & filter</li>
                <li>Bar, line and pie charts generated on the fly</li>
                <li>One-click export to Excel, CSV and PDF</li>
              </ul>
              <Link to="/dashboard" className="btn primary" style={{ marginTop: 14 }}>
                <Zap size={16} /> Try with sample data
              </Link>
            </div>
            <div className="card">
              <div className="kpi-grid" style={{ marginBottom: 14 }}>
                <div className="kpi"><div className="label">Revenue</div><div className="value">$284K</div><div className="delta">+12.4%</div></div>
                <div className="kpi"><div className="label">Orders</div><div className="value">3,418</div><div className="delta">+5.1%</div></div>
                <div className="kpi"><div className="label">Avg Order</div><div className="value">$83.10</div><div className="delta">+2.0%</div></div>
              </div>
              <div className="card" style={{ padding: 12 }}>
                <div className="card-title" style={{ marginBottom: 8 }}>Monthly Revenue</div>
                <div style={{ height: 8, borderRadius: 999, background: "linear-gradient(90deg, var(--primary), var(--accent))" }} />
                <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                  {[40, 65, 50, 80, 70, 95, 88].map((h, i) => (
                    <div key={i} style={{
                      flex: 1, height: h, background: "linear-gradient(180deg, var(--primary), var(--primary-2))",
                      borderRadius: 6, opacity: 0.9
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">Ready to automate your reporting?</h2>
          <p className="section-sub">No signup required — runs entirely in your browser.</p>
          <Link to="/dashboard" className="btn primary"><Upload size={16} /> Get started</Link>
        </div>
      </section>
    </>
  );
}

const features = [
  { icon: <Upload size={20} />, title: "Drag & drop upload", desc: "Accepts .xlsx and .csv files. Instant validation and preview." },
  { icon: <FileSpreadsheet size={20} />, title: "Auto column detection", desc: "Identifies numeric, text and date columns automatically." },
  { icon: <BarChart3 size={20} />, title: "KPI dashboard", desc: "Sum, average, min, max, missing values — all computed for you." },
  { icon: <LineChart size={20} />, title: "Interactive charts", desc: "Bar, line and pie charts generated from your data." },
  { icon: <PieChart size={20} />, title: "Category insights", desc: "Slice numeric metrics by category columns instantly." },
  { icon: <Download size={20} />, title: "Export anywhere", desc: "Download polished Excel, CSV and PDF reports." },
  { icon: <Zap size={20} />, title: "Sample dataset", desc: "Don't have a file? Try a built-in sales dataset." },
  { icon: <ShieldCheck size={20} />, title: "100% private", desc: "All processing happens locally in your browser." },
];
