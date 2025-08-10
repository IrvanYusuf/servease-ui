import ClientLayout from "@/components/layouts/client-layout";
import { ReactNode } from "react";

const ClientRootLayout = ({ children }: { children: ReactNode }) => {
  return <ClientLayout>{children}</ClientLayout>;
};

export default ClientRootLayout;
