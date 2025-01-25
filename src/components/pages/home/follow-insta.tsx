import React from "react";
import { FaInstagram } from "react-icons/fa6";

export default function FollowInsta() {
  return (
    <section
      className="h-72 bg-cover bg-center bg-no-repeat lg:h-96"
      style={{
        backgroundImage: "url('/home/follow.jpg')",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="max-width section-padding-x h-full">
        <div className="flex h-full flex-col items-center justify-center gap-2.5">
          <div className="w-fit rounded-full bg-primary p-5 text-white">
            <FaInstagram className="text-6xl" />
          </div>
          <a
            href="https://www.instagram.com"
            target="_blank"
            className="custom-transition"
          >
            <h1 className="custom-transition text-center text-white hover:text-primary hover:underline lg:text-left">
              Follow @FineDine.com
            </h1>
          </a>
          <p className="text-center text-white lg:text-left">
            Join Our Community to inspire your desire
          </p>
        </div>
      </div>
    </section>
  );
}
