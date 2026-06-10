import { Briefcase, TrendingUp, Database, FileText } from "lucide-react";

export default function About() {
  return (
    <section className="block">
      <div className="container">
        <h1 className="section-title">About Sheetly</h1>
        <p className="section-sub" style={{ maxWidth: 720 }}>
          Sheetly is a portfolio-grade web application that demonstrates end-to-end
          Excel automation, data analysis, and business reporting — all running
          client-side in modern browsers.
        </p>

        <div className="features" style={{ marginTop: 24 }}>
          <UseCase icon={<TrendingUp size={20} />} title="Sales Reporting"
            text="Upload monthly sales spreadsheets to instantly see revenue, average order value, top categories, and trend lines." />
          <UseCase icon={<Database size={20} />} title="Operations Analytics"
            text="Analyze inventory, logistics, or production CSVs. Detect missing values, outliers, and summarize by category." />
          <UseCase icon={<Briefcase size={20} />} title="Finance Summaries"
            text="Aggregate expense or transaction exports from your accounting tool and produce clean PDF summaries for stakeholders." />
          <UseCase icon={<FileText size={20} />} title="Client Reporting"
            text="Freelancers can transform raw client data into branded Excel, CSV, and PDF reports in minutes — not hours." />
        </div>

        <div className="card" style={{ marginTop: 32 }}>
          <h3 style={{ marginTop: 0 }}>Tech Stack</h3>
          <p style={{ color: "var(--text-muted)" }}>
            React 18 + TypeScript • Vite • Recharts • SheetJS (xlsx) • jsPDF • Lucide Icons.
            Modern component architecture with a clean, scalable folder structure suitable
            for production use.
          </p>
          <h3>What this project showcases</h3>
          <ul style={{ color: "var(--text-muted)", lineHeight: 1.9 }}>
            <li>Python-style data automation, implemented in TypeScript for the browser</li>
            <li>Robust file parsing, validation, and dynamic schema detection</li>
            <li>Beautiful SaaS-style UI/UX with responsive layouts</li>
            <li>Multi-format export pipeline (Excel / CSV / PDF)</li>
            <li>Production-ready code structure ideal for client engagements</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function UseCase({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
