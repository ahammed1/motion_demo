import { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      setLoaded(true);
      onComplete();
    }, reducedMotion ? 0 : 850);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loader ${loaded ? "loader-done" : ""}`} aria-hidden="true">
      <span className="loader-word">N<span>.</span></span>
      <div className="loader-line"><i /></div>
      <span className="loader-label">ENTERING THE STUDIO</span>
    </div>
  );
}
