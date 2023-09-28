"use client";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

type LogoutButtonProps = {
  session: Session | null;
};

export default function LogoutButtons({ session }: LogoutButtonProps) {
  return (
    <>
      {session?.user ? (
        <Button onClick={() => signOut()} variant={"destructive"}>
          Logout
        </Button>
      ) : (
        <Button onClick={() => signIn("github")} variant={"purple"}>
          Login
        </Button>
      )}
    </>
  );
}
