import React, { useState } from "react";
import { FaMoon, FaSun, FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark", !isDarkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const iconSize = "text-xl"; // Uniform icon size

  return (
    <header className="flex w-screen items-center justify-between px-6 py-3 bg-black border-b border-white shadow-[0_4px_6px_#FFD700] transition-colors">
      {/* Left: Hamburger / X Button */}
      <button
        onClick={toggleSidebar}
        className="relative w-6 h-6 flex flex-col justify-between items-center mr-4"
      >
        <span
          className={`block h-0.5 w-6 bg-white rounded transform transition duration-300 ease-in-out ${
            isSidebarOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white rounded transition duration-300 ease-in-out ${
            isSidebarOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-white rounded transform transition duration-300 ease-in-out ${
            isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Center: Logo */}
      <div className="flex-1 flex justify-center">
        <img
          src="https://vtindex.com/img/logo/logo.svg"
          alt="Logo"
          className="h-10 object-contain"
        />
      </div>

      {/* Right: Notification, Mode, Profile, Exit */}
      <div className="flex items-center space-x-5">
        {/* Notification */}
        <button className={`${iconSize} relative text-white hover:text-yellow-300 transition-colors`}>
          <FaBell />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Mode Button */}
        <button
          onClick={toggleMode}
          className={`${iconSize} text-white hover:text-yellow-300 transition-colors`}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-1">
          <FaUserCircle className={`${iconSize} text-white`} />
          <span className="text-white font-medium text-sm">
            John Doe
          </span>
        </div>

        {/* Exit Button */}
        <button className={`${iconSize} text-white hover:text-red-500 transition-colors`}>
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};

export default Header;
