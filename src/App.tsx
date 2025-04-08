import { motion } from "framer-motion";
import { TimelineDemo } from "./components/TimelineDemo";
import { ModeToggle } from "./components/ThemeToggle";
import { containerVariants, itemVariants } from "./anim/animation";
import Skills from "./layout/skills";
import Projects from "./layout/projects";
import Experience from "./layout/experience";
import Certifications from "./layout/certifications";
import AboutMe from "./layout/about-me";
import Contact from "./layout/contact";

const App: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-background text-foreground transition-colors duration-300 scroll-smooth"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.header
        className="fixed top-0 w-full z-10 bg-card/80 dark:bg-card/80 backdrop-blur-sm border-b border-border"
        variants={{ hidden: { y: -100 }, visible: { y: 0 } }}
        transition={{ type: "spring", stiffness: 260, damping: 15 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <div className="flex gap-4 items-center">
            <a href="#about-me">About Me</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
            <ModeToggle />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main>
        <>
          {/* About Me */}
          <AboutMe />

          {/* Skills */}
          <Skills />

          {/* Projects */}
          <Projects />

          {/* Work Experience */}
          <Experience />

          {/* Educational Experience */}
          <TimelineDemo />

          {/* Certifications */}
          <Certifications />

          {/* Contact */}
          <Contact />
        </>
      </main>

      {/* Footer */}
      <motion.footer
        className="container mx-auto px-4 py-8 text-center border-t border-border"
        variants={itemVariants}
      >
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Amit Das. All rights reserved.
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default App;
