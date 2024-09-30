import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'User Name',
          type: 'text',
          placeholder: 'Your User Name',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { email, password } = credentials;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              email,
              password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (res.status == 401 || res.status == 403) {
          return null;
        }

        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() < token.data.expiresIn) {
        return token;
      }
      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.userData;
      session.data = token.data;

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
};

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/user/refresh-token`,
    {
      method: 'POST',
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
