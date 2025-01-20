"use client";
import { useEffect } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  useEffect(() => {
    const glide = new Glide(".glide", {
      type: "carousel",
      autoplay: 900, // Auto advance every 2 seconds
      perView: 4, // Number of slides to show
      breakpoints: {
        1024: {
          perView: 4,
        },
        768: {
          perView: 2,
        },
        480: {
          perView: 1,
        },
      },
    }).mount();
    
    // Clean up Glide instance on component unmount
    return () => glide.destroy();
  }, []);

  return (
    <section className="pt-16">
      <div className="container">
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {brandsData.map((brand) => (
                <li className="glide__slide" key={brand.id}>
                  <SingleBrand brand={brand} />
                </li>
              ))}
            </ul>
          </div>
          {/* Add pagination and navigation if needed */}
          <div data-glide-el="controls">
            <button data-glide-dir="<" className="glide__arrow glide__arrow--left">‹</button>
            <button data-glide-dir=">" className="glide__arrow glide__arrow--right">›</button>
          </div>
          <div data-glide-el="controls[nav]">
            <button data-glide-dir="=0" className="glide__bullet"></button>
            <button data-glide-dir="=1" className="glide__bullet"></button>
            {/* Add more bullets dynamically based on the number of slides */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { image, name, Link } = brand; // Destructure link

  return (
    <div className="flex items-center justify-center px-3 py-[15px]">
      <a
        href={Link}  // Use the brand link here
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-20 w-full opacity-70 transition hover:opacity-100"
      >
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            style={{ objectFit: "contain" }}
            className="block"
          />
        </div>
      </a>
    </div>
  );
};
