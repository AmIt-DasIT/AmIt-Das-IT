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
import Gallery from "./layout/gallery";
import { useEffect, useState } from "react";
import ActiveSection from "./components/active-section";

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("about-me");

  useEffect(() => {
    const sections = [
      "about-me",
      "skills",
      "projects",
      "experience",
      "timeline-demo",
      "certifications",
      "gallery",
      "contact",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px", // Adjust to trigger when section is mostly in view
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground transition-colors duration-300 scroll-smooth"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="hidden dark:block h-[30%] w-[30%] bg-red-600 fixed bottom-10 left-[8%] rounded-full blur-[100px] opacity-30"></motion.div>
      <motion.div className="hidden dark:block h-[30%] w-[30%] bg-sky-600 fixed top-[12%] right-[8%] rounded-full blur-[100px] opacity-40"></motion.div>
      {/* Header */}
      <motion.header
        className="fixed top-0 w-full z-50 bg-card/80 dark:bg-card/5 backdrop-blur-sm border-b border-border"
        variants={{ hidden: { y: -100 }, visible: { y: 0 } }}
        transition={{ type: "spring", stiffness: 260, damping: 15 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="hidden sm:flex gap-4 items-center font-bold">
            <ActiveSection activeSection={activeSection} id="about-me">
              Home
            </ActiveSection>
            <ActiveSection activeSection={activeSection} id="skills">
              Skills
            </ActiveSection>
            <ActiveSection activeSection={activeSection} id="projects">
              Projects
            </ActiveSection>
            <ActiveSection activeSection={activeSection} id="experience">
              Experience
            </ActiveSection>
            <ActiveSection activeSection={activeSection} id="contact">
              Contact
            </ActiveSection>
          </div>
          <Sidebar />
          <ModeToggle />
        </div>
      </motion.header>

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

        {/* Gallery */}
        <section id="gallery">
          <Gallery />
        </section>

        {/* Contact */}
        <section id="contact">
          <Contact />
        </section>
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
