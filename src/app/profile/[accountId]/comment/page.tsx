import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Comments"
}

const ProfilePageComment = async (props: { params: Promise<{accountId: string}> }) => {
  const params = await props.params;

  return (
    <ProfileLayout accountId={params.accountId}>
      <ProfilePost profileId={params.accountId}>

      </ProfilePost>
    </ProfileLayout>
  );
};

export default ProfilePageComment;
