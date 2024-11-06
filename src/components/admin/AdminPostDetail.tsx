"use client";
import React, { useState, useEffect } from "react";
import { FaComment, FaEdit, FaHeart } from "react-icons/fa";
import {
  API_POST_DELETE,
  API_POST_LOAD,
  API_PROFILE_POST,
} from "@/utils/api-links";
import { getSession, useSession } from "next-auth/react";
import { FaTrashCan } from "react-icons/fa6";
import GroupPostButton from "../common/GroupPostButton";
import { PostItemChunk } from "../common/PostItemChunk";
import Link from "next/link";
import PostComment from "../post/PostComment";
import AdminPostComment from "./AdminPostComment";

const AdminPostDetail = ({ postId }) => {
  const { data: session } = useSession();
  const [post, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const Session = await getSession();

      fetchPosts(Session?.data.accessToken);
    };

    fetchData();
  }, []);

  const fetchPosts = async (token) => {
    try {
      const response = await fetch(API_POST_LOAD + `/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      await setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <section className="mb-8 space-y-4">
      <div key={post.postID} className="bg-white p-6 rounded-lg shadow-md">
        <Link href="/admin/post"> Return</Link>
        <div className="ml-12 mt-6">
          <p className="text-sm text-gray-500 mb-2">
            Post type: <b>{post.category}</b> <br/>
            Date created:
            {new Date(post.createdOn).toLocaleString()}
          </p>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <div className="flex space-x-4 mb-4">
                <button className="flex items-center text-gray-600 hover:text-blue-600">
                  Likes: {post.likeCount}
                </button>
              </div>
              <AdminPostComment
          accessToken={session?.data.accessToken}
          hostId={session?.user.accountId}
          postId={post.postID}
          comments={post.comments}
          onCommentAdded={() => fetchPosts(session?.data.accessToken)}
        />
        </div>
      </div>
    </section>
  );
};

export default AdminPostDetail;
