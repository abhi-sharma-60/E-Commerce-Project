import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-t border-neutral-200/50 dark:border-neutral-700/50 shadow-soft">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-neutral-700 dark:text-neutral-300 font-semibold text-sm md:text-base select-none">
              © {new Date().getFullYear()} Team Triple A
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">
              Premium Digital Electronics Store
            </p>
          </div>

          <div className="flex space-x-8 text-neutral-500 dark:text-neutral-400 text-sm">
            <a
              href="#"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 relative group"
              aria-label="Privacy Policy"
            >
              Privacy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 relative group"
              aria-label="Terms of Service"
            >
              Terms
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 relative group"
              aria-label="Contact"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-neutral-200/50 dark:border-neutral-700/50">
          <div className="text-center text-xs text-neutral-400 dark:text-neutral-500">
            Built with ❤️ using React, Node.js & MongoDB
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;