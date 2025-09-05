import { containerVariants, itemVariants } from "@/anim/animation";
import { LinkPreview } from "@/components/ui/link-preview";
import { skills } from "@/data/data";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <motion.section variants={containerVariants} className="sm:pt-20">
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-medium mb-4 flex items-center"
      >
        Skills
      </motion.h2>
      <div className="flex gap-2 flex-wrap">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="flex justify-between mb-1 gap-2 border p-2 px-3 rounded-full bg-card shadow-md">
              <LinkPreview url={skill.url} className="font-bold flex gap-2">
                <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
                <span>{skill.name}</span>
              </LinkPreview>
            </div>
            {/* <div className="w-full bg-muted rounded-full h-2.5 text-center">
              <motion.div
                className="bg-primary h-1 rounded-full text-[8px] font-bold"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: index * 0.2 + 0.2, duration: 0.8 }}
              >
                {skill.level + "%"}
              </motion.div>
            </div> */}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
