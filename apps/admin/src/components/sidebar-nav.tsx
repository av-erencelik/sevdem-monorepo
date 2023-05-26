"use client";

import { sidebarConfig as items } from "@/config/sidebar";
import { section, subsection } from "@/lib/framer-variants/sidebar-desktop";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "@/types/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "ui";

const SidebarNav = ({ isSidebarDefaultOpen }: { isSidebarDefaultOpen: boolean }) => {
  const pathname = usePathname();
  return items.length ? (
    <motion.div className="w-full p-5 pt-0 text-foreground/70" initial="closed" animate="open" variants={section}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn("pb-8", {
            "pb-2": !isSidebarDefaultOpen,
          })}
        >
          <h4 className="mb-1 flex items-center rounded-md py-1 text-base font-medium">
            {item.icon && item.items ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isSidebarDefaultOpen}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("h-max rounded-sm p-2 transition-colors disabled:opacity-100", {
                      "cursor-pointer hover:bg-muted hover:text-foreground data-[state=open]:bg-sky-100 data-[state=open]:text-sky-600":
                        !isSidebarDefaultOpen,
                    })}
                  >
                    <item.icon
                      className={cn("inline-block max-h-[20px] min-h-[20px] min-w-[20px] max-w-[20px]", {
                        "text-foreground": isSidebarDefaultOpen,
                      })}
                      size={18}
                    />
                    <span className="sr-only">{item.title}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max text-foreground/70 shadow-sm" side="right">
                  <DropdownMenuGroup className="space-y-1">
                    {item.items.map((item, index) => (
                      <DropdownMenuItem
                        asChild
                        className={cn("cursor-pointer hover:bg-muted focus:bg-muted", {
                          "bg-sky-100 text-sky-600": pathname === item.path,
                        })}
                        key={index}
                      >
                        <Link
                          href={item.path || ""}
                          className="hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground"
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
              <motion.span variants={subsection} className="whitespace-nowrap text-sm text-foreground">
                {item.title}
              </motion.span>
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
    <motion.div
      variants={subsection}
      className="grid grid-flow-row auto-rows-max space-y-1 text-sm text-muted-foreground"
    >
      {items.map((item, index) =>
        item.path ? (
          <motion.div variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }} key={index}>
            <Link
              key={index}
              href={item.path}
              className={cn("flex w-full items-center whitespace-nowrap rounded-md p-2 transition-colors", {
                "bg-sky-100 text-sky-600": pathname?.startsWith(item.path),
                "hover:bg-muted hover:text-foreground": !pathname?.startsWith(item.path),
              })}
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
