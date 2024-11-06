import PostCreateLayout from "@/components/Layouts/PostCreateLayout";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import PostForm from "@/components/post/PostForm";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Post"
}

const PostCreate = () => {
  return (
    <PostCreateLayout>
      <PostForm>
      </PostForm>
    </PostCreateLayout>
  );
};

export default PostCreate;
