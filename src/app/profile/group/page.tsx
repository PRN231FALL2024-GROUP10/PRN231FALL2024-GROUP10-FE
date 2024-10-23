import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileGroup from "@/components/profile/ProfileGroup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile Groups"
  }
  
  const ProfilePageGroup = () => {
    return (
      <ProfileLayout>
        <ProfileGroup>
            
        </ProfileGroup>
      </ProfileLayout>
    );
  };
  
  export default ProfilePageGroup;
  