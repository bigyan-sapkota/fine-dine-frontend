"use client";
import { useProfile } from "@/queries/use-profile";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "./dashboard-sidebar";
import { cn } from "@/lib/utils";
import { poppins } from "@/lib/fonts";
import Link from "next/link";
import ProfileDropdown from "../dropdowns/profile-dropdown";
import Avatar from "../utils/avatar";
import DashboardMenuDrawer from "../drawers/dashboard-menu-drawer";
import { Menu } from "lucide-react";

export default function DashboardHeader() {
  const pathname = usePathname();
  const { data: profile } = useProfile();
  const currentPage = dashboardLinks.find((link) => link.href === pathname);

  if (!profile) return null;

  return (
    <header
      className={cn(
        poppins.className,
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/80 px-4 text-sm filter backdrop-blur-2xl"
      )}
    >
      <h3 className="hidden text-lg font-semibold lg:block">
        {currentPage?.title || "Dashboard"}
      </h3>

      <div className="ml-aut flex items-center space-x-2">
        <span className="hidden sm:inline">Welcome, </span>
        <span className="hidden font-bold sm:inline">
          {profile.name.split(" ")[0]}
        </span>

        <ProfileDropdown>
          <button>
            <Avatar src={profile.image} />
          </button>
        </ProfileDropdown>
      </div>

      <DashboardMenuDrawer>
        <button className="ml-3 lg:hidden">
          <Menu className="size-6 text-gray-900" />
        </button>
      </DashboardMenuDrawer>
    </header>
  );
}
