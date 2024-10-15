import { useSession } from "next-auth/react";
import React, { useState } from "react";

const PostComment = ({ postId, comments, onCommentAdded }) => {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        "https://localhost:7207/odata/Comment/AddNewComment",
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

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments:</h4>
      {comments.map((comment) => (
        <div key={comment.CommentId} className="bg-gray-100 p-2 rounded mb-2">
          <p>{comment.Content}</p>
          <p className="text-xs text-gray-500">
            Commented on: {new Date(comment.CreatedOn).toLocaleString()}
          </p>
        </div>
      ))}
      <div className="mt-4">
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
      </div>
    </div>
  );
};

export default PostComment;
