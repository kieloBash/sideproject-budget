import { addUser } from "@/lib/actions/temp";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      // Allow only specific email addresses
      const allowedEmails = [
        "liezelpar2001@gmail.com",
        "kielo.mercado04@gmail.com",
      ];
      const prisma = new PrismaClient();

      if (allowedEmails.includes(profile?.email || "")) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile?.email,
          },
        });


        if (!user) {
          const res = await addUser({
            email: profile?.email || "",
            name: profile?.name || "",
          });
          console.log(res);
        }

        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
