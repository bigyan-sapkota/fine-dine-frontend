import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function HeroBanner() {
  return (
    <section
      className="bg-cover bg-no-repeat lg:h-[calc(100vh-5rem)]"
      style={{
        backgroundImage: "url('./home/hero-1.jpg')",
      }}
    >
      <div className="section-padding-x max-width mt-20 flex h-full items-center py-10 lg:mt-28 lg:py-0">
        <div>
          <div>
            <h2 className="text-3xl font-extrabold text-white lg:text-5xl">
              Finedine : Test The Finest
            </h2>
            <h1 className="mt-4 text-6xl font-extrabold text-secondary lg:text-9xl">
              Book Table
            </h1>
            <h4 className="mt-6 text-xl font-bold text-white lg:text-2xl">
              For your restaurant
            </h4>
          </div>

          {/* button */}
          <div className="mt-10">
            <Link href="/reserve-table">
              <Button variant="primary" size="lg">
                Reserve A Table
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
