import { Link } from "react-router-dom";

export function HostNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5 hidden md:block shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-baseline space-x-2">
             <Link to="/host" className="text-2xl font-black tracking-tighter text-[#2A3B31]">
               ALUGAFÁCIL<span className="text-[#E58E58]">.</span> <span className="text-xs font-bold uppercase tracking-widest ml-2 opacity-60">Host</span>
             </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest opacity-60">
            <Link to="/host" className="text-[#E58E58] opacity-100">Dashboard</Link>
            <Link to="/host">Imóveis</Link>
            <Link to="/host">Reservas</Link>
            <Link to="/host">Manutenção</Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/guest" className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-[#E58E58] transition-colors bg-[#F8F7F4] px-4 py-2 rounded-full border border-black/5">
              Modo Inquilino
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right hidden lg:block mr-2">
                <div className="text-xs font-bold">Carlos Andrade</div>
                <div className="text-[10px] opacity-50 uppercase tracking-tighter">Superhost</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#2A3B31] text-white flex items-center justify-center font-bold">
                 CA
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
