
import PostHomeLayout from "@/components/Layouts/PostHomeLayout";
import PostList from "@/components/post/PostList";

const PostPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <PostHomeLayout>
        <PostList key={''}>
        </PostList>
      </PostHomeLayout>
    </div>
  );
};

export default PostPage;
