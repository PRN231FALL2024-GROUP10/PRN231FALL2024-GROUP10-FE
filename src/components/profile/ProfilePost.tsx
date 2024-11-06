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

const ProfilePost = ({ profileId }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [hostId, setHostId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const Session = await getSession();
      setHostId(Session?.user.accountId);
      fetchPosts(Session?.data.accessToken, Session?.user.accountId);
    };

    fetchData();
  }, []);

  const fetchPosts = async (token, accountId) => {
    try {
      console.log(accountId);
      console.log(profileId);
      if (accountId == profileId) {
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
          (obj: any) =>
            obj.account.accountId === accountId && obj.privacyLevel !== -1
        );
        await setPosts(matchItems);
        console.log(matchItems);
      } else {
        const response = await fetch(API_PROFILE_POST + `${profileId}/post`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const reversedPosts = data.reverse();
        console.log(reversedPosts);
        await setPosts(reversedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return profileId == hostId ? (
    <section className="mb-8 space-y-4">
      {posts.map((post) => (
        <div key={post.postID} className="bg-white p-6 rounded-lg shadow-md">
          <div className="ml-12">
            <p className="text-sm text-gray-500 mb-2">
              {post.category} post created at{" "}
              {new Date(post.createdOn).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <p>Skill tags: </p>{" "}
            <PostItemChunk listItem={post.skill}></PostItemChunk>
          </div>
          <GroupPostButton
            hostId={profileId}
            postDeleted={() => fetchPosts(session?.data.accessToken, hostId)}
            jobTitle={post.jobTitle}
            postType={post.category}
            accountId={hostId}
            commentCount={post.comments?.length}
            likeCount={post.comments?.length}
            postId={post.postID}
            accessToken={session?.data.accessToken}
          ></GroupPostButton>
        </div>
      ))}
    </section>
  ) : (
    <section className="mb-8 space-y-4">
      {posts.map((post) => (
        <div key={post.postID} className="bg-white p-6 rounded-lg shadow-md">
          <div className="ml-12">
            <p className="text-sm text-gray-500 mb-2">
              {post.category} post created at{" "}
              {new Date(post.createdOn).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="ml-12">
              <p>Skill tags: </p>{" "}
              <PostItemChunk listItem={post.skill}></PostItemChunk>
              
            </div>
          </div>
          <GroupPostButton
            hostId={profileId}
            postDeleted={() => fetchPosts(session?.data.accessToken, hostId)}
            jobTitle={post.jobTitle}
            postType={post.category}
            accountId={session?.user.accountId}
            commentCount={post.comments?.length}
            likeCount={post.comments?.length}
            postId={post.postID}
            accessToken={session?.data.accessToken}
          ></GroupPostButton>
        </div>
      ))}
    </section>
  );
};

export default ProfilePost;
