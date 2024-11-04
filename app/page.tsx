"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  //redirect to login page if not logged in
  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  return <div>redirecting</div>;
}
Home.auth = true;
