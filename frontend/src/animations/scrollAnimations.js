import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { animateHero } from "./heroAnimations.js";
import { revealOnScroll } from "./textAnimations.js";

gsap.registerPlugin(ScrollTrigger);

function addCinematicSectionTransitions(scope) {
  const sections = gsap.utils.toArray("main > section:not(.hero)", scope);
  const timelines = [];

  sections.forEach((section, index) => {
    section.classList.add("cinematic-scene");
    const isCompact = section.offsetHeight <= window.innerHeight * 1.12;
    const duration = window.innerWidth <= 640 ? 0.38 : 0.62;

    // Compact sections become deliberate, pinned scenes. Longer sections keep
    // their natural reading flow and receive a lighter scroll-linked transition.
    const timeline = isCompact
      ? gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * duration)}`,
            pin: true,
            pinSpacing: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }).fromTo(
          section,
          { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" },
          {
            autoAlpha: 0.48,
            clipPath: "inset(0% 0% 9% 0%)",
            ease: "none",
          },
        )
      : gsap.fromTo(
          section,
          { autoAlpha: 0.72, clipPath: "inset(0% 0% 5% 0%)" },
          {
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 32%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );
    timelines.push(timeline);
  });

  ScrollTrigger.refresh();
  return () => {
    timelines.forEach((timeline) => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    });
    sections.forEach((section) => section.classList.remove("cinematic-scene"));
  };
}

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
  const removeCinematicTransitions = addCinematicSectionTransitions(scope);

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
    removeCinematicTransitions();
  };
}
