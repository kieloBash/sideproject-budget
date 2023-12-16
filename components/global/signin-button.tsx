"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <button type="button" onClick={handleSignInWithGoogle}>
      Sign In With Google
    </button>
  );
};

export default SignInBtn;
