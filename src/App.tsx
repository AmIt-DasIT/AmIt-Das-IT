import { TimelineDemo } from "./layout/educational-experience";
import Skills from "./layout/skills";
import Projects from "./layout/projects";
import Experience from "./layout/experience";
import Certifications from "./layout/certifications";
import AboutMe from "./layout/about-me";
import Contact from "./layout/contact";
import UserCard from "./layout/user-card";
import { ReactLenis } from "lenis/react";

const App = () => {
  return (
    <>
      <ReactLenis root />
      <main className="flex justify-center w-full items-center bg-black">
        <div className="flex gap-[70px] max-w-[1440px] px-[40px] py-[60px]">
          <UserCard />
          <div>
            <AboutMe />
            <Experience />
            <Skills />
            <Projects />
            <TimelineDemo />
            <Certifications />
            <Contact />
          </div>
        </div>
      </main>
      <footer className="px-4 py-6 text-center">
        <p className="text-muted-foreground">
          © 2025 Amit Das. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default App;
