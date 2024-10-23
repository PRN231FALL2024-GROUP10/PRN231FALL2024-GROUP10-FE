import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileLikes from "@/components/profile/ProfileLikes";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Likes"
}

const ProfilePageLike = () => {
  return (
    <ProfileLayout>
      <ProfileLikes>
        
      </ProfileLikes>
    </ProfileLayout>
  );
};

export default ProfilePageLike;
