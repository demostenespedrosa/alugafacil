import { Outlet, Navigate } from "react-router-dom";
import { HostNavbar } from "./HostNavbar";
import { HostMobileNav } from "./HostMobileNav";
import { useAuth } from "../../contexts/AuthContext";

export function HostLayout() {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
     return <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">Carregando...</div>;
  }

  if (!user || profile?.role !== 'host') {
     return <Navigate to="/guest/profile" replace />;
  }

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
