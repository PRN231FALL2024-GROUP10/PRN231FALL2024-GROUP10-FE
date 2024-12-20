"use client";
import React, { useState, useEffect } from "react";
import { FaComment, FaHeart } from "react-icons/fa";
import PostComment from "./PostComment";
import { API_POST_LOAD } from "@/utils/api-links";
import { getSession, useSession } from "next-auth/react";
import { PostItemChunk } from "../common/PostItemChunk";
import { LikePostButton } from "../common/PostLikeButton";
import Image from "next/image";
import Link from "next/link";

interface Props {
  key?: string;
}

const PostListJob = ({ key }: Props) => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      const Session = await getSession();

      fetchPosts(Session?.data.accessToken);
    };

    fetchData();
  }, []);

  const fetchPosts = async (token) => {
    try {
      const response = await fetch(API_POST_LOAD, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const matchItems = await data.filter(
        (obj: any) => obj.category === "Job" && obj.privacyLevel === 1
      ).reverse();
      await setPosts(matchItems);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <section className="mb-8 space-y-4">
      {posts.map((post) => (post.photo?
      (<div key={post.postID} className="bg-white p-6 rounded-lg shadow-md">
        <Link
            href={`/profile/${post.account.accountId}`}
          >
            <div className="flex items-center focus:outline-none">
            <img
            src={post.account.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <br />
          <h6 className="px-2">
            {post.account.fullName === ""
              ? "Commenter"
              : post.account.fullName}
          </h6>
            </div>
          </Link>

        <div className="ml-12">
          <p className="text-sm text-gray-500 mb-2">
            posted at {new Date(post.createdOn).toLocaleString()}
          </p>
          <div>
            <p>
              Job title: <b>{post.jobTitle}</b>
            </p>
          </div>
          <div>
            <p>Skills:</p>
            <PostItemChunk listItem={post.skill}></PostItemChunk>
          </div>
          
          <p className="text-gray-700 mb-4">{post.content}</p>
        </div>
        <img className="h-full w-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"  src={post.photo[0]}/>

        <div className="flex space-x-4 mb-4">
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <FaHeart className="mr-2" /> {post.likeCount}
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600">
            <FaComment className="mr-2" /> {post.comments?.length}
          </button>
        </div>

        <LikePostButton
          likeCount={post.likeCount}
          conditionChanged={() => fetchPosts(session?.data.accessToken)}
          accessToken={session?.data.accessToken}
          condition={post.isLiked}
          postId={post.postID}
          key={post.postID}
        ></LikePostButton>
        <PostComment
          accessToken={session?.data.accessToken}
          hostId={session?.user.accountId}
          postId={post.postID}
          comments={post.comments}
          onCommentAdded={() => fetchPosts(session?.data.accessToken)}
        />
      </div>):(<div key={post.postID} className="bg-white p-6 rounded-lg shadow-md">
        <Link
            href={`/profile/${post.account.accountId}`}
          >
            <div className="flex items-center focus:outline-none">
            <img
            src={post.account.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <br />
          <h6 className="px-2">
            {post.account.fullName === ""
              ? "Commenter"
              : post.account.fullName}
          </h6>
            </div>
          </Link>

          <div className="ml-12">
            <p className="text-sm text-gray-500 mb-2">
              posted at {new Date(post.createdOn).toLocaleString()}
            </p>
            <div>
              <p>
                Job title: <b>{post.jobTitle}</b>
              </p>
            </div>
            <div>
              <p>Skills:</p>
              <PostItemChunk listItem={post.skill}></PostItemChunk>
            </div>
            
            <p className="text-gray-700 mb-4">{post.content}</p>
          </div>

          <div className="flex space-x-4 mb-4">
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <FaHeart className="mr-2" /> {post.likeCount}
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <FaComment className="mr-2" /> {post.comments?.length}
            </button>
          </div>

          <LikePostButton
            likeCount={post.likeCount}
            conditionChanged={() => fetchPosts(session?.data.accessToken)}
            accessToken={session?.data.accessToken}
            condition={post.isLiked}
            postId={post.postID}
            key={post.postID}
          ></LikePostButton>
          <PostComment
            accessToken={session?.data.accessToken}
            hostId={session?.user.accountId}
            postId={post.postID}
            comments={post.comments}
            onCommentAdded={() => fetchPosts(session?.data.accessToken)}
          />
        </div>)

      ))}
    </section>
  );
};

export default PostListJob;
