import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

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
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
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
          <a href={project.github_link} className="font-bold underline" target="_blank">
            View Demo
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
};
