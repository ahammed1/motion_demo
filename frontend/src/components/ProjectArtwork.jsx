export default function ProjectArtwork({ shape, className }) {
  return (
    <div className={`project-art ${className}`} aria-hidden="true">
      <div className="art-grain" />
      {shape === "sphere" && <><div className="art-light-orb" /><div className="art-orb" /><div className="art-pedestal" /></>}
      {shape === "orbit" && <><div className="art-orbit-ring ring-one" /><div className="art-orbit-ring ring-two" /><div className="art-core" /><div className="art-moon" /></>}
      {shape === "object" && <><div className="art-cube" /><div className="art-floor" /><div className="art-beam" /></>}
      {shape === "liquid" && <><div className="art-liquid-drop" /><div className="art-liquid-ring" /><div className="art-glint" /></>}
      <div className="art-caption"><span>STUDY {shape === "sphere" ? "A—01" : shape === "orbit" ? "B—02" : shape === "object" ? "C—03" : "D—04"}</span><span>NOOR / STUDIO</span></div>
      <span className="art-crosshair">+</span>
    </div>
  );
}
