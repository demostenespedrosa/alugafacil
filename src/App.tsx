import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GuestLayout } from "./components/layout/GuestLayout";
import { HostLayout } from "./components/layout/HostLayout";
import { AuthProvider } from "./contexts/AuthContext";

const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail").then(m => ({ default: m.PropertyDetail })));
const HostDashboard = lazy(() => import("./pages/HostDashboard").then(m => ({ default: m.HostDashboard })));
const GuestSaved = lazy(() => import("./pages/GuestSaved").then(m => ({ default: m.GuestSaved })));
const GuestMessages = lazy(() => import("./pages/GuestMessages").then(m => ({ default: m.GuestMessages })));
const GuestProfile = lazy(() => import("./pages/GuestProfile").then(m => ({ default: m.GuestProfile })));
const AuthPage = lazy(() => import("./pages/Auth").then(m => ({ default: m.Auth })));
const HostOnboarding = lazy(() => import("./pages/HostOnboarding").then(m => ({ default: m.HostOnboarding })));

function PageLoader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[50vh]">
      <div className="w-8 h-8 flex items-center justify-center">
         <div className="w-full h-full border-2 border-[#2A3B31]/20 border-t-[#2A3B31] rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/guest" replace />} />
          
          <Route path="/auth" element={<Suspense fallback={<PageLoader />}><AuthPage /></Suspense>} />
          <Route path="/host-onboarding" element={<Suspense fallback={<PageLoader />}><HostOnboarding /></Suspense>} />

          {/* Sistema do Inquilino (Guest) */}
          <Route path="/guest" element={<GuestLayout />}>
            <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
            <Route path="property/:id" element={<Suspense fallback={<PageLoader />}><PropertyDetail /></Suspense>} />
            <Route path="saved" element={<Suspense fallback={<PageLoader />}><GuestSaved /></Suspense>} />
            <Route path="messages" element={<Suspense fallback={<PageLoader />}><GuestMessages /></Suspense>} />
            <Route path="profile" element={<Suspense fallback={<PageLoader />}><GuestProfile /></Suspense>} />
          </Route>

          {/* Sistema do Proprietário (Host) */}
          <Route path="/host" element={<HostLayout />}>
            <Route index element={<Suspense fallback={<PageLoader />}><HostDashboard /></Suspense>} />
            <Route path="reservas" element={<div className="p-10 flex-1 flex flex-col items-center justify-center text-xs font-bold uppercase tracking-widest opacity-60">Gestão de Reservas (Fase 2)</div>} />
            <Route path="manutencao" element={<div className="p-10 flex-1 flex flex-col items-center justify-center text-xs font-bold uppercase tracking-widest opacity-60">Ordens de Manutenção (Fase 3)</div>} />
            <Route path="profile" element={<div className="p-10 flex-1 flex flex-col items-center justify-center text-xs font-bold uppercase tracking-widest opacity-60">Configurações do Anfitrião</div>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
