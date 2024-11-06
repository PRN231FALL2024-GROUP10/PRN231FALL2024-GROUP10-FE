import AccountManage from "@/components/admin/AccountManage";
import PostManage from "@/components/admin/PostManage";
import AdminLayout from "@/components/Layouts/AdminLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PostHome from "@/components/Layouts/PostHomeLayout";
import PostHomeLayout from "@/components/Layouts/PostHomeLayout";
import PostList from "@/components/post/PostList";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
export const metadata: Metadata = {
  title: "Admin | Posts"
}

const AdminPost = () => {

  return (
    <>
      <AdminLayout>
          <PostManage></PostManage>
        </AdminLayout>
    </>
  );
};

export default AdminPost;
