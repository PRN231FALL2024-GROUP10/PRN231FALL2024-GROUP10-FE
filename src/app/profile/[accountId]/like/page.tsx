import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileLikes from "@/components/profile/ProfileLikes";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Likes"
}

const ProfilePageLike = async (props: { params: Promise<{accountId: string}> }) => {
  const params = await props.params;
  return (
    <ProfileLayout accountId={params.accountId}>
      <ProfileLikes profileId={params.accountId}>
        
      </ProfileLikes>
    </ProfileLayout>
  );
};

export default ProfilePageLike;
