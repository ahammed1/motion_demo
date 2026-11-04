import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="not-found section-pad">
        <span className="mono">404 / OUT OF FRAME</span>
        <h1>This world<br /><em>isn't here.</em></h1>
        <a className="text-link" href="/"><ArrowLeft size={14} /> RETURN TO THE STUDIO</a>
      </main>
      <Footer />
    </>
  );
}
