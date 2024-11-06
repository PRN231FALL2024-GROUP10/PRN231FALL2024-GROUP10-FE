import AccountManage from "@/components/admin/AccountManage";
import AdminLayout from "@/components/Layouts/AdminLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PostHome from "@/components/Layouts/PostHomeLayout";
import PostHomeLayout from "@/components/Layouts/PostHomeLayout";
import PostList from "@/components/post/PostList";
import { useSession } from "next-auth/react";

const AdminHome = () => {

  return (
    <>
      <AdminLayout>
          <AccountManage></AccountManage>
        </AdminLayout>
    </>
  );
};

export default AdminHome;
