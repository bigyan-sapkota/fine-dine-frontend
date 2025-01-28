import DynamicText from "@/components/layouts/dynamic-text";
import { aboutUs } from "@/lib/constants";
import React from "react";

export default function AboutFinedine() {
  return (
    <div className="section-padding-x max-width">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        {/* subheading and heading */}
        <div className="lg:w-1/2">
          <DynamicText
            subheading="About Finedine"
            heading="New Ground with Dishes to be Enjoyed"
          />
        </div>

        {/* quote container */}
        <div className="lg:w-1/2">
          <p className="text-text-secondary">
            Welcome to Fine Dine, where technology meets convenience. Our goal
            is to revolutionize dining by offering a seamless table reservation
            experience, ensuring efficiency for restaurants and delightful
            moments for diners. Together, we’re shaping the future of dining
            experiences.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div>
              <img
                src="./home/quote.jpg"
                alt="quote provider"
                className="size-12 rounded-full object-cover"
              />
            </div>
            <div>
              <h5>Sudip Pandey</h5>
              <p>Finedine Contributor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-8 lg:mt-14 lg:flex-row">
        {aboutUs.map((item, i) => (
          <div key={item.id} className="w-full">
            <div
              className={`h-96 w-full rounded-3xl bg-cover bg-center bg-no-repeat p-6 ${i === 1 && "lg:mt-16"} group`}
              style={{
                backgroundImage: `url('${item.image}')`,
              }}
            >
              <div className="relative h-full rounded-2xl border-4 border-secondary">
                <button className="absolute bottom-0 left-0 h-fit w-full rounded-lg bg-secondary py-2 text-text-primary transition-all duration-1000 group-hover:top-0">
                  <h5 className="font-bold">{item.title}</h5>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
