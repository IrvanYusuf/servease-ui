"use client";
import { PATHS } from "@/lib/paths";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && !token) {
      router.push(PATHS.auth.login);
    }
  }, [hasHydrated, token, router]);

  if (!hasHydrated) return null; // atau loading spinner
  return <>{children}</>;
};

export default AuthGuard;
