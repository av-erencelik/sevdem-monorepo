"use client";
import { useState } from "react";
import Logo from "./logo";
import SidebarNav from "./sidebar-nav";
import { ScrollArea } from "ui";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { sidebar } from "@/lib/framer-variants/sidebar-desktop";

const SiteAside = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <motion.div
      variants={sidebar}
      animate={isSidebarOpen ? "open" : "closed"}
      initial={false}
      className="hidden border-r-[1px] bg-background md:block"
    >
      <Logo isSidebarDefaultOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollArea className={cn("overflow-y-auto", "h-[calc(100vh-65px)]", "flex-grow")}>
        <SidebarNav isSidebarDefaultOpen={isSidebarOpen} />
      </ScrollArea>
    </motion.div>
  );
};

export default SiteAside;
