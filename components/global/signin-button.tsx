"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Chrome } from "lucide-react";

const SignInBtn = () => {
  const router = useRouter();
  const handleSignInWithGoogle = async () => {
    const result = await signIn("google", { redirect: false });
    console.log(result);
    if (result) {
      router.push("/");
    } else console.error("Google sign-in error, Unauthorized");
  };
  return (
    <Button type="button" onClick={handleSignInWithGoogle}>
      <Chrome className="mr-2" />
      Sign In With Google
    </Button>
  );
};

export default SignInBtn;
