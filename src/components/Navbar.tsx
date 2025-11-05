"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";

export default function Navbar() {
  const handleScroll = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth", // ✅ native smooth scroll
      });
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <NavigationMenu className="h-20 px-10">
          <NavigationMenuList className="gap-10 text-2xl">
            {[
              { id: "#hero", label: "Home" },
              { id: "#about", label: "About me" },
              { id: "#projects", label: "Projects" },
              { id: "#achievements", label: "Achievements" },
            ].map((item) => (
              <NavigationMenuItem key={item.id}>
                <NavigationMenuLink
                  asChild
                  className="px-4 py-2 text-xl font-extralight hover:text-destructive transition-colors backdrop-blur-sm border rounded-2xl border-b-4 shadow-lg"
                >
                  <button onClick={() => handleScroll(item.id)}>
                    {item.label}
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </motion.div>
    </div>
  );
}
