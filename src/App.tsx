import { motion } from "framer-motion";
import { TimelineDemo } from "./layout/educational-experience";
import { ModeToggle } from "./components/ThemeToggle";
import { containerVariants, itemVariants } from "./anim/animation";
import Skills from "./layout/skills";
import Projects from "./layout/projects";
import Experience from "./layout/experience";
import Certifications from "./layout/certifications";
import AboutMe from "./layout/about-me";
import Contact from "./layout/contact";
import { Sidebar } from "./components/sidebar";

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
        className="fixed top-0 w-full z-50 bg-card/80 dark:bg-card/5 backdrop-blur-sm border-b border-border"
        variants={{ hidden: { y: -100 }, visible: { y: 0 } }}
        transition={{ type: "spring", stiffness: 260, damping: 15 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="hidden sm:flex gap-4 items-center font-bold">
            <a href="#about-me">Home</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <Sidebar />
          <ModeToggle />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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
