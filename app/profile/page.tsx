import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Profile from "@/components/Profile";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Profile />
    </SessionProvider>
  );
}
