import React, { useState, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import PostComment from "./PostComment";

const PostList = ({ key }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [key]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://localhost:7207/odata/Posts/Active/Post?%24expand=Comments"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const reversedPosts = data.reverse();
      setPosts(reversedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <section className="mb-8">
      {/* <h2 className="text-2xl font-semibold mb-4">Job Blog Posts</h2> */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.PostID} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">{post.Content}</p>
            <p className="text-sm text-gray-500 mb-2">
              Created on: {new Date(post.CreatedOn).toLocaleString()}
            </p>
            <div className="flex space-x-4 mb-4">
              <button className="flex items-center text-gray-600 hover:text-blue-600">
                <FaComment className="mr-2" /> {post.Comments?.length}
              </button>
            </div>
            <PostComment
              postId={post.PostID}
              comments={post.Comments}
              onCommentAdded={fetchPosts}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostList;
