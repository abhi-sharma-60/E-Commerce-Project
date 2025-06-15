import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl bg-white/10 dark:bg-neutral-800/50 backdrop-blur-sm border border-neutral-200/20 dark:border-neutral-700/30 hover:bg-white/20 dark:hover:bg-neutral-700/50 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <FiSun 
          className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <FiMoon 
          className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;