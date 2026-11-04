import { useEffect, useRef } from "react";
import { startScrollAnimations } from "../animations/scrollAnimations.js";

export default function SmoothScroll({ children, ready }) {
  const scope = useRef(null);

  useEffect(() => {
    if (!ready || !scope.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    return startScrollAnimations(scope.current);
  }, [ready]);

  return <div ref={scope}>{children}</div>;
}
