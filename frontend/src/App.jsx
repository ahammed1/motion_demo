import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";

export default function App() {
  const projectMatch = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/);
  if (projectMatch) return <ProjectDetails slug={projectMatch[1]} />;
  if (window.location.pathname !== "/") return <NotFound />;
  return <Home />;
}
