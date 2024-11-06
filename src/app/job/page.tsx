
import PostHomeLayout from "@/components/Layouts/PostHomeLayout";
import PostListJob from "@/components/post/PostListJob";

const JobPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <PostHomeLayout>
        <PostListJob>
        </PostListJob>
      </PostHomeLayout>
    </div>
  );
};

export default JobPage;