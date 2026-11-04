import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import MagneticButton from "../components/MagneticButton.jsx";
import Scene3D from "../components3D/Scene3D.jsx";

export default function Hero({ ready = false }) {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-ambient" />
      <div className="hero-visual" aria-hidden="true">
        {ready ? <Scene3D /> : null}
      </div>
      <div className="hero-echo" aria-hidden="true">
        <div className="hero-echo-track">
          {Array.from({ length: 16 }, (_, index) => <span key={index}>Ideas in motion</span>)}
        </div>
      </div>
      <div className="hero-topline mono"><span>INDEPENDENT CREATIVE PRACTICE</span><span>3D / MOTION / IMAGE</span></div>
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> A SMALL PRACTICE FOR BIG FEELINGS <span className="eyebrow-year">— 2026</span></p>
        <h1>Noor.<br /><em>in</em> <span className="outline-word">motion.</span></h1>
        <p className="hero-description">Independent 3D Motion Designer<br />&amp; Visual Artist</p>
        <div className="hero-actions">
          <MagneticButton className="button button-primary" href="#work">EXPLORE WORK <ArrowDownRight size={15} /></MagneticButton>
          <MagneticButton className="button button-text" href="#contact">START A PROJECT <ArrowUpRight size={14} /></MagneticButton>
        </div>
      </div>
      <div className="hero-index mono"><span>01 — 04</span><span>SELECTED FRAME / NO.001</span></div>
      <a href="#work" className="scroll-cue mono"><span>SCROLL TO EXPLORE</span><ArrowDown size={13} /></a>
      <div className="hero-side-note mono">A WORLD<br />IN MOTION</div>
    </section>
  );
}
