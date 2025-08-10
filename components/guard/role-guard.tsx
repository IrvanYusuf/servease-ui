"use client";
import { PATHS } from "@/lib/paths";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Loader from "../loader";

interface RoleGuardProps {
  children: ReactNode;
  roles?: string[];
}

const RoleGuard = ({ children, roles }: RoleGuardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  // Pastikan komponen sudah mount di client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!token && user) {
      router.push(PATHS.auth.login);
      return;
    }

    if (user && roles && !roles.includes(user.role)) {
      router.push(PATHS.home.root);
    }
  }, [isMounted, token, user, roles, router]);

  // Render loading state sampai mounted dan hydrated
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export default RoleGuard;
