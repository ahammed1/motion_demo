import { gsap } from "gsap";

export function animateHero(scope) {
  return gsap.from(scope.querySelectorAll(".hero-copy > *"), {
    y: 35,
    opacity: 0,
    duration: 1.1,
    stagger: 0.12,
    ease: "power3.out",
  });
}
