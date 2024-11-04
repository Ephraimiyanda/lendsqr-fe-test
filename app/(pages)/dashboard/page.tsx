"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  //redirect to login page if not logged in
  const sesssion = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/login");
    },
  });

  return (
    <div className="h-full">
      <div className="dashboard-welcome h-full column-container justify-center align-center">
        <h1>Welcome to your admin dashboard</h1>
        <p>Navigate to other pages using the sidebar</p>
      </div>
    </div>
  );
}
Dashboard.auth = true;
