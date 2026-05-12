import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GuestLayout } from "./components/layout/GuestLayout";
import { HostLayout } from "./components/layout/HostLayout";
import { Home } from "./pages/Home";
import { PropertyDetail } from "./pages/PropertyDetail";
import { HostDashboard } from "./pages/HostDashboard";
import { GuestSaved } from "./pages/GuestSaved";
import { GuestMessages } from "./pages/GuestMessages";
import { GuestProfile } from "./pages/GuestProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/guest" replace />} />
        
        {/* Sistema do Inquilino (Guest) */}
        <Route path="/guest" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="saved" element={<GuestSaved />} />
          <Route path="messages" element={<GuestMessages />} />
          <Route path="profile" element={<GuestProfile />} />
        </Route>

        {/* Sistema do Proprietário (Host) */}
        <Route path="/host" element={<HostLayout />}>
          <Route index element={<HostDashboard />} />
          <Route path="reservas" element={<div className="p-10 flex-1 flex flex-col items-center justify-center text-xs font-bold uppercase tracking-widest opacity-60">Gestão de Reservas (Fase 2)</div>} />
          <Route path="manutencao" element={<div className="p-10 flex-1 flex flex-col items-center justify-center text-xs font-bold uppercase tracking-widest opacity-60">Ordens de Manutenção (Fase 3)</div>} />
          <Route path="profile" element={<div className="p-10 flex-1 flex flex-col items-center justify-center text-xs font-bold uppercase tracking-widest opacity-60">Configurações do Anfitrião</div>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
