export type User = {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  roles: Roles[];
};

export type Roles = {
  id: number;
  name: string;
  description: string;
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
