import { motion } from "framer-motion";
import { certifications } from "@/data/data";
import { itemVariants, containerVariants } from "@/anim/animation";
import { Award, Download, Trophy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Certifications() {
  return (
    <motion.section className="pt-20" variants={containerVariants}>
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-medium mb-4 flex items-center"
      >
        <Trophy className="mr-2" /> Certifications
      </motion.h2>
      <div className="">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="p-6 bg-card/80 dark:bg-card/5 backdrop-blur-sm border border-border rounded-lg shadow-md flex items-center relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Award className="mr-4" />
            <div className="">
              <h3 className="text-xl font-semibold">{cert.name}</h3>
              <p className="text-muted-foreground">
                {cert.issuer} | {cert.year}
              </p>
              <Dialog>
                <DialogTrigger className="absolute top-4 right-4 cursor-pointer hover:underline text-sm text-primary font-extrabold">
                  View
                </DialogTrigger>
                <DialogContent className="!max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{cert.name}</DialogTitle>
                    <DialogDescription className="flex flex-col pt-3">
                      <div className="hidden sm:block">
                        <iframe
                          src={cert.link}
                          className="w-full min-h-[60vh]"
                        />
                      </div>
                      <Button variant={"outline"} className="sm:hidden flex">
                        <Download className="mr-2" />
                        <a href={cert.link} download>
                          Download
                        </a>
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
