import AccountManage from "@/components/admin/AccountManage";
import AdminLayout from "@/components/Layouts/AdminLayout";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import PostHome from "@/components/Layouts/PostHomeLayout";
import PostHomeLayout from "@/components/Layouts/PostHomeLayout";
import PostList from "@/components/post/PostList";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
export const metadata: Metadata = {
  title: "Admin | Accounts"
}

const AdminAccount = () => {

  return (
    <>
      <AdminLayout>
          <AccountManage></AccountManage>
        </AdminLayout>
    </>
  );
};

export default AdminAccount;
