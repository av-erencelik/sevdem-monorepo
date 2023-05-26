import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { SidebarOpenIcon } from "lucide-react";
import { Button } from "ui";

const item = {
  closed: { width: 0 },
  open: {
    width: 130,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const Logo = ({
  isSidebarDefaultOpen,
  toggleSidebar,
}: {
  isSidebarDefaultOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <div className="cursor-default text-foreground">
      <div>
        <div className="flex items-center justify-between p-5 py-3">
          {isSidebarDefaultOpen ? (
            <motion.div
              className="ml-2 flex items-center overflow-x-hidden whitespace-nowrap font-bold text-sky-600"
              variants={item}
              initial="closed"
              animate="open"
            >
              Sevdem Admin
            </motion.div>
          ) : null}

          <Button
            size="sm"
            variant="ghost"
            className="h-max bg-transparent p-2 text-sky-600 transition-colors hover:text-sky-600"
            onClick={toggleSidebar}
          >
            <motion.div
              animate={isSidebarDefaultOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              initial={false}
            >
              <SidebarOpenIcon size={24} />
            </motion.div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logo;
