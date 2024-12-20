
import { API_POST_DELETE, API_POST_LIKE } from "@/utils/api-links";
import Link from "next/link";
import { FaComment, FaEdit, FaHeart } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const EditPostButton = ({ condition, accountId, postId, jobTitle }) => {
  return condition ? (
    <>
    <div>
      <h1>Job position: <b>{jobTitle}</b></h1>
    </div>
    <Link
      href={`${postId}/update/job`}
      aria-pressed="true"
      className="flex items-center text-gray-600 hover:text-blue-600"
    >
      <FaEdit className="mr-2" /> Edit
    </Link>
    </>
    
  ) : (
    <Link
      href={`${postId}/update/post`}
      aria-pressed="true"
      className="flex items-center text-gray-600 hover:text-blue-600"
    >
      <FaEdit className="mr-2" /> Edit
    </Link>
  );
};

const GroupPostButton = ({
  postId,
  commentCount,
  likeCount,
  accountId,
  hostId,
  postType,
  jobTitle,
  postDeleted
}) => {
  const deletePost = async () => {
    try {
      const response = await fetch(API_POST_DELETE + `${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      else {
        postDeleted();
      }


    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  return hostId == accountId? (
    <>
      <div className="flex space-x-4 mb-4">
        <button className="flex items-center text-gray-600 hover:text-blue-600">
          {" "}
          <FaHeart className="mr-2" /> {commentCount}
        </button>
        <button className="flex items-center text-gray-600 hover:text-blue-600">
          <FaComment className="mr-2" /> {likeCount}
        </button>
      </div>

      <EditPostButton
        condition={postType === "Job"}
        accountId={accountId}
        postId={postId}
        jobTitle={jobTitle}
      ></EditPostButton>

      <button
        key={postId}
        onClick={deletePost}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <FaTrashCan className="mr-2" /> Delete
      </button>
    </>
  )
  :
  (
    <>
      <div className="flex space-x-4 mb-4">
        <button className="flex items-center text-gray-600 hover:text-blue-600">
          {" "}
          <FaHeart className="mr-2" /> {commentCount}
        </button>
        <button className="flex items-center text-gray-600 hover:text-blue-600">
          <FaComment className="mr-2" /> {likeCount}
        </button>
      </div>
    </>
  );
};

export default GroupPostButton;
