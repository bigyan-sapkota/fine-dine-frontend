import DynamicText from "@/components/layouts/dynamic-text";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="max-width section-padding-x flex flex-col items-center gap-8 text-text-primary lg:flex-row lg:justify-between lg:gap-16">
      {/* image */}
      <div className="lg:w-1/2">
        <Image
          src="/about/about-us.jpg"
          width="700"
          height="400"
          alt="what we do"
          className="w-full rounded-xl lg:w-[550px]"
        />
      </div>
      {/* text content and button */}
      <div className="lg:w-1/2">
        <div className="">
          <DynamicText
            subheading="What We Do"
            heading="Seamless Dining, Simplified Reservations"
          />
        </div>

        <p className="mt-4 text-black">
          Fine Dine is your ultimate dining companion, revolutionizing the way
          you reserve tables at your favorite restaurants. With its
          user-friendly platform, Fine Dine makes table reservations seamless,
          helping you avoid long waits and ensure a hassle-free dining
          experience. Whether it’s a cozy dinner for two or a large gathering
          with friends, Fine Dine allows you to browse restaurants, check
          availability, and secure your spot in just a few clicks. Elevate your
          dining experience with Fine Dine, where convenience meets exceptional
          service, turning every meal into a memorable occasion.
        </p>

        <Link href="/products" className="mt-8 block text-center lg:text-left">
          <Button size="lg" variant="primary">
            View Products
          </Button>
        </Link>
      </div>
    </section>
  );
}
