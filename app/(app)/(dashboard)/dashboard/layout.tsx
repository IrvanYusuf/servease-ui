import RoleGuard from "@/components/guard/role-guard";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { ReactNode } from "react";

const DashboardLayoutRoot = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["PARTNER", "ADMIN"]}>
      <DashboardLayout>{children}</DashboardLayout>
    </RoleGuard>
  );
};

export default DashboardLayoutRoot;
