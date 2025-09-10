import { motion } from "framer-motion";
import { cardVariants } from "@/anim/animation";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download, Send, Globe } from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";

export default function UserCard() {
  return (
    <motion.section
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="p-5 flex flex-col items-center border rounded-[30px] bg-card sticky top-[60px] min-w-[360px] h-fit"
    >
      <div className="border border-neutral-700 rounded-[24px] aspect-square h-[320px] mb-6 relative">
        <img
          decoding="async"
          width="840"
          height="840"
          sizes="calc(min(max((min(100vw, 1440px) - 150px) / 2, 1px), 360px) - 40px)"
          src="/avatar.jpg"
          alt="Profile"
          className="!w-[480px] absolute top-0 left-0 right-0 bottom-0 object-center object-fill rounded-[24px]"
        />
      </div>
      <Button variant="outline" size={"lg"} className="mb-6">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
        </span>
        Available for work
      </Button>
      <motion.h1 className="mb-6 flex justify-center items-end">
        <TextEffect
          per="char"
          delay={1}
          preset="blur"
          className="text-3xl font-extrabold"
        >
          Amit Das
        </TextEffect>
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-4 z-50 mb-6">
        <Button variant="outline" size={"icon"}>
          <a
            href="https://github.com/AmIt-DasIT"
            target="_blank"
            className="flex items-center"
          >
            <Github />
          </a>
        </Button>
        <Button variant="outline" size={"icon"}>
          <a
            href="https://www.linkedin.com/in/amitdasit/"
            target="_blank"
            className="flex items-center"
          >
            <Linkedin />
          </a>
        </Button>

        <Button variant="outline" size={"icon"}>
          <a
            href="https://uiverse.io/profile/AmIt-DasIT"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Globe />
          </a>
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="lg" className="rounded-lg">
          <a
            href="/Amit Das Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm"
            download={"Amit Das Resume.pdf"}
          >
            <Download className="mr-1" /> Download CV
          </a>
        </Button>
        <Button variant="default" size="lg" className="rounded-lg">
          <a
            href="/Amit Das Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm"
            download={"Amit Das Resume.pdf"}
          >
            <Send className="mr-1" /> Contact Me
          </a>
        </Button>
      </div>
    </motion.section>
  );
}
