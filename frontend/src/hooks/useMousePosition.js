import { useEffect, useState } from "react";

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: -100, y: -100, visible: false });

  useEffect(() => {
    const update = (event) => {
      setPosition({ x: event.clientX, y: event.clientY, visible: true });
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, []);

  return position;
}
