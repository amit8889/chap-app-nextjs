import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// Custom Session type with accessToken as required
interface CustomSession extends Session {
  accessToken: string;
}

// Custom JWT type, accessToken is optional
interface CustomJWT extends JWT {
  accessToken?: string;
}

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
            image: user.image,
          },
          process.env.JWT_SECRET || "your-jwt-secret",
          {
            expiresIn: "90d",
          }
        );
        token.accessToken = accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure session is treated as CustomSession with accessToken
      if (token?.accessToken && typeof token.accessToken == 'string') {
        (session as CustomSession).accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
