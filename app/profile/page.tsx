import Profile from "@/components/Profile";
import ProtectedRoute from "../protected/route";
export default async function ProfilePage() {
  return (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  );
}
