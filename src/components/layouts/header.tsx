"use client";
import { contact, navigationLinks, socialMedia } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useProfile } from "@/queries/use-profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoPersonCircleOutline } from "react-icons/io5";
import ProfileDropdown from "../dropdowns/profile-dropdown";
import Avatar from "@/components/utils/avatar";
import { Skeleton } from "../ui/skeleton";

export default function Navbar() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "left-0 top-0 z-10 h-32 w-full bg-white/70 filter backdrop-blur-2xl border-b",
        {
          fixed: pathname === "/",
          sticky: pathname !== "/",
        }
      )}
    >
      {/* top part */}
      <div className="bg-secondary h-12 section-padding-x lg:flex items-center justify-between hidden">
        {/* contact details */}
        <div className="flex items-center gap-4 ">
          {contact.map((item) => (
            <div className="flex items-center gap-0.5" key={item.id}>
              <i className="bg-primary text-white p-1.5 text-xl rounded-full">
                {item.icon}
              </i>
              <a href={item.link} target="_blank" className="font-bold">
                {item.text}
              </a>
            </div>
          ))}
        </div>

        {/* social media */}
        <div className="flex items-center gap-4">
          {socialMedia.map((item) => (
            <div key={item.id}>
              <a
                href={item.link}
                target="_blank"
                className="font-bold border-b border-text-primary pb-0.5 hover:text-primary custom-transition"
              >
                {item.text}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* bottom part */}
      <div className="flex items-center section-padding-x pt-5 justify-between">
        {/* logo */}
        <Link href="/">
          <p className="text-3xl font-extrabold tracking-wider">
            Fin<span className="text-primary">eD</span>ine
          </p>
        </Link>

        {/* navigation bar */}
        <nav className="flex items-center gap-14">
          {navigationLinks.map((item) => (
            <Link href={item.routeTo} key={item.id} className="font-extrabold">
              {item.text}
            </Link>
          ))}
        </nav>

        {/* button */}
        <div>
          {/* login register text */}
          {!profile && !isLoadingProfile && (
            <Link href="/login" className="flex items-center gap-2">
              <IoPersonCircleOutline className="text-3xl" />
              <p className="font-bold hover:text-primary custom-transition hover:cursor-pointer">
                Login / Register
              </p>
            </Link>
          )}

          {isLoadingProfile && (
            <Skeleton className="h-10 w-24 lg:w-44"></Skeleton>
          )}

          {profile && (
            <div className="flex items-center space-x-1.5 text-sm">
              <div className="hidden sm:inline">
                <span className="mr-1">Welcome, </span>
                <span className="font-bold">{profile.name.split(" ")[0]}</span>
              </div>
              <ProfileDropdown>
                <button>
                  <Avatar
                    src={profile.image}
                    variant="lg"
                    className="border-white border-2 rounded-full p-0.5 shadow"
                  />
                </button>
              </ProfileDropdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
