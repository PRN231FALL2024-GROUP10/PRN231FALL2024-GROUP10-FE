"use client";
import React, { useState, useEffect } from "react";
import { FaComment, FaEdit, FaHeart } from "react-icons/fa";
import { API_POST_DELETE, API_POST_LOAD } from "@/utils/api-links";
import { useSession } from "next-auth/react";
import { FaTrashCan } from "react-icons/fa6";
import GroupPostButton from "../common/GroupPostButton";
import { PostItemChunk } from "../common/PostItemChunk";

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
          <div className="ml-12">
            <p className="text-sm text-gray-500 mb-2">
              {post.category} post created at {new Date(post.createdOn).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="ml-12">
            <p>Skill tags: </p> <PostItemChunk listItem={post.skill}></PostItemChunk>
          </div>
          </div>
          <GroupPostButton  jobTitle={post.jobTitle} postType={post.category} accountId={session?.user.accountId} commentCount={post.comments?.length} likeCount={post.comments?.length} postId={post.postID} accessToken={session?.data.accessToken}>
          </GroupPostButton>
        </div>
      ))}
    </section>
  );
};

export default ProfilePost;
