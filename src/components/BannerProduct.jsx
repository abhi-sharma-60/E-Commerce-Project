import React, { useEffect, useState } from "react";
import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";

import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import image3Mobile from "../assets/banner/img3_mobile.jpg";
import image4Mobile from "../assets/banner/img4_mobile.jpg";
import image5Mobile from "../assets/banner/img5_mobile.png";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === desktopImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? desktopImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 rounded-2xl overflow-hidden select-none relative max-w-7xl">
      <div className="relative h-56 md:h-80 w-full rounded-2xl shadow-strong overflow-hidden bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700">
        {/* Desktop & Tablet */}
        <div
          className="hidden md:flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {desktopImages.map((imageUrl, index) => (
            <div key={index} className="min-w-full min-h-full flex-shrink-0 relative">
              <img
                src={imageUrl}
                alt={`banner-${index}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div
          className="flex md:hidden h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {mobileImages.map((imageUrl, index) => (
            <div key={index} className="min-w-full min-h-full flex-shrink-0 relative">
              <img
                src={imageUrl}
                alt={`banner-mobile-${index}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="hidden md:flex absolute inset-0 items-center justify-between px-6 pointer-events-none">
          <button
            onClick={prevImage}
            className="pointer-events-auto bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-700 shadow-strong rounded-full p-4 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-110 group"
            aria-label="Previous Image"
            type="button"
          >
            <FaAngleLeft size={20} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          </button>

          <button
            onClick={nextImage}
            className="pointer-events-auto bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-neutral-700 shadow-strong rounded-full p-4 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 hover:scale-110 group"
            aria-label="Next Image"
            type="button"
          >
            <FaAngleRight size={20} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {desktopImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImage === idx
                  ? "bg-white shadow-glow scale-125"
                  : "bg-white/60 hover:bg-white/80 hover:scale-110"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;