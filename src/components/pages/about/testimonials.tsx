"use client";
// Import Swiper React components
import { FaStar } from "react-icons/fa6";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import DynamicText from "@/components/layouts/dynamic-text";
import { ImQuotesLeft } from "react-icons/im";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Nishan Raimaji",
    role: "Customer",
    statement:
      "Fine Dine made booking a table effortless! The experience was seamless and the service outstanding.",
    rating: 4,
  },
  {
    name: "Ronit Adhikari",
    role: "Customer",
    statement:
      "The perfect platform for dining reservations. Fine Dine saved us so much time and hassle!",
    rating: 5,
  },
  {
    name: "Mrunal Thakur",
    role: "Customer",
    statement:
      "Fine Dine's easy-to-use platform ensures we always get the best dining experiences. Highly recommended!",
    rating: 4,
  },
  {
    name: "Bikash Paudel",
    role: "Customer",
    statement:
      "Thanks to Fine Dine, our family dinners are planned stress-free. A game-changer for foodies!",
    rating: 5,
  },
  {
    name: "Jyoti Dhakal",
    role: "Customer",
    statement:
      "Dining out has never been this convenient. Fine Dine truly elevates the whole experience.",
    rating: 4,
  },
];

export default function Testimonial() {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className}"><img src="/about/testimonials/profile-${index + 1}.jpg" class="rounded-full"/></span>`;
    },
  };

  return (
    <section className="section-padding-x max-width lg:py-20" id="about">
      <div className="flex flex-col items-center justify-between lg:max-h-[500px] lg:flex-row">
        {/* text and button */}
        <div className="lg:w-1/2">
          <DynamicText
            heading="Testimonials"
            subheading="Our Customer Feedbacks"
          />
          <div className="hidden lg:block">
            <Swiper
              pagination={pagination}
              modules={[Pagination]}
              className="mt-4 max-w-full"
              slidesPerView={1}
            >
              {testimonials.map((testimonial, i) => (
                <SwiperSlide
                  key={i}
                  className="relative mb-24 w-full rounded-3xl border-4 border-secondary p-6"
                >
                  <p className="text-center text-lg lg:text-left">
                    &quot; {testimonial.statement} &quot;
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    {/* name and role */}
                    <div>
                      <h4 className="text-center font-bold lg:text-left">
                        {testimonial.name}
                      </h4>
                      <p className="mt-1 text-center text-gray-600 lg:mb-8 lg:text-left">
                        -{testimonial.role}
                      </p>
                    </div>

                    <div className="flex items-center pr-24">
                      {new Array(testimonial.rating).fill("").map((item, i) => (
                        <div key={i} className="text-secondary">
                          <FaStar />
                        </div>
                      ))}
                      {new Array(5 - testimonial.rating)
                        .fill("")
                        .map((item, i) => (
                          <div key={i} className="text-gray-400">
                            <FaStar />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-6 flex size-16 items-center justify-center rounded-full bg-secondary text-4xl text-black">
                    <ImQuotesLeft />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="lg:hidden">
            <TestimonialSwiper />
          </div>
        </div>

        <div className="relative hidden h-[600px] w-full lg:block">
          <div>
            <img
              src="/about/cup.jpg"
              alt="cup"
              className="absolute left-1/2 top-0 z-20 size-52 -translate-x-1/2 rounded-xl object-cover"
            />
          </div>
          <div>
            <img
              src="/about/beef.jpg"
              alt="cup"
              className="absolute left-28 top-28 z-10 size-64 rounded-xl"
            />
          </div>
          <div>
            <img
              src="/about/cake.jpg"
              alt="cake"
              className="absolute bottom-0 right-0 z-20 size-80 rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const TestimonialSwiper = () => {
  const testimonials = [
    {
      name: "Nishan Raimaji",
      role: "Customer",
      statement:
        "Fine Dine made booking a table effortless! The experience was seamless and the service outstanding.",
      rating: 4,
    },
    {
      name: "Ronit Adhikari",
      role: "Customer",
      statement:
        "The perfect platform for dining reservations. Fine Dine saved us so much time and hassle!",
      rating: 5,
    },
    {
      name: "Mrunal Thakur",
      role: "Customer",
      statement:
        "Fine Dine's easy-to-use platform ensures we always get the best dining experiences. Highly recommended!",
      rating: 4,
    },
    {
      name: "Bikash Paudel",
      role: "Customer",
      statement:
        "Thanks to Fine Dine, our family dinners are planned stress-free. A game-changer for foodies!",
      rating: 5,
    },
    {
      name: "Jyoti Dhakal",
      role: "Customer",
      statement:
        "Dining out has never been this convenient. Fine Dine truly elevates the whole experience.",
      rating: 4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  return (
    <div className="relative w-full px-4 py-8 md:hidden">
      <div className="relative overflow-hidden rounded-lg bg-gray-50 p-6 shadow-md">
        <div className="mb-4">
          <div className="flex items-center gap-1">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        <p className="mb-4 min-h-[80px] px-5 text-gray-600">
          "{testimonials[currentIndex].statement}"
        </p>

        <div className="mt-4">
          <p className="font-semibold text-gray-800">
            {testimonials[currentIndex].name}
          </p>
          <p className="text-sm text-gray-500">
            {testimonials[currentIndex].role}
          </p>
        </div>

        <div className="absolute bottom-2 left-0 right-0 mt-4 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
