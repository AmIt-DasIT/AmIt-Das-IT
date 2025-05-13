import { motion } from "framer-motion";
import ActiveSection from "./active-section";
import { useEffect, useState } from "react";
import { MenuBar } from "./menubar";
import { ModeToggle } from "./theme-toggle";
import { sections } from "@/data/data";

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("about-me");

  useEffect(() => {
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
        <MenuBar />
        <ModeToggle />
      </div>
    </motion.header>
  );
}
