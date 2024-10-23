import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Comments"
}

const ProfilePageComment = () => {
  return (
    <ProfileLayout>
      <ProfilePost>

      </ProfilePost>
    </ProfileLayout>
  );
};

export default ProfilePageComment;
