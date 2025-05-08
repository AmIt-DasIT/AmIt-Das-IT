import { motion } from "framer-motion";
import { projects } from "@/data/data";
import { itemVariants } from "@/anim/animation";
import { ProjectCard } from "../components/project-card";

export default function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      id="projects"
      className="pt-20"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold text-center mb-12 "
      >
        Featured Projects
      </motion.h2>
      <div className="grid md:grid-cols-4 gap-6 relative p-4 bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0  bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
