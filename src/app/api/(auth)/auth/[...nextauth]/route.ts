import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

interface MyUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  createdAt: string;
  profilePic?: string | null;
  username: string;
}

declare module "next-auth" {
  interface Session {
    user: MyUser;
  }

  interface JWT {
    user?: MyUser;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || user.password !== credentials.password) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          birthDate: user.birthDate.toISOString(),
          createdAt: user.createdAt.toISOString(),
          profilePic: user.profilePic || null,
          username: user.username,
        } as MyUser;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = { ...user };
      }

      if (trigger === "update" && session?.user) {
        const currentUser = (token.user ?? {}) as Partial<MyUser>;
        token.user = { ...currentUser, ...session.user };
      }

      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as MyUser;
      }
      return session;
    },
  },

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
