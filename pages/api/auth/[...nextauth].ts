import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        try {
          const data = {
            email: (credentials as any).email || "",
            password: (credentials as any).password || "",
          };
          if (data) {
            if (
              data.email === "lendsqradmin@gmail.com" &&
              data.password === "lendsqradmin"
            ) {
              return true;
            }
          }
        } catch (error) {
          // @ts-ignore
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    // If there is a token, the user is authenticated
    async jwt({ token, user, account }: any) {
      if (user) {
        token.accessToken = user;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.token = token.accessToken;
      return session;
    },
  },
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
