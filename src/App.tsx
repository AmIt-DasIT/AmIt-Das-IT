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
      <main className="flex justify-center w-full min-h-screen items-start bg-black">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[70px] max-w-[1440px] w-full px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 lg:py-[60px]">
          <UserCard />
          <div className="w-full min-w-0 flex-1 pt-6 sm:pt-0">
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
