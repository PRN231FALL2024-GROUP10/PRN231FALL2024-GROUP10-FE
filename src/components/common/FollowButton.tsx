import { API_FOLLOW } from "@/utils/api-links";
import { useState } from "react";
import { FaConnectdevelop } from "react-icons/fa";

export const FollowButton = ({
  condition,
  accountId,
  accessToken,
  conditionChanged = () => {},
}: {
  condition: boolean;
  accountId: string;
  accessToken: any;
  conditionChanged?: () => void;
}) => {
  const [conditionRT, setCondition] = useState(condition);
  const follow = async () => {
    try {
      const response = await fetch(API_FOLLOW + `${accountId}/follow`, {
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
      key={accountId}
      onClick={follow}
      className="flex items-center text-gray-600 hover:text-blue-600"
    >
      <FaConnectdevelop className="mr-2 text-pink" /> Unfollow
    </button>
  ) : (
    <button
      key={accountId}
      onClick={follow}
      className="flex items-center text-gray-600 hover:text-blue-600"
    >
      <FaConnectdevelop className="mr-2" /> Follow
    </button>
  );
};
