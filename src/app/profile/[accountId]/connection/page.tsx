import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileFollow from "@/components/profile/ProfileFollow";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile Connections"
  }
  
  const ProfilePageFollow = async (props: { params: Promise<{accountId: string}> }) => {
    const params = await props.params;

    return (
      <ProfileLayout accountId={params.accountId}>
        <ProfileFollow profileId={params.accountId}>
            
        </ProfileFollow>
      </ProfileLayout>
    );
  };
  
  export default ProfilePageFollow;
  