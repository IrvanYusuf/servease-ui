import AuthLayout from "@/components/layouts/auth-layout";
import { ReactNode } from "react";

const RegisterRootLayut = ({ children }: { children: ReactNode }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default RegisterRootLayut;
