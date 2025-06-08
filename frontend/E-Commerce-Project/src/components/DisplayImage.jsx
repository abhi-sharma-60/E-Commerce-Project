import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the box
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition-colors text-3xl p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Close"
        >
          <IoCloseSharp />
        </button>

        {/* Image Container */}
        <div className="flex justify-center items-center max-h-[85vh] overflow-hidden p-4">
          <img
            src={imgUrl}
            alt="Display"
            className="max-w-full max-h-full object-contain rounded-md shadow-inner"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
