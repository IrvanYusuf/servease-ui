import ProfileLayout from "@/components/layouts/profile-layout";
import { ReactNode } from "react";

const ProfileRootLayout = ({ children }: { children: ReactNode }) => {
  return <ProfileLayout>{children}</ProfileLayout>;
};

export default ProfileRootLayout;
