import PostUpdateForm from "@/components/post/PostUpdateForm";
import { API_POST_DELETE } from "@/utils/api-links";
import { FaComment, FaEdit, FaHeart } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const GroupPostButton = ({postId, commentCount, likeCount, accessToken}) => {
    const deletePost = async () => {
        try {
          const response = await fetch(
            API_POST_DELETE,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json;odata.metadata=minimal;odata.streaming=true",
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({
                postId: postId
              }),
            }
          );
    
          if (!response.ok) {
            throw new Error("Failed to delete");
          }
    
        } catch (error) {
          console.error("Error delete:", error);
        }
      };
    
  return (
    <>
      <div className="flex space-x-4 mb-4">
        <button className="flex items-center text-gray-600 hover:text-blue-600">
          <FaHeart className="mr-2" /> {commentCount}
        </button>
        <button className="flex items-center text-gray-600 hover:text-blue-600">
          <FaComment className="mr-2" /> {likeCount}
        </button>
      </div>
      <button
        
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <FaEdit className="mr-2" /> Edit
      </button>
      <button
        key={postId}
        onClick={deletePost}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <FaTrashCan className="mr-2" /> Delete
      </button>
    </>
  );
};

export default GroupPostButton;
