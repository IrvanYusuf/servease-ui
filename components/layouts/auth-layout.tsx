import { ReactNode } from "react";
import GuestGuard from "@/components/guard/guest-guard";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <GuestGuard>{children}</GuestGuard>;
};

export default AuthLayout;
