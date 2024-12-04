import Navbar from "@/components/layout/navbar";
import AboutFinedine from "@/components/pages/home/about-finedine";
import HeroBanner from "@/components/pages/home/hero-banner";

export default function Page() {
  return (
    <div>
      <Navbar />
      <HeroBanner />

      <div className="section-margin-y ">
        <AboutFinedine />
      </div>
    </div>
  );
}
