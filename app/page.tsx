"use client";

import SignInBtn from "@/components/global/signin-button";
import { addSavingsRecordByEmail } from "@/lib/actions/temp";
import { useSession, signOut } from "next-auth/react";

export default function HomePage() {
  const session = useSession();
  console.log(session);

  async function handleAddSavings() {
    console.log("object");

    console.log(session?.data?.user?.email);
    const res = await addSavingsRecordByEmail({
      email: session?.data?.user?.email || "",
      savedAmount: 0,
      metGoal: true,
      date: new Date(),
    });
    console.log(res);
    // alert()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <SignInBtn />

      {session.status !== "authenticated" ? (
        <p>Not signed in</p>
      ) : (
        <>
          <button type="button" onClick={handleAddSavings}>
            Add Record
          </button>
          <button type="button" onClick={() => signOut()}>
            Sign Out
          </button>
          <p>Signed in as: {session.data.user?.email}</p>
        </>
      )}
    </main>
  );
}
