import SignOutBtn from "@/components/global/signout-btn";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  
  return (
    <main className="flex-1 flex flex-col p-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl">Welcome, {session?.user?.email}</h1>
        <SignOutBtn />
      </div>
    </main>
  );
};

export default HomePage;
