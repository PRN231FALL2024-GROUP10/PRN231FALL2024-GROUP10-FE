"use client";

import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { API_PROFILE } from "@/utils/api-links";
import PostPopup from "../post/PostPopup";

function HeaderItem({
  showDropdown,
  toggleDropdown,
  profile
}) {
  if (profile !== null) {
    return (
      <>
        <div className="flex flex-row">
          <Link
            href="/post/create"
            className="flex flex-wrap bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition duration-300 mr-10 content-center"
          >
            <FaPlus className="mr-2 mt-1" /> New Post
          </Link>

          <button
            onClick={toggleDropdown}
            className="flex items-center focus:outline-none space-x-4"
          >
            <span className="hidden text-right lg:block">
              <span className="block text-lg font-medium text-black dark:text-black">
                {profile?.user.fullName ? profile?.user.fullName : "User"}
              </span>
              <span className="block text-sm">
                {profile?.user.username ? profile?.user.username : "User"}
              </span>
            </span>
            <img
              src={profile?.user.image ? profile?.user.image : "https://firebasestorage.googleapis.com/v0/b/bmos-image-prn.appspot.com/o/User%2F3c9fab92-7598-4125-869d-803d07dffe88?alt=media&token=ddd0a573-2db3-4329-acec-4bee2734bab1"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-14 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                href={`/profile/${profile?.user.accountId}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="inline-block mr-2" />
                My profile
              </Link>
              <button
                onClick={() => signOut()}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="inline-block mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link
          href="/auth/signin"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Login
        </Link>
      </>
    );
  }
}

const Header = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  // useEffect(() => {
  //   fetchProfile();
  // }, [session]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // const fetchProfile = async () => {
  //   setIsLoading(true);
  //   try {
  //     console.log(session);
  //     const response = await fetch(API_PROFILE, {
  //       headers: {
  //         Authorization: `Bearer ${session?.data.accessToken}`,
  //       },
  //     });
  //     const data = await response.json();
  //     setLoggedIn(true);
  //   } catch (error) {
  //     setLoggedIn(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center ">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-blue-600 space-x-4"
          >
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80"
              alt="WSocial Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-blue-600">WSocial</h1>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li className="relative">
              <HeaderItem
                showDropdown={showDropdown}
                toggleDropdown={toggleDropdown}
                profile={session}
              ></HeaderItem>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
