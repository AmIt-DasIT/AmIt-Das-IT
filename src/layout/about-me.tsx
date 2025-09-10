import { motion } from "framer-motion";
import { itemVariants, contentVariants } from "@/anim/animation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download, Globe } from "lucide-react";

export default function AboutMe() {
  return (
    <motion.section
      className="flex flex-col sm:mt-[100px] mt-4"
      variants={contentVariants}
      initial="hidden"
      animate="visible"
    >
      <p className="text-3xl mb-2">
        👋 <span className="text-base">Hi,</span>
      </p>
      <motion.h1 variants={itemVariants} className="mb-4 flex items-end">
        <span className="text-xl pr-2">I&apos;m</span>
        <p className="text-5xl font-extrabold">Amit Das</p>
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-xl mb-6 text-muted-foreground font-medium"
      >
        Full Stack Developer | UI/UX Enthusiast
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="text-xl mb-6 text-muted-foreground max-w-3xl"
      >
        Passionate software developer with nearly three years of experience
        crafting responsive, high- performance web and mobile applications using
        React.js, Next.js, and Tailwind CSS. Proﬁcient in full-stack development
        with Node.js and Remix, excelling in collaborative environments to de-
        liver user-focused solutions. Committed to continuous learning and
        innovative problem-solving.
      </motion.p>
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
        <Button variant="outline" className="border-border">
          <a
            href="https://github.com/AmIt-DasIT"
            target="_blank"
            className="flex items-center"
          >
            <Github className="mr-2" /> GitHub
          </a>
        </Button>
        <Button variant="outline" className="border-border cursor-pointer">
          <a
            href="https://www.linkedin.com/in/amitdasit/"
            target="_blank"
            className="flex items-center"
          >
            <Linkedin className="mr-2" /> LinkedIn
          </a>
        </Button>
        <Button variant="outline" className="border-border">
          <a
            href="https://uiverse.io/profile/AmIt-DasIT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Globe className="mr-2" /> UIVERSE
          </a>
        </Button>
        <Button variant="outline" className="border-border">
          <a
            href="/Amit Das Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
            download={"Amit Das Resume.pdf"}
          >
            <Download className="mr-2" /> Download CV
          </a>
        </Button>
      </motion.div>
    </motion.section>
  );
}
