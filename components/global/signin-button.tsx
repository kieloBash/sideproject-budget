"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
    <Button
      type="button"
      onClick={handleSignInWithGoogle}
      className="w-full py-6"
    >
      <svg
        width="20"
        height="20"
        fill="currentColor"
        className="mr-2"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
      </svg>
      Sign In With Google
    </Button>
  );
};

export default SignInBtn;
