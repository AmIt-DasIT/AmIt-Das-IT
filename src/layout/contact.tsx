import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/anim/animation";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {

const handleCallClick = () => {
    window.location.href = "tel:+917679480267";
  };

  return (
    <motion.section
      className="container mx-auto px-4 py-20"
      variants={containerVariants}
      id="contact"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl font-bold text-center mb-12"
      >
        Get in Touch
      </motion.h2>
      <motion.div
        className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Name
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-background border border-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 rounded-md bg-background border border-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Message
            </label>
            <textarea className="w-full p-2 rounded-md bg-background border border-input min-h-[100px]"></textarea>
          </div>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Mail className="mr-2" /> Send Message
          </Button>
        </form>
        <Button
          onClick={handleCallClick}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
<Phone className="" />
          Call Me
        </Button>
      </motion.div>
    </motion.section>
  );
}
