import {
  footerServices,
  quickLinks,
  socialMedia,
  userFooter,
} from "@/lib/constants";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";

const date = new Date();
const currYear = date.getFullYear();

export default function Footer() {
  return (
    <footer className="section-padding-x">
      {/* top footer */}
      <div className="flex justify-between py-10">
        {/* logo and text */}
        <div className="bg-secondary w-[30%] p-10 rounded-3xl">
          {/* logo */}
          <Link href="/">
            <p className="text-3xl font-extrabold tracking-wider text-white">
              Fin<span className="text-secondary">eD</span>ine
            </p>
          </Link>

          <h6 className="text-white mt-2">
            Fine Dine simplifies online table reservations
          </h6>

          <h6 className="text-white mt-2">
            Book your spot effortlessly ,enjoy exceptional hospitality.
          </h6>
        </div>

        {/* user */}
        <div>
          <div>
            <h4>About</h4>
            <div className="bg-secondary h-2 w-16"></div>
          </div>

          <div className="mt-3 space-y-2">
            {userFooter.map((item) => (
              <Link
                className="flex items-center gap-2 hover:text-primary custom-transition"
                key={item.id}
                href={item.routeTo}
              >
                <GoChevronRight />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* quick links */}
        <div>
          <div>
            <h4>Quick Links</h4>
            <div className="bg-secondary h-2 w-[7.5rem]"></div>
          </div>

          <div className="mt-3 space-y-2">
            {quickLinks.map((item) => (
              <Link
                className="flex items-center gap-2 hover:text-primary custom-transition"
                key={item.id}
                href={item.routeTo}
              >
                <GoChevronRight />
                <span>{item.text}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <div>
            <h4>Services</h4>
            <div className="bg-secondary h-2 w-24"></div>
          </div>

          <div className="mt-3 space-y-2">
            {footerServices.map((item) => (
              <div className="flex items-center gap-2" key={item.id}>
                <GoChevronRight />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* line */}
      <div className="h-2 bg-secondary"></div>

      {/* bottom footer */}
      <div className="py-8 flex items-center justify-between">
        {/* copyright text */}
        <div className="flex gap-2 font-extrabold text-lg">
          <p className="text-primary">&copy;{currYear} Finedine</p>
          <p>| All Rights Reserved</p>
        </div>

        {/* social media */}
        <div className="flex items-center gap-8">
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
    </footer>
  );
}
