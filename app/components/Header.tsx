'use client';

import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">NeighborApp</div>

      {/* Search Bar */}
      <div className="flex-grow mx-4">
        <input
          type="text"
          placeholder="Search posts or incidents..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.866-2.014-6-6-6S6 7.134 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button className="flex items-center space-x-2">
            <img
              src="/default-avatar.png"
              alt="Profile"
              className="w-8 h-8 rounded-full border"
            />
            <span className="text-gray-700">User</span>
          </button>
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-40 hidden group-hover:block">
            <ul>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
