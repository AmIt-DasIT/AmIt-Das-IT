import { motion } from "framer-motion";
import { experience } from "@/data/data";
import { itemVariants, containerVariants } from "@/anim/animation";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <div className="pt-20" id="experience">
      <motion.section className="container mx-auto px-4 py-16 relative border-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 lg:border-l dark:[--pattern-fg:var(--color-white)]/10" variants={containerVariants}>
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center mb-12"
        >
          Work Experience
        </motion.h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="p-6 bg-card/80 dark:bg-card/5 backdrop-blur-sm border border-border rounded-lg shadow-md"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold flex items-center">
                <Briefcase className="mr-2" /> {exp.role}
              </h3>
              <p className="text-muted-foreground">
                {exp.company} | {exp.period}
              </p>
              <p className="text-muted-foreground">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
