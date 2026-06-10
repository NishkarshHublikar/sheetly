import { Link, Outlet } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

export default function App() {
  return (
    <div className="app">
      <header className="nav">
        <div className="container nav-inner">
          <Link to="/" className="brand">
            <span className="brand-logo"><BarChart3 size={18} /></span>
            Sheetly
          </Link>
          <nav className="nav-links">
            <Link to="/" activeProps={{ className: "active" }}>Home</Link>
            <Link to="/dashboard" activeProps={{ className: "active" }}>Dashboard</Link>
            <Link to="/about" activeProps={{ className: "active" }}>About</Link>
            <Link to="/dashboard" className="btn primary" style={{ marginLeft: 8 }} activeProps={{}}>
              Launch App
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* TanStack router renders the matched route here */}
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} Sheetly — Excel Automation & Reporting Tool. Built for portfolio showcase.
        </div>
      </footer>
    </div>
  );
}
