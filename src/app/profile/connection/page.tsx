import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileFollow from "@/components/profile/ProfileFollow";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile Connections"
  }
  
  const ProfilePageFollow = () => {
    return (
      <ProfileLayout>
        <ProfileFollow>
            
        </ProfileFollow>
      </ProfileLayout>
    );
  };
  
  export default ProfilePageFollow;
  