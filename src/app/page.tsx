"use client";
import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaBell,
  FaSearch,
  FaFilter,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaCalendar,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaReply,
} from "react-icons/fa";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PostForm from "@/components/post/PostForm";
import PostList from "@/components/post/PostList";

const JobNetworkSocialPage = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    setNotifications([
      { id: 1, message: "New job match: Senior Developer at InnoTech" },
      { id: 2, message: "Sarah Lee viewed your profile" },
      { id: 3, message: "Reminder: Tech Networking Mixer today at 6 PM" },
    ]);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
                <Link
                  href="/job"
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FaBriefcase className="mr-2" /> Jobs
                </Link>
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

      <main className="container mx-auto px-4 py-8 flex flex-wrap">
        <div className="w-full lg:w-3/4 pr-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <PostForm onPostCreated={handleRefresh} />
          </div>
          <PostList key={refreshTrigger} />
        </div>

        <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">John Doe</h3>
            <p className="text-gray-600 text-center mb-4">Software Developer</p>
            <button
              onClick={() => router.push("/profile")}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="flex items-start">
                  <FaBell className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">{notification.message}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-2 text-gray-700">
              <li>You viewed 5 new job listings</li>
              <li>Your profile was viewed by 3 recruiters</li>
              <li>You connected with 2 new professionals</li>
            </ul>
          </div>
        </aside>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">About JobNetwork</h4>
              <p className="text-gray-400">
                Connecting professionals and opportunities worldwide.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaUsers />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaBriefcase />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaBell />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>&copy; 2023 JobNetwork. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobNetworkSocialPage;
