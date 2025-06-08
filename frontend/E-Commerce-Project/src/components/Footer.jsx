import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner border-t border-gray-200">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        <p
          className="text-gray-700 font-semibold text-sm md:text-base select-none"
          title="E-Commerce-Project"
        >
          © {new Date().getFullYear()} Team Triple A
        </p>

        <div className="flex space-x-6 mt-3 md:mt-0 text-gray-500 text-sm">
          {/* Example social links or info */}
          <a
            href="#"
            className="hover:text-red-600 transition-colors"
            aria-label="Privacy Policy"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-red-600 transition-colors"
            aria-label="Terms of Service"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-red-600 transition-colors"
            aria-label="Contact"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
