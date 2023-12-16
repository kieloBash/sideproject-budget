"use client";
import React from "react";
import useFetchSavingsToday from "@/hooks/useSavingsToday";
import dayjs from "dayjs";

// UI
import { DisplayHome } from "@/app/home/display";
import { CheckCircle2Icon, Loader2 } from "lucide-react";

const HomeComponent = () => {
  const savings = useFetchSavingsToday();

  const goal = (savings.data?.goal || 0) - (savings.data?.savedAmount || 0);

  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-6 text-main-600">
      {savings.isLoading || savings.data === undefined ? (
        <>
          <Loader2 className="w-10 h-10 animate-spin" />
        </>
      ) : (
        <>
          {savings?.data?.metGoal ? (
            <div className="flex-1 flex justify-center items-center flex-col gap-4 text-center">
              <CheckCircle2Icon className="w-32 h-32 text-green-500" />
              <p className="text-6xl font-bold">Already Paid Today</p>
              <span className="text-xl">{dayjs().format("MMMM DD")}</span>
            </div>
          ) : (
            <>
              <DisplayHome
                goal={goal as number}
                savedAmount={savings?.data?.savedAmount as number}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomeComponent;
