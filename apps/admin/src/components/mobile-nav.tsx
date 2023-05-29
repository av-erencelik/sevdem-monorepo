"use client";
import { sidebarConfig as items } from "@/config/sidebar";
import { cn } from "@/lib/utils";
import { SidebarOpen } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { Button, ScrollArea, Sheet, SheetContent, SheetTrigger } from "ui";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base text-sky-600 hover:bg-transparent hover:text-sky-600/80 focus:text-sky-600/80 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <SidebarOpen className="h-6 w-6" />
          <span className="sr-only">Menuyu aç ya da kapa</span>
        </Button>
      </SheetTrigger>
      <SheetContent size="xl" position="left" className="bg-background pr-0 text-foreground">
        <MobileLink href="/">
          <span className="ml-6 font-bold text-sky-600">Sevdem Admin</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-65px)] pb-10 pl-6">
          <div className="flex flex-col space-y-3 pr-5">
            {items.map(
              (item, index) =>
                item.icon && (
                  <div className="flex flex-col space-y-1 pt-6" key={index}>
                    <div className="mb-1 flex py-1">
                      <item.icon
                        className="mr-2 inline-block max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]"
                        size={24}
                      />
                      <h4 className="text-base font-medium">{item.title}</h4>
                    </div>
                    {item?.items?.length &&
                      item.items.map((item) => (
                        <Fragment key={item.title}>
                          {item.path ? (
                            <MobileLink
                              href={item.path}
                              onOpenChange={setOpen}
                              className={cn(
                                "text-foregound/70 flex w-full items-center whitespace-nowrap rounded-md p-2 text-sm transition-colors",
                                {
                                  "bg-sky-100 text-sky-600": pathname === item.path,
                                  "hover:bg-muted hover:text-foreground": pathname !== item.path,
                                }
                              )}
                            >
                              {item.title}
                            </MobileLink>
                          ) : null}
                        </Fragment>
                      ))}
                  </div>
                )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
export default MobileNav;
