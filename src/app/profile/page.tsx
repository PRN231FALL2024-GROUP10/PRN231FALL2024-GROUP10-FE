import ProfileLayout from "@/components/Layouts/ProfileLayout";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile"
}

const ProfilePage = () => {
  return (
    <ProfileLayout>
      <ProfileInfo>

      </ProfileInfo>
    </ProfileLayout>
  );
};

export default ProfilePage;
