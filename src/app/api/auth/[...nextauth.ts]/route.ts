import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyLogin } from "../../../../models/user.model";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if(!credentials) return null
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
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
