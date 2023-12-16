"use client";

import SignInBtn from "@/components/global/signin-button";
import { Button } from "@/components/ui/button";
import { addSavingsRecordByEmail } from "@/lib/actions/temp";
import { LogOut, Plus } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  const session = useSession();
  const { toast } = useToast();

  async function handleAddSavings() {
    const res = await addSavingsRecordByEmail({
      email: session?.data?.user?.email || "",
      savedAmount: 0,
      metGoal: true,
      date: new Date(),
    });
    toast({
      title: "Added Savings",
    });
    // alert()
  }

  return (
    <main className="flex min-h-screen w-screen justify-center items-center">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Welcome to the Budget App</CardTitle>
          <CardDescription>
            Budget reminders to save up to your dream goal.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <SignInBtn />
        </CardContent>
        <CardFooter>
          <p>Log in now</p>
        </CardFooter>
      </Card>
    </main>
  );

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
  //     {session.status !== "authenticated" ? (
  //       <>
  //         <SignInBtn />
  //         <p>Not signed in</p>
  //       </>
  //     ) : (
  //       <>
  //         <Button
  //           type="button"
  //           className="w-36 py-6"
  //           onClick={handleAddSavings}
  //         >
  //           <Plus className="mr-2" />
  //           Add Record
  //         </Button>
  //         <Button type="button" className="w-36 py-6" onClick={() => signOut()}>
  //           <LogOut className="mr-2" /> Sign Out
  //         </Button>
  //         <p>Signed in as: {session.data.user?.email}</p>
  //       </>
  //     )}
  //   </main>
  // );
}
