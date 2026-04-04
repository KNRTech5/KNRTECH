export const dynamic = "force-dynamic";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          // Connect to database
          await connectDB();

          // Check if this is the first login - create admin account automatically
          const adminExists = await Admin.findOne({ email: credentials.email });

          if (!adminExists) {
            // First time login - create admin with provided credentials
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newAdmin = await Admin.create({
              email: credentials.email,
              passwordHash: hashedPassword,
              lastLogin: new Date(),
            });

            return {
              id: newAdmin._id.toString(),
              email: credentials.email,
              name: "Admin",
            };
          }

          // Existing admin - verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            adminExists.passwordHash
          );

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          // Update last login
          await Admin.updateOne(
            { email: credentials.email },
            { lastLogin: new Date() }
          );

          return {
            id: adminExists._id.toString(),
            email: adminExists.email,
            name: "Admin",
          };
        } catch (error) {
          console.error("NextAuth authorize error:", error);
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Internal authentication failure");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        (session.user as any).id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login", // Redirect errors to login page
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

