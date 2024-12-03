import Link from "next/link";
import React from "react";

export default function HeroBanner() {
  return (
    <section
      className="h-[90vh] bg-no-repeat bg-cover section-padding-x flex items-center"
      style={{
        backgroundImage: "url('./home/hero-1.jpg')",
      }}
    >
      <div>
        <div>
          <h2 className="text-5xl text-white font-extrabold">Grilled Cheese</h2>
          <h1 className="text-9xl font-extrabold text-secondary">Burger</h1>
          <h4 className="font-bold text-white text-2xl mt-6">
            Limited Time Offer
          </h4>
        </div>

        {/* button */}
        <div className="mt-6">
          <Link href="/reserve-a-table">
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold">
              Reserve A Table
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
