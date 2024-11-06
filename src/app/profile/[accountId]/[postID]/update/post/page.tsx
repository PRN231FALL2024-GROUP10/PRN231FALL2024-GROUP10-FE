import PostUpdateForm from "@/components/post/PostUpdateForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Post",
};

const PostUpdate = async (props: {
  params: Promise<{ postID: string; accountId: string }>;
}) => {
  const params = await props.params;
  return (
    <div className="flex justify-evenly">
      <section className="w-2/3">
        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <PostUpdateForm postId={params.postID}></PostUpdateForm>
        </div>
      </section>
    </div>
  );
};

export default PostUpdate;
