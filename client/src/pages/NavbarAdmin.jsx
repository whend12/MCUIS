import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/api/v1/logout");
      // Hapus cookie refreshToken dari sisi klien
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      // Tangani kesalahan dengan lebih baik
      console.error("Error during logout:", error);
      navigate("/login");
    }
  };

  return (
    <nav>
      <div
        className="rounded-md flex justify-between items-center h-16 bg-gradient-to-r from-cyan-300 to-blue-300 text-grey-500 relative shadow-sm"
        role="navigation"
      >
        <a href="/dashboard" className="pl-8">
          Home
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
        <div className="pr-8 md:block hidden font-poppins" onClick={Logout}>
          <a href="/login" className="p-4">
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
