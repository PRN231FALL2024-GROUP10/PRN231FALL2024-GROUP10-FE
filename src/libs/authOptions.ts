import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const { email, password } = credentials;
          const res = await fetch(
            `http://localhost:5268/odata/authentications/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email,
                password,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            console.error("Error:", res.status, res.statusText);
            return null;
          }

          const user = await res.json();

          return user;
        } catch (error) {
          console.error("Fetch error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // return { ...token, ...user };
        return {
          userData: user,
          data: {
            accessToken: user.accessToken,
            refreshToken: user.accessToken,
          },
        };
      }

      return token;
      // if (new Date().getTime() < token.data.expiresIn) {
      //   return token;
      // }
      // return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.userData;
      session.data = token.data;

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/user/refresh-token`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token.data.refreshToken}`,
      },
    }
  );

  const response = await res.json();

  return {
    ...token,
    data: response,
  };
}
