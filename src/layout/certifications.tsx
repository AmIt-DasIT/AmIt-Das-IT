import { motion } from "framer-motion";
import { certifications } from "@/data/data";
import { itemVariants, containerVariants } from "@/anim/animation";
import { Award } from "lucide-react";

export default function Certifications() {
  return (
    <motion.section
      className="container mx-auto px-4 py-16 bg-muted"
      variants={containerVariants}
      id="certifications"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold text-center mb-12"
      >
        Certifications
      </motion.h2>
      <div className="max-w-2xl mx-auto space-y-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="p-6 bg-card rounded-lg shadow-md flex items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Award className="mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{cert.name}</h3>
              <p className="text-muted-foreground">
                {cert.issuer} | {cert.year}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
