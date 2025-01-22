import DynamicText from "@/components/layouts/dynamic-text";
import { aboutUs } from "@/lib/constants";
import React from "react";

export default function AboutFinedine() {
  return (
    <div className="section-padding-x">
      <div className="flex justify-between">
        {/* subheading and heading */}
        <div className="w-1/2">
          <DynamicText
            subheading="About Finedine"
            heading="New Ground with Dishes to be Enjoyed"
          />
        </div>

        {/* quote container */}
        <div className="w-1/2">
          <p className="text-text-secondary">
            Welcome to Fine Dine, where technology meets convenience. Our goal
            is to revolutionize dining by offering a seamless table reservation
            experience, ensuring efficiency for restaurants and delightful
            moments for diners. Together, we’re shaping the future of dining
            experiences.
          </p>

          <div className="flex items-center gap-4 mt-4">
            <div>
              <img
                src="./home/quote.jpg"
                alt="quote provider"
                className="size-16 object-cover rounded-full"
              />
            </div>
            <div>
              <h5>Sudip Pandey</h5>
              <p>Finedine Contributor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-16 justify-between mt-14">
        {aboutUs.map((item) => (
          <div
            key={item.id}
            className="w-full h-96 p-6 rounded-3xl bg-cover bg-no-repeat bg-center"
            style={{
              backgroundImage: `url('${item.image}')`,
            }}
          >
            <div className="border-4 border-secondary rounded-2xl h-full w-full flex flex-col justify-end">
              <button className="rounded-xl bg-secondary text-text-primary w-full py-2">
                <h5 className="font-bold">{item.title}</h5>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
