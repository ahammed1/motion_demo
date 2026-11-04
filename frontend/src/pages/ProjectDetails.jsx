import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import ProjectArtwork from "../components/ProjectArtwork.jsx";
import { projects } from "../data/projects.js";
import NotFound from "./NotFound.jsx";

export default function ProjectDetails({ slug }) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;

  return (
    <>
      <Navbar />
      <main className="project-detail section-pad">
        <a className="text-link" href="/#work"><ArrowLeft size={14} /> BACK TO SELECTED WORK</a>
        <div className="project-detail-heading">
          <span className="project-type mono">{project.type} · {project.year}</span>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <ProjectArtwork shape={project.shape} className={project.className} />
        <div className="project-detail-footer"><span className="mono">A NOOR STUDIO STUDY · {project.index}</span><a className="text-link" href="/#contact">START A PROJECT <ArrowUpRight size={14} /></a></div>
      </main>
      <Footer />
    </>
  );
}
