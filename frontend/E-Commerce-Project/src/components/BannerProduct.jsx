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
    <div className="container mx-auto px-4 rounded-lg overflow-hidden select-none relative max-w-7xl">
      <div className="relative h-56 md:h-72 w-full rounded-lg shadow-lg overflow-hidden bg-gray-100">
        {/* Desktop & Tablet */}
        <div
          className="hidden md:flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {desktopImages.map((imageUrl, index) => (
            <div key={index} className="min-w-full min-h-full flex-shrink-0">
              <img
                src={imageUrl}
                alt={`banner-${index}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div
          className="flex md:hidden h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {mobileImages.map((imageUrl, index) => (
            <div key={index} className="min-w-full min-h-full flex-shrink-0">
              <img
                src={imageUrl}
                alt={`banner-mobile-${index}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="hidden md:flex absolute inset-0 items-center justify-between px-4 pointer-events-none">
          <button
            onClick={prevImage}
            className="pointer-events-auto bg-white bg-opacity-80 hover:bg-opacity-100 shadow-lg rounded-full p-3 text-gray-700 hover:text-red-600 transition-colors duration-300"
            aria-label="Previous Image"
            type="button"
          >
            <FaAngleLeft size={24} />
          </button>

          <button
            onClick={nextImage}
            className="pointer-events-auto bg-white bg-opacity-80 hover:bg-opacity-100 shadow-lg rounded-full p-3 text-gray-700 hover:text-red-600 transition-colors duration-300"
            aria-label="Next Image"
            type="button"
          >
            <FaAngleRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {desktopImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentImage === idx
                  ? "bg-red-600"
                  : "bg-gray-300 hover:bg-red-400"
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
