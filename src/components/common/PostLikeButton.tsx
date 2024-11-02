import { API_POST_LIKE } from "@/utils/api-links";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

export const LikePostButton = ({
    condition,
    postId,
    accessToken,
    conditionChanged = () => {},
  }: {
    condition: boolean;
    postId: string;
    accessToken: any;
    conditionChanged?: () => void;
  }) => {
    const [conditionRT, setCondition] = useState(condition);
  
    const like = async () => {
      try {
        const response = await fetch(API_POST_LIKE + `${postId}/Like`, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json;odata.metadata=minimal;odata.streaming=true",
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to like post");
        }
      } catch (error) {
        console.error("Error:", error);
      }
  
      setCondition(!conditionRT);
      conditionChanged();
    };
  
    return conditionRT ? (
      <button
        key={postId}
        onClick={like}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <FaHeart className="mr-2 text-pink" /> Unlike
      </button>
    ) : (
      <button
        key={postId}
        onClick={like}
        className="flex items-center text-gray-600 hover:text-blue-600"
      >
        <FaHeart className="mr-2" /> Like
      </button>
    );
  };