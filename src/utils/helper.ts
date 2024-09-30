import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const checkUser = {
  async isActive() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      redirect("/auth/signin");
    }

    if (!session.user.isActive) {
      redirect("auth/forbidden");
    }
  },
};
