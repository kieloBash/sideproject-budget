import SignOutBtn from "@/components/global/signout-btn";
import { checkIfPaid } from "@/lib/actions/temp";
import { authOptions } from "@/utils/authOptions";
import { CheckCircle2Icon } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";
import { DisplayHome } from "./display";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  const paid = await checkIfPaid(session?.user?.email || "");

  console.log(paid);
  return (
    <main className="flex-1 flex flex-col p-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Welcome, {session?.user?.email}</h1>
        <SignOutBtn />
      </div>
      <div className="flex-1 flex justify-center items-center flex-col gap-6">
        {paid ? (
          <>
            <CheckCircle2Icon className="w-20 h-20" />
            <p className="text-4xl font-bold">Already Paid for Today</p>
          </>
        ) : (
          <>
            <DisplayHome />
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
