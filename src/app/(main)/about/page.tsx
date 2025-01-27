import Hero from "@/components/layouts/hero";
import AboutUs from "@/components/pages/about/about-us";
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
    </div>
  );
};

export default Page;
