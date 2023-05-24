"use client";
import { useState } from "react";
import Logo from "./logo";
import SidebarNav from "./sidebar-nav";
import { ScrollArea } from "ui";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const SiteAside = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <motion.div
      variants={container}
      animate={isSidebarOpen ? "open" : "closed"}
      initial={false}
      className="hidden bg-slate-700 md:block"
    >
      <Logo isSidebarDefaultOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollArea className={cn("overflow-y-auto", "h-screen", "flex-grow")}>
        <SidebarNav isSidebarDefaultOpen={isSidebarOpen} />
      </ScrollArea>
    </motion.div>
  );
};

const container = {
  closed: { width: 80 },
  open: {
    width: 225,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

export default SiteAside;
