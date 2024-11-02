import { Navbar } from "@/app/components/navigation/navbar";
import { Sidebar } from "@/app/components/navigation/sideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="column-container overflow-hidden screen-container ">
      <Navbar></Navbar>
      <div className="row-container flex-1 overflow-auto">
        <div className="overflow-auto h-full">
          <Sidebar></Sidebar>
        </div>
        <div className="shadow w-full flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
