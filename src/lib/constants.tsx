import React from "react";
import { CiMobile3 } from "react-icons/ci";
import { IoMailOpenOutline } from "react-icons/io5";
import { Contact, NavigationLinks, SocialMedia } from "../../typing";

export const contact: Contact[] = [
  {
    id: 1,
    icon: <CiMobile3 />,
    text: "+977 9841644488",
    link: "tel:9841644488",
  },
  {
    id: 2,
    icon: <IoMailOpenOutline />,
    text: "info@finedine.com",
    link: "mailto:info@finedine.com",
  },
];

export const socialMedia: SocialMedia[] = [
  { id: 1, text: "Facebook", link: "https://www.facebook.com/" },
  { id: 2, text: "Instagram", link: "https://www.instagram.com/" },
  { id: 3, text: "YouTube", link: "https://www.youtube.com/" },
];

export const navigationLinks: NavigationLinks[] = [
  { id: 1, text: "Home", routeTo: "/" },
  { id: 2, text: "About", routeTo: "/about" },
  { id: 3, text: "Services", routeTo: "/services" },
  { id: 4, text: "Contact", routeTo: "/contact" },
];
