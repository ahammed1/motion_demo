import useMousePosition from "../hooks/useMousePosition.js";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const position = useMousePosition();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleOver = (event) => {
      setActive(Boolean(event.target.closest("a, button, input, textarea, select, label")));
    };
    window.addEventListener("pointerover", handleOver);
    return () => window.removeEventListener("pointerover", handleOver);
  }, []);

  return (
    <div
      className={`custom-cursor ${position.visible ? "cursor-visible" : ""} ${active ? "cursor-active" : ""}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      aria-hidden="true"
    ><span /></div>
  );
}
