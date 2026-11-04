import { gsap } from "gsap";

export function fadeIn(element) {
  return gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" });
}
