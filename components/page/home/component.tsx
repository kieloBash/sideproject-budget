"use client";
import React from "react";
import useFetchSavingsToday from "@/hooks/useSavingsToday";
import dayjs from "dayjs";

// UI
import { DisplayHome } from "@/app/home/display";
import { CheckCircle2Icon } from "lucide-react";

const HomeComponent = () => {
  const savings = useFetchSavingsToday();
  console.log(savings);

  const goal = (savings.data?.goal || 0) - (savings.data?.savedAmount || 0);

  return (
    <div className="flex-1 flex justify-center items-center flex-col gap-6 text-main-600">
      {savings?.data?.metGoal ? (
        <div className="flex-1 flex justify-center items-center flex-col gap-4 text-center">
          <CheckCircle2Icon className="w-32 h-32 text-green-500" />
          <p className="text-6xl font-bold">Already Paid Today</p>
          <span className="text-xl">{dayjs().format("MMMM DD")}</span>
        </div>
      ) : (
        <>
          <DisplayHome
            goal={goal || 100}
            savedAmount={savings?.data?.savedAmount || 0}
          />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
