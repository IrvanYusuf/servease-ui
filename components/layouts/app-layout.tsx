"use client";

import UsersServices from "@/services/user.service";
import { useUserStore } from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const setUser = useUserStore((state) => state.setUser);

  const { data: dataUser } = useQuery({
    queryKey: ["user-detail"],
    queryFn: UsersServices.getUser,
  });

  useEffect(() => {
    if (dataUser?.data !== undefined) {
      setUser(dataUser.data);
    }
  }, [dataUser, setUser]);
  return <div>{children}</div>;
};

export default AppLayout;
