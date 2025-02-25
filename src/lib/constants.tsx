import React from "react";
import { CiMobile3 } from "react-icons/ci";
import { IoMailOpenOutline } from "react-icons/io5";
import {
  AboutUs,
  Contact,
  FooterColumn,
  NavigationLinks,
  SocialMedia,
} from "../../typing";

export const dummyUserImage =
  "https://avatars.githubusercontent.com/u/110604197?v=4";

export const BACKEND_URL = "https://finedine-x.vercel.app";

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
];

export const aboutUs: AboutUs[] = [
  {
    id: 1,
    image: "./home/about-1.jpg",
    title: "Seamless Booking",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae error praesentium sunt ab obcaecati. Ab facilis illo quod est pariatur.",
  },
  {
    id: 2,
    image: "./home/about-2.jpg",
    title: "Dynamic Menu",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae error praesentium sunt ab obcaecati. Ab facilis illo quod est pariatur.",
  },
  {
    id: 3,
    image: "./home/about-3.jpg",
    title: "Simplified Dining",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae error praesentium sunt ab obcaecati. Ab facilis illo quod est pariatur.",
  },
];

export const userFooter: FooterColumn[] = [
  { id: 1, text: "Sign in ", routeTo: "/login" },
  { id: 2, text: "Sign Up", routeTo: "/register" },
  { id: 3, text: "Contact Us", routeTo: "/contact" },
];

export const quickLinks: FooterColumn[] = [
  { id: 1, text: "Home ", routeTo: "/" },
  { id: 2, text: "About Us", routeTo: "/about" },
];
