import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import Consultation from "@/components/Consultation"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "iSmart International Ghana Limited",
  description: "Discover iSmart, Africa's trusted partner for Bulk SMS, USSD, Digital Payments, & Toll-Free solutions. Simplify communication & grow your business today",

  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <Testimonials />
      <Pricing />
      <Blog />

      <Contact />
    </>
  );
}
