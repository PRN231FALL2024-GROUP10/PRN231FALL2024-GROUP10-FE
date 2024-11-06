import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
    data: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

import "next-auth/jwt";

// Type backend response
declare module "next-auth/jwt" {
  interface JWT {
    userData: User;
    data: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
