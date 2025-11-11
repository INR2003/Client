import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Left: Menu button */}
      <button className="text-2xl text-gray-700 hover:text-gray-900">
        ☰
      </button>

      {/* Center: Logo */}
      <div className="flex-1 flex justify-center">
        <img
          src="/your-logo.png"
          alt="Logo"
          className="h-10 object-contain"
        />
      </div>

      {/* Right: Mode, Profile, Exit */}
      <div className="flex items-center space-x-4">
        {/* Mode Button */}
        <button className="text-xl text-gray-700 hover:text-gray-900">
          🌓
        </button>

        {/* Profile Image */}
        <img
          src="/profile.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full border-2 border-gray-300 object-cover"
        />

        {/* Exit Button */}
        <button className="text-xl text-gray-700 hover:text-red-500">
          ⎋
        </button>
      </div>
    </header>
  );
};

export default Header;
