import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/anim/animation";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Contact() {
  const handleCallClick = () => {
    window.location.href = "tel:+917679480267";
  };

  function formAction(formData: FormData) {
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

    // Construct the mailto link
    const subject = `Contact Form Submission from ${name}`;
    const body =
      `Contact Form Submission\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Message:\n${message}\n\n` +
      `Sent from My Website`;
    const mailtoLink = `mailto:iamamitdas2008@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Open the email client
    window.location.href = mailtoLink;
  }

  return (
    <motion.section variants={containerVariants} className="pt-20" id="contact">
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
        <form className="space-y-4" action={formAction}>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 rounded-md bg-background border border-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 rounded-md bg-background border border-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">
              Message
            </label>
            <textarea
              name="message"
              className="w-full p-2 rounded-md bg-background border border-input min-h-[100px]"
            ></textarea>
          </div>
          <Button variant={"default"} className="w-full">
            <Mail /> Send Message
          </Button>
        </form>
        <div className="flex gap-2 my-5 items-center">
          <Separator className="flex-1" />
          <span className="font-semibold italic">Or</span>
          <Separator className="flex-1" />
        </div>
        <Button
          onClick={handleCallClick}
          variant={"outline"}
          className="w-full mt-2"
        >
          <Phone />
          Call Me
        </Button>
      </motion.div>
    </motion.section>
  );
}
