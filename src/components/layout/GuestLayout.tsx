import { Outlet } from "react-router-dom";
import { GuestNavbar } from "./GuestNavbar";
import { GuestMobileNav } from "./GuestMobileNav";

export function GuestLayout() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] font-sans text-[#1A1A1A] flex flex-col">
      <GuestNavbar />
      <main className="flex-1 flex w-full">
        <Outlet />
      </main>
      <GuestMobileNav />
    </div>
  );
}
