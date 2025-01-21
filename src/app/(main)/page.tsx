"use client";
import AboutFinedine from "@/components/pages/home/about-finedine";
import FollowInsta from "@/components/pages/home/follow-insta";
import HeroBanner from "@/components/pages/home/hero-banner";
import { useProfile } from "@/queries/use-profile";

export default function Page() {
  const { data, isLoading, isError } = useProfile();
  console.log(data, isLoading, isError);
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
