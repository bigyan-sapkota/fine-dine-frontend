"use client";

import Hero from "@/components/layouts/hero";
import AboutUs from "@/components/pages/about/about-us";
import Testimonial from "@/components/pages/about/testimonials";
import React from "react";

const Page = () => {
  return (
    <div>
      <Hero
        title="About Us"
        description="Fine Dine: Where Every Reservation Creates Memories."
      />

      <div className="section-margin-y">
        <AboutUs />
      </div>

      <div className="section-margin-y">
        <Testimonial />
      </div>
    </div>
  );
};

export default Page;
