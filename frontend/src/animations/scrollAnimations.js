import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { animateHero } from "./heroAnimations.js";
import { revealOnScroll } from "./textAnimations.js";

gsap.registerPlugin(ScrollTrigger);

export function startScrollAnimations(scope) {
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9 });
  lenis.on("scroll", ScrollTrigger.update);

  let frame;
  const raf = (time) => {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  gsap.ticker.lagSmoothing(0);

  const heroAnimation = animateHero(scope);
  const revealAnimations = revealOnScroll(scope);
  const parallax = gsap.to(scope.querySelector(".hero-visual"), {
    yPercent: 12,
    ease: "none",
    scrollTrigger: { trigger: scope.querySelector(".hero"), start: "top top", end: "bottom top", scrub: 0.7 },
  });

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    heroAnimation.kill();
    revealAnimations.forEach((animation) => {
      animation.scrollTrigger?.kill();
      animation.kill();
    });
    parallax.scrollTrigger?.kill();
    parallax.kill();
  };
}
