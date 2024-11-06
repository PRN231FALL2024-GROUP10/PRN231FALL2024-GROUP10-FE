import { API_COMMENT_DELETE } from "@/utils/api-links";
import { FaTrashCan } from "react-icons/fa6";

export const DeleteCommentButton = ({ condition, commentId, accessToken, commentDeleted }) => {
    const deleteCmt = async () => {
      try {
        const response = await fetch(API_COMMENT_DELETE + `${commentId}`, {
          method: "DELETE"
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete");
        }
        else {
            commentDeleted();
        }
      } catch (error) {
        console.error("Error delete:", error);
      }
    };
  
    return condition ? (
      <button
        key={commentId}
        onClick={deleteCmt}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <FaTrashCan className="mr-2" /> Delete
      </button>
    ) : (
      <></>
    );
  };
  