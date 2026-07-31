import Navbar from "@/components/Layout/Navbar";
import { getMe } from "@/services/getMe";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user?.data} /> {children}
    </div>
  );
};

export default AuthLayout;
