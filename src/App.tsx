import { NavLink, Route, Routes } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

export default function App() {
  return (
    <div className="app">
      <header className="nav">
        <div className="container nav-inner">
          <NavLink to="/" className="brand">
            <span className="brand-logo"><BarChart3 size={18} /></span>
            Sheetly
          </NavLink>
          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/dashboard" className="btn primary" style={{ marginLeft: 8 }}>
              Launch App
            </NavLink>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} Sheetly — Excel Automation & Reporting Tool. Built for portfolio showcase.
        </div>
      </footer>
    </div>
  );
}
