"use client";
import { API_ACCOUNT_ADMIN_LOAD, API_ACCOUNT_BAN, API_ACCOUNT_LOAD, API_ACCOUNT_UNBAN, API_POST_LOAD } from "@/utils/api-links";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";


export default function PostManage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
   fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const response = await fetch(API_POST_LOAD);
    const data = await response.json();
    await setPosts(data);
  };
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Account Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Posted On
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Privacy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts?.map((post) => (
              <tr key={post.postID} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.postID}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{post.account.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {post.createdOn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      post.category === "Job"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      post.privacyLevel === 1
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {post.privacyLevel === 1 ? "Public" : "Private"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                      onClick={() => router.push(`/admin/post/${post.postID}`)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Details
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}