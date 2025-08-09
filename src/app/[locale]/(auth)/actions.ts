"use server";
import { signIn } from "@/lib/auth";

export async function emailVerification(state: any, formData: FormData) {
  await signIn("nodemailer", formData);
}
