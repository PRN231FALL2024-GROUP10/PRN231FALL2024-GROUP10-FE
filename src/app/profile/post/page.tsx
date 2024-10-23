import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Posts"
}

const ProfilePagePost = () => {
  return (
    <ProfileLayout>
      <ProfilePost>

      </ProfilePost>
    </ProfileLayout>
  );
};

export default ProfilePagePost;
