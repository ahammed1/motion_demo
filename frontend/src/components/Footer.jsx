import { MoveUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-mark" href="#home">N<span>.</span></a>
      <span className="mono">INDEPENDENT BY NATURE · AVAILABLE WORLDWIDE</span>
      <a href="mailto:hello@noor.studio">SAY HELLO <MoveUpRight size={13} /></a>
      <span className="footer-copy mono">© NOOR STUDIO {new Date().getFullYear()}</span>
    </footer>
  );
}
