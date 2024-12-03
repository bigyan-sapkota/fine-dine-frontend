import { contact, navigationLinks, socialMedia } from "@/lib/constants";
import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <div>
      {/* top part */}
      <div className="bg-secondary py-3 section-padding-x lg:flex items-center justify-between hidden">
        {/* contact details */}
        <div className="flex items-center gap-4 ">
          {contact.map((item) => (
            <div className="flex items-center gap-0.5" key={item.id}>
              <i className="bg-primary text-white p-2 text-xl rounded-full">
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

        {/* login register text */}
        <div className="flex items-center gap-2">
          <IoPersonCircleOutline className="text-3xl" />
          <p className="font-bold hover:text-primary custom-transition hover:cursor-pointer">
            Login / Register
          </p>
        </div>
      </div>

      {/* bottom part */}
      <div className="flex items-center section-padding-x py-4 justify-between">
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
          <Link href="/reserve-a-table">
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold">
              Reserve A Table
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
