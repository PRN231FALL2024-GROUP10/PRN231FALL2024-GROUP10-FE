import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Posts"
}

const ProfilePagePost = async (props: { params: Promise<{accountId: string}> }) => {
  const params = await props.params;
  return (
    <ProfileLayout accountId={params.accountId}>
      <ProfilePost profileId={params.accountId}>

      </ProfilePost>
    </ProfileLayout>
  );
};

export default ProfilePagePost;
