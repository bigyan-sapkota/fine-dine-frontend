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
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";

export default function Navbar() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const [isOpen, setOpen] = useState<boolean>(false);

  const pathname = usePathname();
  return (
    <div
      className={cn(
        "left-0 top-0 z-[9999] h-20 w-full border-b bg-white/70 filter backdrop-blur-2xl lg:h-32",
        {
          fixed: pathname === "/",
          sticky: pathname !== "/",
        },
      )}
    >
      {/* top part */}
      <div className="bg-secondary">
        <div className="section-padding-x max-width hidden h-12 items-center justify-between lg:flex">
          {/* contact details */}
          <div className="flex items-center gap-4">
            {contact.map((item) => (
              <div className="flex items-center gap-0.5" key={item.id}>
                <i className="rounded-full bg-primary p-1.5 text-xl text-white">
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
                  className="custom-transition border-b border-text-primary pb-0.5 font-bold hover:text-primary"
                >
                  {item.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom part */}
      <div className="section-padding-x max-width flex items-center justify-between pt-5">
        {/* logo */}
        <Link href="/">
          <p className="text-3xl font-extrabold tracking-wider">
            <span className="hidden sm:block">
              Fin<span className="text-primary">eD</span>ine
            </span>
            <span className="sm:hidden">
              F<span className="text-primary">d</span>
              <sup>.</sup>
            </span>
          </p>
        </Link>

        {/* navigation bar */}
        <nav className="hidden items-center gap-14 lg:flex">
          {navigationLinks.map((item) => (
            <Link href={item.routeTo} key={item.id} className="font-extrabold">
              {item.text}
            </Link>
          ))}
        </nav>

        {/* navigation bar for mobile screen */}
        {isOpen && (
          <nav className="absolute left-0 top-0 w-screen space-y-5 bg-primary py-20 text-center text-white lg:hidden">
            {navigationLinks.map((item, i) => (
              <Link href={item.routeTo} key={i} className="block">
                {item.text}
              </Link>
            ))}
          </nav>
        )}

        {/* login / register */}
        <div>
          {/* login register text */}
          {!profile && !isLoadingProfile && (
            <div className="flex items-center gap-2">
              <IoPersonCircleOutline className="text-3xl" />
              <Link
                href="/login"
                className="custom-transition font-bold hover:cursor-pointer hover:text-primary"
              >
                Login
              </Link>
              <span>/</span>
              <Link
                href="/register"
                className="custom-transition font-bold hover:cursor-pointer hover:text-primary"
              >
                Register
              </Link>
            </div>
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
                    className="rounded-full border-2 border-white p-0.5 shadow"
                  />
                </button>
              </ProfileDropdown>
            </div>
          )}
        </div>

        <div
          className={`relative z-50 size-12 rounded-full ${isOpen ? "bg-white/40" : "bg-primary"} flex items-center justify-center text-white lg:hidden`}
        >
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        </div>
      </div>
    </div>
  );
}
