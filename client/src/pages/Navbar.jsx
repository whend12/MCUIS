import React from "react";

const Navbar = () => {
  return (
    <div>
      <div
        className="rounded-md flex justify-between items-center h-16 bg-gradient-to-r from-cyan-300 to-blue-300 text-grey-500 relative shadow-sm"
        role="navigation"
      >
        <a href="/" className="pl-8">
          Proverbs
        </a>
        <div className="px-4 cursor-pointer md:hidden">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <div className="pr-8 md:block hidden font-poppins ">
          <a href="/" className="p-4">
            Setting
          </a>
          <a href="/register" className="p-4">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
