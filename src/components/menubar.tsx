import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { useState } from "react";

export function MenuBar() {
  const [open, setOpen] = useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="block md:hidden">
        <Button variant="outline">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="ml-4 w-full max-w-sm mb-5">
          <div className="flex flex-col gap-4 space-y-2 font-semibold">
            <a href="#about-me" onClick={() => setOpen(false)}>
              About
            </a>
            <a href="#skills" onClick={() => setOpen(false)}>
              Skills
            </a>
            <a href="#projects" onClick={() => setOpen(false)}>
              Projects
            </a>
            <a href="#experience" onClick={() => setOpen(false)}>
              Experience
            </a>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
