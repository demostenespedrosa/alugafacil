import { Outlet } from "react-router-dom";
import { HostNavbar } from "./HostNavbar";
import { HostMobileNav } from "./HostMobileNav";

export function HostLayout() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans text-[#1A1A1A] flex flex-col">
      <HostNavbar />
      <main className="flex-1 flex w-full">
        <Outlet />
      </main>
      <HostMobileNav />
    </div>
  );
}
