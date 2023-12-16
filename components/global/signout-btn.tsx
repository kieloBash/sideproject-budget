"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const SignOutBtn = () => {
  return (
    <Button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="py-6"
    >
      <LogOut className="mr-1"/>
      Sign out
    </Button>
  );
};

export default SignOutBtn;
