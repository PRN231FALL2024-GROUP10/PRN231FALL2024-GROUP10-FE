import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileGroup from "@/components/profile/ProfileGroup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile Groups"
  }
  
  const ProfilePageGroup = async (props: { params: Promise<{accountId: string}> }) => {
    const params = await props.params;
    return (
      <ProfileLayout accountId={params.accountId}>
        <ProfileGroup>
            
        </ProfileGroup>
      </ProfileLayout>
    );
  };
  
  export default ProfilePageGroup;
  