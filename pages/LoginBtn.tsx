"use client";
import { signIn } from "next-auth/react";
//import Image from "next/image";

export function loginBtn() {
  return (
    <button
      onClick={() => signIn("google", { callbackurl: "/dashboard" })}
      className="flex gap-2 items-center border border-neutral-900 p-2 rounded-md"
    >
      Login com Google
    </button>
  );
}
