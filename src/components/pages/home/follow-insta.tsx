import React from "react";
import { FaInstagram } from "react-icons/fa6";

export default function FollowInsta() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat h-96 "
      style={{
        backgroundImage: "url('/home/follow.jpg')",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="flex items-center justify-center flex-col gap-2.5 h-full">
        <div className="bg-primary text-white w-fit p-5 rounded-full">
          <FaInstagram className="text-6xl" />
        </div>
        <a
          href="https://www.instagram.com"
          target="_blank"
          className="custom-transition"
        >
          <h1 className="custom-transition hover:underline text-white hover:text-primary">
            Follow @FineDine.com
          </h1>
        </a>
        <p className="text-white">Join Our Community to inspire your desire</p>
      </div>
    </section>
  );
}
