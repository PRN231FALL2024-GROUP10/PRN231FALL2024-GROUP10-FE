import { API_COMMENT_ADD } from "@/utils/api-links";
import { useSession } from "next-auth/react";
import React, { useState } from "react";


const PostComment = ({ postId, comments, onCommentAdded }) => {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        API_COMMENT_ADD,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json;odata.metadata=minimal;odata.streaming=true",
            Authorization: `Bearer ${session?.data.accessToken}`,
          },
          body: JSON.stringify({
            content: newComment,
            postId: postId,
            status: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      setNewComment("");
      onCommentAdded();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const matchItems = comments.filter((obj) => obj.status === 1);

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments:</h4>
      {matchItems.map((comment) => (
        <div key={comment.CommentId} className="bg-gray-100 p-2 rounded mb-2">
          <div>
            <button
                  className="flex items-center focus:outline-none">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <h6>{comment.account.fullName === '' ? 'Commenter' : comment.account.fullName}</h6> 
            </button>
          </div>
        <p>{comment.Content}</p>
        <p className="text-xs text-gray-500">
          Commented on: {new Date(comment.CreatedOn).toLocaleString()}
        </p>
        </div>
      ))}
      {/* <div className="mt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Comment
        </button>
      </div> */}
    </div>
  );
};

export default PostComment;
