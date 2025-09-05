import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/anim/animation";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send } from "lucide-react";
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
    <motion.section variants={containerVariants} className="pt-20">
      <motion.h2
        variants={itemVariants}
        className="text-2xl font-medium mb-4 flex items-center"
      >
        <Send className="mr-2" /> Contact
      </motion.h2>
      <div className="flex gap-8">
        <div className="flex flex-col flex-1/2 gap-4">
          <button className="p-2.5 rounded-lg flex gap-2 items-center px-4 bg-card">
            <Phone className="mr-2 text-primary" />
            <div className="flex flex-col text-left">
              <span>Contact No</span>
              <span>+91 7679480267</span>
            </div>
          </button>
          <button className="p-2.5 rounded-lg flex gap-2 items-center px-4 bg-card">
            <Mail className="mr-2 text-primary" />
            <div className="flex flex-col text-left">
              <span>Email</span>
              <span>iamamitdas2008@gmail</span>
            </div>
          </button>
        </div>
        <motion.div
          className="p-6 border rounded-xl flex-1/2"
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
                className="w-full p-2 rounded-md bg-background border outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-2 rounded-md bg-background border outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Message
              </label>
              <textarea
                name="message"
                className="w-full p-2 rounded-md bg-background border outline-none min-h-[100px]"
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
      </div>
    </motion.section>
  );
}
