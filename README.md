# Sheetly — Excel Automation & Reporting Tool

A modern, portfolio-grade React + TypeScript web application that lets businesses
upload Excel / CSV files and instantly generates summaries, analytics dashboards,
and downloadable reports (Excel / CSV / PDF).

## ✨ Features

- **File Upload** — drag & drop `.xlsx`, `.xls`, `.csv` (with validation, size limit, errors).
- **Auto Data Processing** — column type detection (numeric / date / text), sum, average, min, max, missing values, unique counts.
- **Analytics Dashboard** — KPI cards, sortable & searchable data table, column type chips.
- **Interactive Charts** — Bar, Line, and Pie charts (Recharts) with dynamic column selectors.
- **Multi-format Reporting** — export to **Excel**, **CSV** and a polished **PDF** report (summary + data preview).
- **Sample Dataset** — try the app instantly with a generated sales dataset (no upload needed).
- **Landing Page** — attractive SaaS-style hero, feature grid, and CTA sections.
- **About Page** — business use cases (Sales / Operations / Finance / Client reporting) and tech stack.
- **Responsive** — works great on desktop and mobile.
- **Privacy-first** — all processing happens locally in the browser.

## 🧱 Tech Stack

- React 18 + TypeScript
- Vite (Build Tool)
- **TanStack Router** (Type-safe file-based routing)
- **Tailwind CSS v4** (via `@tailwindcss/vite`) + Custom SaaS CSS Architecture
- Recharts (Interactive charts)
- SheetJS / `xlsx` (Excel & CSV parsing)
- jsPDF + jspdf-autotable (PDF reporting)
- Lucide Icons

## 🚀 Getting Started

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

Open `http://localhost:8080` (or the port provided in your terminal) in your browser.

## ☁️ Deployment

Sheetly is ready to be deployed to modern hosting providers like **Vercel**, **Netlify**, or **Cloudflare Pages**. 

### Deploying to GitHub & Vercel

1. **Push to GitHub**:
   Initialize a repository and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/sheetly.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com/) and sign in.
   - Click **Add New Project** and import your `sheetly` GitHub repository.
   - Vercel will automatically detect the **Vite** framework.
   - Confirm the default build settings:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **Deploy**. Your app will be live with a secure HTTPS URL in minutes!

## 📁 Project Structure

```
src/
├── routes/
│   ├── __root.tsx           # Main application layout wrapper
│   ├── index.tsx            # Home / Landing route
│   ├── dashboard.tsx        # Upload + analytics dashboard route
│   └── about.tsx            # About / use cases route
├── pages/
│   ├── Landing.tsx          # Landing page UI component
│   ├── Dashboard.tsx        # Dashboard UI component
│   └── About.tsx            # About UI component
├── lib/
│   ├── analytics.ts         # Column detection + aggregations
│   ├── sample.ts            # Built-in sample dataset generator
│   └── exporters.ts         # Excel / CSV / PDF export helpers
├── router.tsx               # TanStack Router initialization
├── routeTree.gen.ts         # Auto-generated routing tree
└── styles.css               # Global design system & Tailwind config
```

## 🧑‍💼 Business Use Cases

- **Sales reporting** — revenue, AOV, top categories, trends.
- **Operations analytics** — inventory, logistics, production summaries.
- **Finance summaries** — expenses / transactions to stakeholder-ready PDFs.
- **Client reporting** — freelancers transform raw client data into branded reports.

## 📜 License

MIT — feel free to use as a portfolio piece or starting point for client work.
