import SignInBtn from "@/components/global/signin-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/home");

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
}
