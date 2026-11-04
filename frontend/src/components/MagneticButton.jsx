import { useRef } from "react";

export default function MagneticButton({ href, children, className = "" }) {
  const button = useRef(null);

  const handlePointerMove = (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const bounds = button.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    button.current.style.transform = `translate(${x * 0.12}px, ${y * 0.16}px)`;
  };
  const resetPosition = () => {
    if (button.current) button.current.style.transform = "";
  };

  return <a ref={button} className={`${className} magnetic`} href={href} onPointerMove={handlePointerMove} onPointerLeave={resetPosition}>{children}</a>;
}
