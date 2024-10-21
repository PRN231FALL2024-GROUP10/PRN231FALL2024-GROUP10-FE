import React, { useState, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import PostComment from "./PostComment";
import { API_POST_LOAD } from "@/utils/api-links";
import PostListMini from "./PostListMini";

interface Props {
  key?: string;
}

const PostDetail = ({ key } : Props) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetchPosts();
  }, [key]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        API_POST_LOAD
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const post = data.reverse();
      setPosts(post);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <section className="mb-8">
      <div className="space-y-4">
        <div key={posts.PostID} className="bg-white p-6 rounded-lg shadow-md">
          <h6 className="text-gray-700 mb-4">{post.account.fullName}</h6>
          <p className="text-gray-700 mb-4">{posts.Content}</p>
          <p className="text-sm text-gray-500 mb-2">
            Created on: {new Date(posts.CreatedOn).toLocaleString()}
          </p>
          <div className="flex space-x-4 mb-4">
            <button className="flex items-center text-gray-600 hover:text-blue-600">
              <FaComment className="mr-2" /> {posts.Comments?.length}
            </button>
          </div>
          <PostComment
            postId={posts.PostID}
            comments={posts.Comments}
            onCommentAdded={fetchPosts}
          />
        </div>
      </div>
    </section>
  );
};

export default PostDetail;
