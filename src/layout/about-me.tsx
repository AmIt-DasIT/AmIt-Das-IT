import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/anim/animation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download, CircleArrowDown } from "lucide-react";

export default function AboutMe() {
  return (
    <motion.section
      className="container mx-auto px-4 text-center min-h-screen flex flex-col justify-center"
      variants={containerVariants}
      id="about-me"
    >
      <motion.img
        src="https://github.com/shadcn.png"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-border shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-4">
        Amit Das
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-xl mb-6 text-muted-foreground font-medium"
      >
        Full Stack Developer | UI/UX Enthusiast
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-xl mb-6 text-muted-foreground max-w-3xl mx-auto"
      >
        I am a highly motivated and dedicated web and mobile developer with
        hands-on experience in building dynamic, user-centric applications using
        <b className="text-primary"> React</b>,{" "}
        <b className="text-primary">React Native</b>,{" "}
        <b className="text-primary">Next.js</b>, and{" "}
        <b className="text-primary">Express.js</b>. My development journey is
        fueled by a strong passion for crafting scalable, efficient, and
        intuitive solutions that create meaningful user experiences.
      </motion.p>
      <motion.div variants={itemVariants} className="flex justify-center gap-4">
        <Button variant="outline" className="border-border">
          <a
            href="https://github.com/AmIt-DasIT"
            target="_blank"
            className="flex items-center"
          >
            <Github className="mr-2" /> GitHub
          </a>
        </Button>
        <Button variant="outline" className="border-border">
          <Linkedin className="mr-2" /> LinkedIn
        </Button>
        <Button variant="outline" className="border-border">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            download={"resume.pdf"}
          >
            <Download className="mr-2" /> Download CV
          </a>
        </Button>
      </motion.div>
      <a href="#skills">
        <CircleArrowDown
          className="animate-bounce text-muted-foreground absolute bottom-14 left-1/2 transform -translate-x-1/2 cursor-pointer"
          size={42}
        />
      </a>
    </motion.section>
  );
}
