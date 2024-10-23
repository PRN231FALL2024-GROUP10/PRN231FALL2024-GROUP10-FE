import PostCreateLayout from "@/components/Layouts/PostCreateLayout";
import ProfileLayout from "@/components/Layouts/ProfileLayout";
import PostForm from "@/components/post/PostForm";
import PostUpdateForm from "@/components/post/PostUpdateForm";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePost from "@/components/profile/ProfilePost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Post"
}

const PostUpdate = () => {
  return (
    <PostUpdateForm>

    </PostUpdateForm>
  );
};

export default PostUpdate;
