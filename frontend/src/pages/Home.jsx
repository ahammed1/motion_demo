import { useCallback, useState } from "react";
import CustomCursor from "../components/CustomCursor.jsx";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import Preloader from "../components/Preloader.jsx";
import SmoothScroll from "../components/SmoothScroll.jsx";
import About from "../sections/About.jsx";
import Contact from "../sections/Contact.jsx";
import Hero from "../sections/Hero.jsx";
import Process from "../sections/Process.jsx";
import SelectedWorks from "../sections/SelectedWorks.tsx";
import Services from "../sections/Services.jsx";
import Showreel from "../sections/Showreel.jsx";

export default function Home() {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <>
      <Preloader onComplete={onComplete} />
      <CustomCursor />
      <SmoothScroll ready={ready}>
        <Navbar home />
        <main>
          <Hero ready={ready} />
          <Showreel />
          <SelectedWorks />
          <Process />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
