import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/user";

const MAX_FAILED_LOGINS = 5;
const LOCK_MS = 15 * 60 * 1000;
const SESSION_RECHECK_MS = 5 * 60 * 1000;

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        // Register stores emails lowercased, so match that
        const email = String(credentials.email).toLowerCase().trim();
        const user = await User.findOne({ email });
        if (!user) return null;

        // Locked after too many wrong passwords; reject even a correct one until it expires
        if (user.lockUntil && user.lockUntil > new Date()) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) {
          const failedLogins = (user.failedLogins ?? 0) + 1;
          await User.updateOne(
            { _id: user._id },
            failedLogins >= MAX_FAILED_LOGINS
              ? { failedLogins: 0, lockUntil: new Date(Date.now() + LOCK_MS) }
              : { failedLogins }
          );
          return null;
        }

        if (user.failedLogins || user.lockUntil) {
          await User.updateOne(
            { _id: user._id },
            { failedLogins: 0, $unset: { lockUntil: 1 } }
          );
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.loginAt = Date.now();
        token.checkedAt = Date.now();
        return token;
      }

      // Re-check the user every few minutes (not every request) so a password
      // change logs out sessions that were created before it
      if (Date.now() - ((token.checkedAt as number) ?? 0) > SESSION_RECHECK_MS) {
        await connectDB();
        const dbUser = await User.findById(token.id)
          .select("passwordChangedAt")
          .lean<{ passwordChangedAt?: Date }>();

        if (
          !dbUser ||
          (dbUser.passwordChangedAt &&
            dbUser.passwordChangedAt.getTime() > ((token.loginAt as number) ?? 0))
        ) {
          return null;
        }

        token.checkedAt = Date.now();
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
});