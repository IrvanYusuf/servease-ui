"use client";

import { PATHS } from "@/lib/paths";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    console.log("Hydrated?", hasHydrated);
    console.log("Token?", token);
    if (hasHydrated && token) {
      router.push(PATHS.home.root);
    }
  }, [hasHydrated, token, router]);

  if (!hasHydrated) return null; // atau loading spinner
  return <div>{children}</div>;
};

export default GuestGuard;
