import { API_COMMENT_ADD } from "@/utils/api-links";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Comment } from "../common/Comment";


const AdminPostComment = ({ postId, comments, onCommentAdded, accessToken, hostId }) => {
  
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    setNewComment("");
  }, []);

  const handleCommentSubmit = async () => {
    if(newComment == "")
    {

    }
    else 
    {
      try {
        const response = await fetch(API_COMMENT_ADD, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json;odata.metadata=minimal;odata.streaming=true",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            content: newComment,
            postId: postId,
            status: 1,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit comment");
        }
  
        setNewComment("");
        onCommentAdded();
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
    
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Comments:</h4>
      {comments?.map((comment: any) => (
        <div key={comment.commentId} className="bg-gray-100 p-2 rounded mb-2">
          <Comment
          commentDeleted={onCommentAdded}
            commentId={comment.commentId}
            uCommentId={comment.account.accountId}
            accessToken={accessToken}
            content={comment.content}
            image={comment.account.image}
            fullName={comment.account.fullName}
            hostId={hostId}
          ></Comment>
        </div>
      ))}
    </div>
  );
};

export default AdminPostComment;
