import SignInBtn from "@/components/global/signin-button";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const ErrorPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/home");
  
  return (
    <main className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <p className="">Access Denied, Please sign in again</p>
      <SignInBtn />
    </main>
  );
};

export default ErrorPage;
