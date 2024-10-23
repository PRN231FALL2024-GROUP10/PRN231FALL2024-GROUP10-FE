"use client";
import React, { useState, useEffect } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import { API_POST_LOAD } from "@/utils/api-links";
import { useSession } from "next-auth/react";

interface Props {
  key?: string;
}

const ProfilePortrait = ({ key }: Props) => {
  const { data: session } = useSession();
//   useEffect(() => {
//     fetchPosts();
//   }, [key]);

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch(API_POST_LOAD);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       const reversedPosts = data.reverse();
//       const matchItems = reversedPosts.filter(
//         (obj: any) => obj.account.accountId === session?.user.accountId
//       );
//       setPosts(matchItems);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

  return (
    <aside className="w-full mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center mb-2">{session?.user.fullName}</h3>
            <p className="text-gray-600 text-center mb-4">{session?.user.username}</p>
            <button
            //   onClick={() => router.push("/profile")}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-2 text-gray-700">
              <li>5 Follower</li>
              <li>1 Following</li>
            </ul>
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          </div>
        </aside>
  );
};

export default ProfilePortrait;
