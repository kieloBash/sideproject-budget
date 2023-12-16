"use client";
import { Checker } from "@/lib/actions/temp";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useFetchSavingsToday = () => {
  const session = useSession();

  const { data, isLoading } = useQuery({
    queryKey: [`savings:today`],
    queryFn: async () => {
      console.log(session.data?.user);

      const savings = await Checker(session.data?.user?.email || "");

      return savings;
    },
    enabled: session?.data?.user !== undefined,
  });
  return { data, isLoading };
};

export default useFetchSavingsToday;
