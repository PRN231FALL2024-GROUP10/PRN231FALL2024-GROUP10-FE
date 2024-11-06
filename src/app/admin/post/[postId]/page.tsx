import AccountManage from "@/components/admin/AccountManage";
import AdminPostDetail from "@/components/admin/AdminPostDetail";
import PostManage from "@/components/admin/PostManage";
import AdminLayout from "@/components/Layouts/AdminLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PostHome from "@/components/Layouts/PostHomeLayout";
import PostHomeLayout from "@/components/Layouts/PostHomeLayout";
import PostList from "@/components/post/PostList";
import { Metadata } from "next";
import { useSession } from "next-auth/react";

export const metadata: Metadata = {
    title: "Admin | Post Detail"
  }

  
const AdminPost = async (props: { params: Promise<{postId: string}> }) => {
    const params = await props.params;
  return (
    <>
      <AdminLayout>
          <AdminPostDetail postId={params.postId}></AdminPostDetail>
        </AdminLayout>
    </>
  );
};

export default AdminPost;
