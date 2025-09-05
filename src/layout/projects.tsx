import { motion } from "framer-motion";
import { projects } from "@/data/data";
import { itemVariants } from "@/anim/animation";
import { ProjectCard } from "../components/project-card";
import { Rocket } from "lucide-react";

export default function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-20"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-medium mb-4 flex items-center"
      >
        <Rocket className="mr-2" /> Projects
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-4 relative">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
