import SignOutBtn from "@/components/global/signout-btn";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import { ProfileAvatar } from "@/components/global/profile";
import HomeComponent from "@/components/page/home/component";
import { ListModal } from "@/components/page/home/modal/list";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex-1 flex flex-col p-8 gap-8">
      <div className="w-full flex justify-between items-center text-main-600">
        <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
        <ProfileAvatar
          src={session?.user?.image || ""}
          name={session?.user?.name || ""}
        />
      </div>
      <HomeComponent />
      <div className="w-full flex justify-between items-center">
        <ListModal />
        <SignOutBtn />
      </div>
    </main>
  );
};

export default HomePage;
