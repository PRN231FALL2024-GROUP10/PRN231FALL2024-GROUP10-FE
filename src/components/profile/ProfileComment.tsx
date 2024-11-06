import { API_COMMENT_ADD } from "@/utils/api-links";
import { useSession } from "next-auth/react";
import React, { useState } from "react";


const ProfileComment = ({profileId}) => {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");

  return (
    <h1>No result found.</h1>
  );
};

export default ProfileComment;
