import { motion } from "framer-motion";
import { experience } from "@/data/data";
import { itemVariants, containerVariants } from "@/anim/animation";
import { Briefcase, LucideBriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Experience() {
  return (
    <div className="pt-20">
      <motion.section className="" variants={containerVariants}>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-medium mb-4 flex items-center gap-2"
        >
          <LucideBriefcaseBusiness /> Work Experience
        </motion.h2>
        <div className=" space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              className="p-6 bg-card/80 dark:bg-card/5 backdrop-blur-sm border border-border rounded-lg shadow-md"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between pb-2">
                <h3 className="text-xl font-semibold flex items-center">
                  <Briefcase className="mr-2" />
                  <div>
                    {exp.role}
                    <p className="text-muted-foreground text-base">
                      {exp.company}
                    </p>
                  </div>
                </h3>
                <Button variant={"outline"}>{exp.period}</Button>
              </div>
              <hr />
              <p className="text-muted-foreground pt-2">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
