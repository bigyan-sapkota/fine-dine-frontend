"use client";
import {
  BetweenVerticalEnd,
  BookText,
  LayoutGrid,
  LogOut,
  LucideIcon,
  SquareMenu,
  UsersRound,
} from "lucide-react";
import LogoutDialog from "../dialogs/logout-dialog";
import { usePathname } from "next/navigation";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ProgressLink } from "@jodd/next-top-loading-bar";
import Link from "next/link";

export const dashboardLinks: {
  title: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: BookText,
  },
  { title: "Tables", href: "/dashboard/tables", icon: BetweenVerticalEnd },
  { title: "Manage Roles", href: "/dashboard/roles", icon: UsersRound },
  { title: "Menu", href: "/dashboard/menu", icon: SquareMenu },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        poppins.className,
        "left-0 top-0 z-50 hidden h-scree min-h-scree w-64 flex-col overflow-y-auto border-r py-3 text-sm font-semibold lg:flex"
      )}
    >
      {bgGraphics}
      <Link href="/" className="px-6 text-3xl">
        <p className="text-3xl font-extrabold tracking-wider">
          Fin<span className="text-primary">eD</span>ine
        </p>
      </Link>

      <nav className="mt-5 flex h-full flex-grow flex-col">
        {dashboardLinks.map((link) => (
          <ProgressLink
            key={link.title}
            href={link.href}
            className={cn(
              "mb-1 flex h-12 items-center space-x-3 pl-4 hover:bg-primary/10 hover:text-primary",
              {
                "border-l-4 border-primary bg-primary/10 text-primary":
                  link.href === pathname,
              }
            )}
          >
            <link.icon className="size-5" />
            <span>{link.title}</span>
          </ProgressLink>
        ))}

        <LogoutDialog>
          <button className="mb-3 flex w-fit items-center space-x-3 pl-4 mt-3 text-red-600 hover:text-black custom-transition">
            <LogOut className="size-5" />
            <span>Logout</span>
          </button>
        </LogoutDialog>
      </nav>
    </aside>
  );
}

const bgGraphics = (
  <>
    <div className="fixed left-0 top-0 -z-10 hidden aspect-square w-60 rounded-full bg-primary/10 mix-blend-multiply blur-3xl filter lg:block" />
    <div className="fixed left-0 top-32 -z-10 hidden aspect-square w-60 rounded-full bg-primary/10 mix-blend-multiply blur-3xl filter lg:block" />
    <div className="fixed left-0 top-64 -z-10 hidden aspect-square w-60 rounded-full bg-primary/10 mix-blend-multiply blur-3xl filter lg:block" />
    <div className="fixed left-0 top-96 -z-10 hidden aspect-square w-60 rounded-full bg-primary/10 mix-blend-multiply blur-3xl filter lg:block" />
  </>
);
