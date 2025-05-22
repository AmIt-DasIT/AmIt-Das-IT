import { AnimatePresence, motion } from "framer-motion";
import { TimelineDemo } from "./layout/educational-experience";
import { containerVariants, itemVariants } from "./anim/animation";
import Skills from "./layout/skills";
import Projects from "./layout/projects";
import Experience from "./layout/experience";
import Certifications from "./layout/certifications";
import AboutMe from "./layout/about-me";
import Contact from "./layout/contact";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Gallery from "./layout/gallery";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    setIsVisible(window.scrollY > 300);
  };

  // Scroll to top function
  const scrollToTop = () => {
    let a = document.createElement("a");
    a.href = "#home";
    a.click();
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground transition-colors duration-300 scroll-smooth"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      id="home"
    >
      <motion.div className="hidden dark:block h-[30%] w-[30%] bg-red-600 fixed bottom-10 left-[8%] rounded-full blur-[100px] opacity-30" />
      <motion.div className="hidden dark:block h-[30%] w-[30%] bg-sky-600 fixed top-[12%] right-[8%] rounded-full blur-[100px] opacity-40" />
      <motion.div className="h-[60%] w-[45%] bg-red-600 fixed -bottom-[10%] left-[8%] rounded-full blur-[110px] opacity-10" />
      <motion.div className="h-[60%] w-[45%] bg-sky-600 fixed -top-[12%] right-[8%] rounded-full blur-[110px] opacity-10" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* About Me */}
        <section id="about-me">
          <AboutMe />
        </section>

        {/* Skills */}
        <section id="skills">
          <Skills />
        </section>

        {/* Projects */}
        <section id="projects">
          <Projects />
        </section>

        {/* Work Experience */}
        <section id="experience">
          <Experience />
        </section>

        {/* Educational Experience */}
        <section id="timeline-demo">
          <TimelineDemo />
        </section>

        {/* Certifications */}
        <section id="certifications">
          <Certifications />
        </section>

        <section id="gallery">
          <Gallery />
        </section>

        {/* Contact */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-3 cursor-pointer text-white shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-indigo-700 hover:to-purple-700 "
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        className="container mx-auto px-4 py-8 text-center border-t border-border"
        variants={itemVariants}
      >
        <p className="text-muted-foreground">
          © 2025 Amit Das. All rights reserved.
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default App;
