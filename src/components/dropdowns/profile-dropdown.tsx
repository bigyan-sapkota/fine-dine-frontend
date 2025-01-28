import { useProfile } from "@/queries/use-profile";
import {
  Bell,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  NotebookPen,
  User,
} from "lucide-react";
import LogoutDialog from "../dialogs/logout-dialog";
import ProfileDialog from "../dialogs/profile-dialog";
import NotificationsDrawer from "../drawers/notifications-drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import BookingHistory from "../dialogs/booking-history-dialog";

type Props = { children: React.ReactNode };

export default function ProfileDropdown({ children }: Props) {
  const { data: profile } = useProfile();

  if (!profile) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-44">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="p-0 [&>svg]:hidden">
            <ProfileDialog>
              <button className="flex w-full items-center px-2 py-1.5">
                <User className="mr-2 size-4" />
                <span>Profile</span>
              </button>
            </ProfileDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="p-0 [&>svg]:hidden">
            <ProfileDialog>
              <Link
                href="/dashboard"
                className="flex w-full items-center px-2 py-1.5"
              >
                {/* <LayoutDashboard /> */}
                <LayoutDashboard className="mr-2 size-4" />
                <span>Dashboard</span>
              </Link>
            </ProfileDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="p-0 [&svg]:hidden">
            <NotificationsDrawer>
              <button className="flex w-full items-center px-2 py-1.5">
                <Bell className="mr-2 size-4" />
                <span>Notifications</span>
              </button>
            </NotificationsDrawer>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>

        {/* if role is "user" show book a table */}
        {profile?.role === "user" && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="sm:hidden">
              <div>
                <button className="flex w-full items-center px-2 py-1.5">
                  <NotebookPen className="mr-2 size-4" />
                  <span>Book an table</span>
                </button>
              </div>
            </DropdownMenuSubTrigger>
          </DropdownMenuSub>
        )}

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="p-0 [&>svg]:hidden">
            <LogoutDialog>
              <button className="flex w-full items-center px-2 py-1.5">
                <LogOut className="mr-2 size-4" />
                <span>Logout</span>
              </button>
            </LogoutDialog>
          </DropdownMenuSubTrigger>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
