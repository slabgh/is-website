"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head"; // Import next/head

const Hero = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/images/hero/chat.jpg",
    "/images/hero/DPS Website.jpg",
    "/images/hero/CAD_edited.jpg", // Add the paths to your hero images
  ];

  useEffect(() => {
    // Set an interval to change the image every 80 seconds (80000ms)
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 80000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      {/* Add metadata for the Hero section */}
      <Head>
        <title>Streamline Your Business | Scalable Communication Solutions</title>
        <meta
          name="description"
          content="Streamline your business and satisfy your customers with scalable, secure, and effortless communication solutions designed to drive your growth."
        />
        <meta property="og:title" content="Streamline Your Business" />
        <meta
          property="og:description"
          content="Discover scalable, secure, and effortless communication solutions for your business growth."
        />
        <meta property="og:image" content={images[index]} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ismartghana.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section
        id="home"
        className="relative z-10 h-[90vh] w-full overflow-hidden bg-gray-dark"
      >
        <div className="h-full relative">
          {/* Image and Overlay */}
          <div className="absolute inset-0 flex justify-center items-center">
            <Image
              src={images[index]}
              alt={`Hero Image ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
                objectPosition: index === 0 ? "top" : "center",
              }}
              className="transition-all duration-700 ease-in-out"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        </div>

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-start text-left text-white px-8">
          <div className="relative flex items-start mt-40">
            {/* Blue Vertical Line */}
            <div className="w-2 bg-blue-500 mr-6 self-stretch"></div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Streamline Your Business,
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Satisfy Your Customers
              </h1>
              <p className="mt-2 text-lg md:text-2xl">
                Experience the Power of Scalable, Secure,
              </p>
              <p className="mt-0 text-lg md:text-2xl">
                and Effortless Communication Solutions to Drive Your Growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
