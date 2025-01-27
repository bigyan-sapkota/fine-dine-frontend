"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

const Hero = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const path = usePathname();
  const pathsArray = path.split("/").filter((item) => item !== "");

  const allPaths = pathsArray.map((item) => ({
    text: item,
    routeTo: `/${item}`,
  }));

  const breadCrumbPath = [{ text: "home", routeTo: "/" }, ...allPaths];

  return (
    <div className="h-fit bg-blue-50">
      <div
        className="h-full bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/background.png')",
        }}
      >
        <div className="max-width section-padding-x flex h-full flex-col items-center py-10 lg:py-20">
          <h1>{title}</h1>
          <h5 className="py-6 text-center tracking-wide lg:text-left">
            {description}
          </h5>

          <div className="flex items-center text-lg font-semibold">
            {breadCrumbPath.map((item, i) => (
              <div key={i} className="flex items-center">
                {i !== breadCrumbPath.length - 1 && (
                  <Link
                    href={item.routeTo}
                    className="custom-transition capitalize hover:text-primary"
                  >
                    {item.text}
                  </Link>
                )}
                {i !== breadCrumbPath.length - 1 && <FaAngleRight size={20} />}
                {i === breadCrumbPath.length - 1 && (
                  <div className="capitalize text-primary">{item.text}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
