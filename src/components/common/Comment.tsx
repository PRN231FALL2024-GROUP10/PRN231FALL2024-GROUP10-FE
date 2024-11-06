import { API_COMMENT_DELETE } from "@/utils/api-links";
import Link from "next/link";
import { FaTrashCan } from "react-icons/fa6";
import { DeleteCommentButton } from "./CommentButton";


export const Comment = ({
  commentId,
  image,
  fullName,
  content,
  hostId,
  uCommentId,
  accessToken,
  commentDeleted
}) => {
  return (
    <div key={commentId} className="bg-gray-100 p-2 rounded mb-2">
      <Link
            href={`/profile/${uCommentId}`}
          >
            <div className="flex items-center focus:outline-none">
            <img src={image} alt="User Avatar" className="w-8 h-8 rounded-full" />
          <h6 className="px-2">{fullName === "" ? "Commenter" : fullName}</h6>
            </div>
          </Link>
      {/* <div>
        <button className="flex items-center focus:outline-none">
          <img src={image} alt="User Avatar" className="w-8 h-8 rounded-full" />
          <h6 className="px-2">{fullName === "" ? "Commenter" : fullName}</h6>
        </button>
      </div> */}
      <p className="ml-10">{content}</p>

      <DeleteCommentButton
      commentDeleted={commentDeleted}
        condition={hostId === uCommentId}
        accessToken={accessToken}
        commentId={commentId}
      ></DeleteCommentButton>
    </div>
  );
};
