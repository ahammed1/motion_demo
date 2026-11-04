import { useEffect, useState, type CSSProperties, type FocusEvent, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects.js";
import ProjectArtwork from "../components/ProjectArtwork.jsx";

interface WorkProject {
  index: string;
  slug: string;
  name: string;
  type: string;
  year: string;
  className: string;
  shape: string;
}

interface ProjectCardProps {
  project: WorkProject;
  index: number;
  selectedIndex: number;
  isActive: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  viewportWidth: number;
  onSelect: (index: number) => void;
}

const spring = { stiffness: 150, damping: 20 };
const workProjects: WorkProject[] = projects;

function ProjectCard({ project, index, selectedIndex, isActive, mouseX, mouseY, viewportWidth, onSelect }: ProjectCardProps) {
  const distanceFromSelected = index - selectedIndex;
  const isSelected = index === selectedIndex;
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [isSelected ? 8 : 5, isSelected ? -8 : -5]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [isSelected ? -10 : -6, isSelected ? 10 : 6]),
    spring,
  );
  const fanX = distanceFromSelected * Math.min(64, viewportWidth * 0.055);
  const fanY = Math.abs(distanceFromSelected) * 13;
  const fanRotation = distanceFromSelected * 4;
  const restingScale = [1, 0.95, 0.9, 0.86][index] ?? 0.82;
  const restingY = [0, -6, -12, -18][index] ?? -24;
  const restingOpacity = [1, 0.8, 0.6, 0.45][index] ?? 0.35;

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--mouse-x",
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    );
    event.currentTarget.style.setProperty(
      "--mouse-y",
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    );
  };

  const spotlightStyle = {
    "--mouse-x": "50%",
    "--mouse-y": "50%",
  } as CSSProperties;

  return (
    <motion.div
      className="tw-pointer-events-none tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center"
      style={{
        rotateX,
        rotateY,
        zIndex: isActive ? (isSelected ? workProjects.length + 1 : workProjects.length - Math.abs(distanceFromSelected)) : workProjects.length - index,
        transformStyle: "preserve-3d",
        ...spotlightStyle,
      }}
      initial={false}
      animate={
        isActive
          ? {
              x: fanX,
              y: fanY,
              z: isSelected ? 40 : -Math.abs(distanceFromSelected) * 4,
              scale: isSelected ? 1 : 0.94,
              opacity: isSelected ? 1 : 0.92,
              rotateZ: fanRotation,
            }
          : {
              x: 0,
              y: restingY,
              z: 0,
              scale: restingScale,
              opacity: restingOpacity,
              rotateZ: 0,
            }
      }
      transition={{ ...spring, mass: 0.8 }}
    >
      <a
        href={`/projects/${project.slug}`}
        aria-label={`${project.name}, ${project.type}, ${project.year}`}
        className={`work-stack-card${isActive ? " is-active" : ""} tw-relative tw-w-[min(82vw,29rem)] tw-pointer-events-auto tw-overflow-hidden tw-rounded-[3px] tw-border tw-border-emerald-500/20 tw-bg-white/[0.04] tw-backdrop-blur-md tw-shadow-[0_35px_90px_rgba(0,0,0,0.5)]`}
        style={spotlightStyle}
        onPointerMove={onPointerMove}
        onPointerEnter={() => onSelect(index)}
        onFocus={() => onSelect(index)}
      >
        <ProjectArtwork shape={project.shape} className={project.className} />
        <div className="tw-flex tw-items-end tw-justify-between tw-gap-5 tw-px-5 tw-py-4 sm:tw-px-6">
          <div className="tw-min-w-0">
            <div className="tw-mb-2 tw-flex tw-flex-wrap tw-items-center tw-gap-x-3 tw-gap-y-1 tw-font-mono tw-text-[9px] tw-tracking-[0.16em] tw-text-emerald-100/55">
              <span>STUDY {project.index}</span>
              <span className="tw-text-emerald-300/70">TIER: GOLD</span>
              <span>$20,000</span>
              <span>{project.year}</span>
            </div>
            <h3
              title={project.name}
              className="tw-m-0 tw-text-lg tw-font-normal tw-leading-tight tw-tracking-[-0.04em] tw-text-white sm:tw-text-xl"
            >
              {project.name}
            </h3>
          </div>
          <span className="tw-grid tw-h-9 tw-w-9 tw-shrink-0 tw-place-items-center tw-rounded-full tw-border tw-border-white/20 tw-text-emerald-100/80">
            <ArrowUpRight size={17} aria-hidden="true" />
          </span>
        </div>
        <div className="work-stack-spotlight" aria-hidden="true" />
      </a>
    </motion.div>
  );
}

export default function SelectedWorks() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1024);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(Math.max(-0.5, Math.min(0.5, (event.clientX - bounds.left) / bounds.width - 0.5)));
    mouseY.set(Math.max(-0.5, Math.min(0.5, (event.clientY - bounds.top) / bounds.height - 0.5)));
    setIsActive(true);
  };

  const resetMotion = () => {
    setIsActive(false);
    setSelectedIndex(0);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
      resetMotion();
    }
  };

  return (
    <section className="work section-pad tw-bg-[var(--bg)]" id="work">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> A FEW WORLDS, MADE REAL</p>
          <h2>Selected <em>work</em></h2>
        </div>
        <p className="section-aside">
          A collection of moving images, material studies<br />
          and things that don&apos;t quite exist.
        </p>
      </div>

      <div
        className="work-stack tw-relative tw-isolate tw-flex tw-h-[31rem] tw-items-center tw-justify-center tw-overflow-hidden max-[640px]:tw-h-[28rem]"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetMotion}
        onFocusCapture={() => setIsActive(true)}
        onBlurCapture={handleBlur}
      >
        <div className="tw-pointer-events-none tw-absolute tw-left-1/2 tw-top-1/2 tw-h-[25rem] tw-w-[25rem] -tw-translate-x-1/2 -tw-translate-y-1/2 tw-rounded-full tw-bg-emerald-500/20 tw-blur-3xl" />
        {workProjects.map((project, index) => (
          <ProjectCard
            key={project.index}
            project={project}
            index={index}
            selectedIndex={selectedIndex}
            isActive={isActive}
            mouseX={mouseX}
            mouseY={mouseY}
            viewportWidth={viewportWidth}
            onSelect={setSelectedIndex}
          />
        ))}
        <span className="tw-pointer-events-none tw-absolute tw-bottom-4 tw-left-1/2 tw-z-10 -tw-translate-x-1/2 tw-whitespace-nowrap tw-font-mono tw-text-[8px] tw-tracking-[0.18em] tw-text-emerald-100/45">
          MOVE TO EXPLORE
        </span>
      </div>

      <div className="work-footer reveal">
        <span className="mono">MORE WORLDS IN PROGRESS</span>
        <span className="work-footer-mark">✳</span>
        <a href="#contact">HAVE SOMETHING IN MIND? <ArrowRight size={14} /></a>
      </div>
    </section>
  );
}
