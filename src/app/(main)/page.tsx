"use client";
import AboutFinedine from "@/components/pages/home/about-finedine";
import FollowInsta from "@/components/pages/home/follow-insta";
import HeroBanner from "@/components/pages/home/hero-banner";
import { useProfile } from "@/queries/use-profile";

export default function Page() {
  return (
    <div>
      <HeroBanner />

      <div className="section-margin-y ">
        <AboutFinedine />
      </div>

      <div className="section-margin-y">
        <FollowInsta />
      </div>
    </div>
  );
}
