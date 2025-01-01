import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          process.env.JWT_SECRET || "your-jwt-secret",
          {
            expiresIn: "1h", 
          }
        );

        token.accessToken = accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
