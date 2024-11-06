import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile"
}

const  ProfilePage = async (props: { params: Promise<{accountId: string}> }) => {
  const params = await props.params;
  return (
    <ProfileLayout accountId={params.accountId}>
      <ProfileInfo profileId={params.accountId}>

      </ProfileInfo>
    </ProfileLayout>
  );
};

export default ProfilePage;
