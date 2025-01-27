import { quickLinks, socialMedia, userFooter } from "@/lib/constants";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const contactLinks = [
  {
    id: 1,
    icon: <IoMdMail />,
    text: "info@finedine.com",
    link: "mailto:info@finedine.com",
  },
  {
    id: 2,
    icon: <FaPhoneAlt />,
    text: "+977 9841644488",
    link: "tel:9841644488",
  },
  {
    id: 3,
    icon: <IoLocationSharp />,
    text: "Bharatpur-9, Chitwan",
    link: "https://maps.app.goo.gl/NMN79D2hzti9KMRf7",
  },
];

const date = new Date();
const currYear = date.getFullYear();

export default function Footer() {
  return (
    <div className="bg-gray-100">
      <footer className="section-padding-x max-width">
        {/* top footer */}
        <div className="flex flex-col justify-between gap-8 py-10 lg:flex-row">
          {/* logo and text */}
          <div className="rounded-3xl bg-primary p-10 lg:w-[30%]">
            {/* logo */}
            <Link href="/">
              <p className="text-3xl font-extrabold tracking-wider text-white">
                Fin<span className="text-secondary">eD</span>ine
              </p>
            </Link>

            <h6 className="mt-2 text-white">
              Fine Dine simplifies online table reservations
            </h6>

            <h6 className="mt-2 text-white">
              Book your spot effortlessly enjoy exceptional hospitality.
            </h6>
          </div>

          {/* user */}
          <div>
            <div>
              <h4>User</h4>
              <div className="h-2 w-16 bg-secondary"></div>
            </div>

            <div className="mt-3 space-y-2 font-semibold">
              {userFooter.map((item) => (
                <Link
                  className="custom-transition flex items-center gap-2 hover:text-primary"
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
              <div className="h-2 w-[7.5rem] bg-secondary"></div>
            </div>

            <div className="mt-3 space-y-2 font-semibold">
              {quickLinks.map((item) => (
                <Link
                  className="custom-transition flex items-center gap-2 hover:text-primary"
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
              <h4>Help/Contact</h4>
              <div className="h-2 w-40 bg-secondary"></div>
            </div>

            <div className="mt-3 space-y-2 font-semibold">
              {contactLinks.map((item) => (
                <a
                  className="flex items-center gap-3"
                  key={item.id}
                  href={item.link}
                  target="_blank"
                >
                  <span className="text-lg text-primary">{item.icon}</span>
                  <span className="custom-transition cursor-pointer hover:text-primary">
                    {item.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* line */}
        <div className="h-1 bg-secondary lg:h-2"></div>

        {/* bottom footer */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 py-4 lg:flex-row lg:py-8">
          {/* copyright text */}
          <div className="flex gap-2 text-lg font-extrabold">
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
                  className="custom-transition border-b border-text-primary pb-0.5 font-bold hover:text-primary"
                >
                  {item.text}
                </a>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
