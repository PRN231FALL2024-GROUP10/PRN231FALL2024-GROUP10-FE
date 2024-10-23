import PostCreateLayout from "@/components/Layouts/PostCreateLayout";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import PostForm from "@/components/post/PostForm";
import PostFormJob from "@/components/post/PostFormJob";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Job"
}

const JobCreate = () => {
  return (
    <PostCreateLayout>
      <PostFormJob>
      </PostFormJob>
    </PostCreateLayout>
  );
};

export default JobCreate;
