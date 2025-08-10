import AuthGuard from "@/components/guard/auth-guard";
import { FC, ReactNode } from "react";

interface BookingLayoutRootPprops {
  children: ReactNode;
}

const BookingLayoutRoot: FC<BookingLayoutRootPprops> = ({ children }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default BookingLayoutRoot;
