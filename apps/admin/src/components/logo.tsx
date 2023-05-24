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
    <div className="cursor-default border-b-[1px] border-gray-500 text-muted">
      <div>
        <div className="flex items-center justify-between p-5">
          {isSidebarDefaultOpen ? (
            <motion.div
              className="ml-2 flex items-center overflow-x-hidden whitespace-nowrap font-bold"
              variants={item}
              initial="closed"
              animate="open"
            >
              Sevdem Admin
            </motion.div>
          ) : null}

          <Button size="sm" className="h-max bg-transparent px-2 hover:bg-transparent" onClick={toggleSidebar}>
            <motion.div animate={isSidebarDefaultOpen ? { rotate: 180 } : { rotate: 0 }} initial={false}>
              <SidebarOpenIcon size={24} />
            </motion.div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logo;
