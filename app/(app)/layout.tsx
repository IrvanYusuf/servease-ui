import AppLayout from "@/components/layouts/app-layout";
import { ReactNode } from "react";

const AppRootLayout = ({ children }: { children: ReactNode }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default AppRootLayout;
