import { API_COMMENT_DELETE } from "@/utils/api-links";
import { FaTrashCan } from "react-icons/fa6";

const DeleteCommentButton = ({ condition, commentId, accessToken }) => {
  const deleteCmt = async () => {
    try {
      const response = await fetch(API_COMMENT_DELETE, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json;odata.metadata=minimal;odata.streaming=true",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          commentId: commentId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
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

export const Comment = ({
  commentId,
  image,
  fullName,
  content,
  hostId,
  uCommentId,
  accessToken,
}) => {
  return (
    <div key={commentId} className="bg-gray-100 p-2 rounded mb-2">
      <div>
        <button className="flex items-center focus:outline-none">
          <img src={image} alt="User Avatar" className="w-8 h-8 rounded-full" />
          <h6 className="px-2">{fullName === "" ? "Commenter" : fullName}</h6>
        </button>
      </div>
      <p className="ml-10">{content}</p>

      <DeleteCommentButton
        condition={hostId === uCommentId}
        accessToken={accessToken}
        commentId={commentId}
      ></DeleteCommentButton>
    </div>
  );
};
