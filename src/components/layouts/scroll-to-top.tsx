"use client";
import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);

      // Show button when page is scrolled down beyond 300 pixels
      setIsVisible(scrollTop > 300);
    };

    // Add scroll event listener
    window.addEventListener("scroll", calculateScrollProgress);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", calculateScrollProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div
      className="group fixed bottom-6 right-6 z-50"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 50,
      }}
    >
      <div
        className="relative"
        style={{
          width: "56px",
          height: "56px",
        }}
      >
        {/* Circular Progress Border */}
        <svg
          className="absolute left-0 top-0 h-full w-full rotate-[-90deg]"
          viewBox="0 0 56 56"
        >
          {/* Background Circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            strokeWidth="4"
            className="stroke-primary/20 group-hover:stroke-secondary"
          />
          {/* Progress Circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            strokeWidth="4"
            className="custom-transition stroke-primary transition-all duration-200 ease-out group-hover:stroke-secondary"
            strokeDasharray="163.36" // 2 * π * 26
            strokeDashoffset={`${163.36 * (1 - scrollProgress / 100)}`}
          />
        </svg>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary p-2 shadow-lg transition-all duration-300 group-hover:bg-secondary"
          aria-label="Scroll to top"
        >
          <ChevronUp color="white" size={24} />
        </button>
      </div>
    </div>
  );
};

export default ScrollToTop;
