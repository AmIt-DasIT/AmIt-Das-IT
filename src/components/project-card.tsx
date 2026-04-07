import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  github_link: string;
  image_url: string;
}

export const ProjectCard: React.FC<{ project: Project; index: number }> = ({
  project,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="bg-card/80 dark:bg-card/5 backdrop-blur-sm border border-border min-h-[280px] h-auto md:h-[330px] flex flex-col">
        <CardHeader>
          <CardTitle className="font-extrabold">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={project.image_url}
            className="w-full h-40 bg-neutral-200 dark:bg-stone-900 rounded-md mb-4 border"
            alt=""
          />
          <Button variant={"link"} size={"sm"} className="!px-0">
            <a href={project.github_link} className="font-bold" target="_blank">
              View Demo
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
