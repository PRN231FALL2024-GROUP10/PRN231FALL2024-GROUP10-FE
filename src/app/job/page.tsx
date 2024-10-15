"use client";
import JobPostForm from "@/components/job/JobPostForm";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const JobPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
              alt="JobNetwork Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-blue-600">JobNetwork</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaHome className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaBriefcase className="mr-2" /> Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaUsers className="mr-2" /> Network
                </a>
              </li>
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="inline-block mr-2" />
                      Thông tin cá nhân
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline-block mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create a New Job
        </h2>
      </main>
    </div>
  );
};

export default JobPage;
