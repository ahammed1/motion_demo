import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="about-image reveal">
        <div className="portrait-frame"><div className="portrait-orb" /><div className="portrait-ring" /><span className="portrait-label mono">FIG. 01 — PRACTICE IN MOTION</span><span className="portrait-coordinate mono">51°30' N / 00°07' W</span></div>
      </div>
      <div className="about-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line" /> A LITTLE ABOUT THE MAKER</p>
        <h2>Hey, I'm<br /><em>Noor.</em></h2>
        <p className="about-lead">I build images that make you pause for half a second longer.</p>
        <p className="about-body">An independent 3D motion designer and visual artist working at the intersection of instinct and intention. I collaborate with thoughtful brands and kind people to make work that feels as good as it looks.</p>
        <div className="about-facts"><div><span className="mono">EXPERIENCE</span><strong>8+ years in motion</strong></div><div><span className="mono">ALWAYS REACHING FOR</span><strong>Blender · C4D · Houdini · AE</strong></div><div><span className="mono">CURRENTLY INTO</span><strong>Strange materials &amp; soft light</strong></div></div>
        <a className="text-link" href="#contact">LET'S MAKE SOMETHING <ArrowUpRight size={14} /></a>
      </div>
    </section>
  );
}
