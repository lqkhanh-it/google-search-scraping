import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyLogin } from "../models/user.model";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === "credentials") {
        token.userId = account.providerAccountId;
        token.accessToken = account.access_token
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) return null;
          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Email and password are required");
          }
          const user = await verifyLogin(email, password);

          if (!user) {
            return null;
          }

          return {
            id: user.uuid,
            email,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
