"use client";
import React, { useState, useEffect } from "react";
import { FaComment, FaEdit, FaHeart } from "react-icons/fa";
import { API_POST_DELETE, API_POST_LOAD } from "@/utils/api-links";
import { useSession } from "next-auth/react";
import { FaTrashCan } from "react-icons/fa6";
import GroupPostButton from "../common/GroupPostButton";

interface Props {
  key?: string;
}

const ProfilePost = ({ key }: Props) => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    fetchPosts();
  }, [key]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_POST_LOAD);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const reversedPosts = data.reverse();
      const matchItems = reversedPosts.filter(
        (obj: any) => obj.account.accountId === session?.user.accountId
      );
      setPosts(matchItems);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  return (
    <section className="mb-8 space-y-4">
      {posts.map((post) => (
        <div key={post.postID} className="bg-white p-6 rounded-lg shadow-md">
          {/* <button className="flex items-center focus:outline-none">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <br />
            <h6 className="px-2">
              {post.account.fullName === ""
                ? "Commenter"
                : post.account.fullName}
            </h6>
          </button> */}

          <div className="ml-12">
            <p className="text-sm text-gray-500 mb-2">
              posted at {new Date(post.createdOn).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-4">{post.content}</p>
            
          </div>
          <GroupPostButton commentCount={post.comments?.length} likeCount={post.comments?.length} postId={post.postID} accessToken={session?.data.accessToken}>

          </GroupPostButton>
        </div>
      ))}
    </section>
  );
};

export default ProfilePost;
