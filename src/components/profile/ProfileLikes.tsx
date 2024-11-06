"use client";

import { FaComment, FaHeart } from "react-icons/fa";
import { API_POST_LOAD, API_PROFILE_LIKE } from "@/utils/api-links";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { LikePostButton } from "../common/PostLikeButton";
import { PostItemChunk } from "../common/PostItemChunk";


const ProfileLikes = ({profileId}) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const Session = await getSession();

      fetchPosts(Session?.data.accessToken);
    };

    fetchData();
  }, []);

  const fetchPosts = async (token: any) => {
    try {
      if(session?.user.accountId == profileId)
      {
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
        const reversedPosts = data.reverse();
        const matchItems = reversedPosts.filter(
          (obj: any) => obj.isLiked === true
        );
        setPosts(matchItems);
        console.log(matchItems);
      }
      else
      {
        const response = await fetch(API_PROFILE_LIKE + `${profileId}/like`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const reversedPosts = data.reverse();
        setPosts(reversedPosts);
      }
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <section className="mb-8 space-y-4">
      {posts.map((post) =>
        post.category === "Job" ? (
          <div key={post.postID} className="bg-cream p-6 rounded-lg shadow-md">
            <button className="flex items-center focus:outline-none">
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
            </button>

            <div className="ml-12">
              <p className="text-sm text-gray-500 mb-2">
                posted at {new Date(post.createdOn).toLocaleString()}
              </p>
              <div>
                <p>
                  Job title: <b>{post.jobTitle}</b>
                </p>
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
            conditionChanged={() => fetchPosts(session?.data.accessToken)}
              accessToken={session?.data.accessToken}
              condition={post.isLiked}
              postId={post.postID}
              key={post.postID}
            ></LikePostButton>
          </div>
        ) : (
          <div key={post.postID} className="bg-white p-6 rounded-lg shadow-md">
            <button className="flex items-center focus:outline-none">
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
            </button>

            <div className="ml-12">
              <p className="text-sm text-gray-500 mb-2">
                posted at {new Date(post.createdOn).toLocaleString()}
              </p>
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
            conditionChanged={() => fetchPosts(session?.data.accessToken)}
              accessToken={session?.data.accessToken}
              condition={post.isLiked}
              postId={post.postID}
              key={post.postID}
            ></LikePostButton>
          </div>
        )
      )}
    </section>
  );
};

export default ProfileLikes;
