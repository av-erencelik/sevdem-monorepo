"use client";

import { sidebarConfig as items } from "@/config/sidebar";
import { section, subsection } from "@/lib/framer-variants/sidebar-desktop";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "ui";

const SidebarNav = ({ isSidebarDefaultOpen }: { isSidebarDefaultOpen: boolean }) => {
  const pathname = usePathname();
  return items.length ? (
    <motion.div className="w-full p-5 text-muted" initial="closed" animate="open" variants={section}>
      {items.map((item, index) => (
        <div key={index} className={cn("pb-8")}>
          <h4 className="mb-1 flex items-center rounded-md py-1 text-base font-semibold">
            {item.icon && item.items ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isSidebarDefaultOpen}>
                  <span
                    className={cn("rounded-sm py-2 pl-2 transition-colors", {
                      "cursor-pointer hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white data-[state=open]:bg-slate-800 data-[state=open]:text-white":
                        !isSidebarDefaultOpen,
                    })}
                  >
                    <item.icon
                      className="mr-2 inline-block max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]"
                      size={24}
                    />
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max border-slate-800 bg-slate-700 text-muted shadow-md" side="right">
                  <DropdownMenuGroup>
                    {item.items.map((item, index) => (
                      <DropdownMenuItem
                        asChild
                        className="hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white"
                        key={index}
                      >
                        <Link
                          href={item.path || ""}
                          className="hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white"
                        >
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            {isSidebarDefaultOpen && (
              <motion.div variants={subsection} className="whitespace-nowrap">
                {item.title}
              </motion.div>
            )}
          </h4>
          {item.items ? (
            <DocsSidebarNavItems items={item.items} pathname={pathname} isSidebarDefaultOpen={isSidebarDefaultOpen} />
          ) : null}
        </div>
      ))}
    </motion.div>
  ) : null;
};

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
  isSidebarDefaultOpen?: boolean;
}

export function DocsSidebarNavItems({ items, pathname, isSidebarDefaultOpen }: DocsSidebarNavItemsProps) {
  return isSidebarDefaultOpen && items?.length ? (
    <motion.div variants={subsection} className="grid grid-flow-row auto-rows-max text-sm text-muted/80">
      {items.map((item, index) =>
        item.path ? (
          <motion.div variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }} key={index}>
            <Link
              key={index}
              href={item.path}
              className={cn(
                "flex w-full items-center whitespace-nowrap rounded-md p-2 transition-colors hover:bg-slate-800 hover:text-white",
                {
                  "bg-slate-800 text-white": pathname?.startsWith(item.path),
                }
              )}
            >
              {item.title}
            </Link>
          </motion.div>
        ) : (
          <span className="flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60">{item.title}</span>
        )
      )}
    </motion.div>
  ) : null;
}

export default SidebarNav;
