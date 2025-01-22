"use client";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { dashboardLinks } from "../layouts/dashboard-sidebar";
import { ProgressLink } from "@jodd/next-top-loading-bar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
export default function DashboardMenuDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="mr-auto h-screen w-[calc(100%-32px)] rounded-l-none sm:w-96">
        <DrawerHeader>
          <DrawerTitle className="text-4xl">
            <p className="text-3xl font-extrabold tracking-wider">
              Fin<span className="text-primary">eD</span>ine
            </p>
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription></DrawerDescription>
        <nav className="mt-3 flex h-full flex-col space-y-1 overflow-y-auto text-sm">
          {dashboardLinks.map((link) => (
            <ProgressLink
              key={link.href}
              href={link.href}
              onClick={() => {
                closeButtonRef.current?.click();
              }}
              className={cn("flex items-center space-x-2 p-4 font-semibold", {
                "bg-pink-600/10 text-pink-600": link.href === pathname,
              })}
            >
              <link.icon className="size-5" />
              <span>{link.title}</span>
            </ProgressLink>
          ))}
        </nav>

        <DrawerFooter>
          <DrawerClose asChild ref={closeButtonRef}>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
