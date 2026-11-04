import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function revealOnScroll(scope) {
  const animations = [];
  scope.querySelectorAll(".reveal").forEach((element) => {
    animations.push(gsap.fromTo(element, { y: 38, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 88%", once: true },
    }));
  });
  return animations;
}
