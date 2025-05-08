"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";

export function Sidebar() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="block md:hidden">
        <Button variant="outline">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm mb-5">
          <div className="flex flex-col gap-4 space-y-2 font-semibold">
            <a href="#about-me">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
