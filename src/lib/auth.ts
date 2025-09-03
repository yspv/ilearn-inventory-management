import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./prisma";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Nodemailer from "next-auth/providers/nodemailer";
import { sendMail } from "./mail";
import VerifyEmail from "@/components/email/verify-email";
import { render } from "@react-email/render";
import { User } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Facebook,
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT as any,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const { host } = new URL(url);
        const html = await render(VerifyEmail({ url }));
        await sendMail({
          to: email,
          subject: `Sign in to ${host}`,
          html,
        });
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => {
      const { isActive, isAdmin, createdAt, updatedAt } = user as User;
      return {
        ...session,
        user: {
          ...session.user,
          isActive,
          isAdmin,
          createdAt,
          updatedAt,
        },
      };
    },
  },
});
