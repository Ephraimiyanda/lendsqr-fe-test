"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  //redirect to login page if not logged in
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });
if(session.status==="authenticated"){
  redirect("/dashboard");
}
  return <div></div>;
}
Home.auth = true;
