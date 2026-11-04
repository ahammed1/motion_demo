import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar({ home = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Noor, home" onClick={closeMenu}>N<span>.</span></a>
      <span className="header-location"><i /> INDEPENDENT MOTION DESIGNER<br />BASED EVERYWHERE</span>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
        <a href={home ? "#work" : "/#work"} onClick={closeMenu}>WORK <span>01</span></a>
        <a href={home ? "#about" : "/#about"} onClick={closeMenu}>ABOUT <span>02</span></a>
        <a className="nav-contact" href={home ? "#contact" : "/#contact"} onClick={closeMenu}>LET'S TALK <ArrowUpRight size={13} /></a>
      </nav>
    </header>
  );
}
