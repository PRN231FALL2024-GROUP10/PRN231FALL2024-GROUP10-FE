export type User = {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  accessToken: string;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
