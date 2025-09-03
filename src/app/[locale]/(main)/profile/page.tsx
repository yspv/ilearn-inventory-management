import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }
  redirect(`/profile/${session.user.id}`);
}
