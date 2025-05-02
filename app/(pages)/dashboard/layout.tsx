import { Navbar } from "@/app/components/navigation/navbar/navbar";
import { Sidebar } from "@/app/components/navigation/sidebar/sideBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="column-container overflow-hidden screen-container ">
      <Navbar></Navbar>
      <div className="row-container flex-1 overflow-auto">
        <div className="h-full">
          <Sidebar isOpen={true} onClose={undefined}></Sidebar>
        </div>
        <div className="shadow w-full flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
