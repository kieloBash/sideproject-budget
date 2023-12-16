"use client";
import { fetchSavingsByUserId } from "@/lib/actions/temp";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useFetchAllSavings = () => {
  const session = useSession();

  const { data, isLoading } = useQuery({
    queryKey: [`savings:all`],
    queryFn: async () => {
      console.log(session.data?.user);

      const savings = await fetchSavingsByUserId(
        session.data?.user?.email || ""
      );

      return savings;
    },
    enabled: session?.data?.user !== undefined,
  });
  return { data, isLoading };
};

export default useFetchAllSavings;
