import { motion } from "framer-motion";
import { itemVariants, containerVariants } from "@/anim/animation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download, CircleArrowDown } from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";

export default function AboutMe() {
  return (
    <motion.section
      className="container mx-auto px-4 text-center min-h-screen flex flex-col justify-center my-24 sm:my-0"
      variants={containerVariants}
    >
      <motion.img
        src="/avatar.jpg"
        alt="Profile"
        className="w-40 h-40 sm:w-52 sm:h-52 mx-auto rounded-full mb-6 border-4 border-border shadow-lg object-contain"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />

      <motion.h1
        variants={itemVariants}
        className="mb-4 flex justify-center items-end"
      >
        <span className="text-xl pr-2">Hi, I&apos;m</span>
        <TextEffect
          per="char"
          delay={1}
          preset="blur"
          className="text-5xl font-extrabold"
        >
          Amit Das
        </TextEffect>
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
        I love coding — it’s not just work, it’s what I enjoy. I have fun
        building smooth, responsive UIs with{" "}
        <b className="text-primary">React</b> and{" "}
        <b className="text-primary">Tailwind CSS</b>, and I’m always up for
        creating something clean, fast, and user-friendly. I enjoy collaborating
        with teams, sharing ideas, supporting others, and constantly learning.
        Whether it’s frontend finesse or backend logic with{" "}
        <b className="text-primary">Next js</b>,{" "}
        <b className="text-primary">Node.js</b> and{" "}
        <b className="text-primary">Remix</b>, I’m all in.
      </motion.p>
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-4 z-50"
      >
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
            <img
              src="/uiverse.webp"
              className="w-[60px] pt-1.5"
              alt="uiverse"
            />
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
      <a href="#skills" className="hidden sm:flex">
        <CircleArrowDown
          className="animate-bounce text-muted-foreground absolute bottom-14 left-1/2 transform -translate-x-1/2 cursor-pointer"
          size={30}
        />
      </a>
    </motion.section>
  );
}
