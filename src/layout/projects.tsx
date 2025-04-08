import { motion } from "framer-motion";
import { projects } from "@/data/data";
import { itemVariants } from "@/anim/animation";
import { ProjectCard } from "../components/ProjectCard";

export default function Projects() {
  return (
    <motion.section
      className="container mx-auto px-4 py-28"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      id="projects"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold text-center mb-12"
      >
        Featured Projects
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
