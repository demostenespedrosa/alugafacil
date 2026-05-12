import { Link } from "react-router-dom";

export function GuestNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/5 hidden md:block shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-baseline space-x-2">
             <Link to="/guest" className="text-2xl font-black tracking-tighter text-[#2A3B31]">
               ALUGAFÁCIL<span className="text-[#E58E58]">.</span>
             </Link>
          </div>
          
          <div className="hidden md:flex flex-1 max-w-md mx-8">
             <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder="Para onde você vai?"
                  className="w-full bg-[#F8F7F4] rounded-full pl-6 pr-4 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#E58E58]/20 focus:bg-white border border-black/5 transition-all"
                />
                <button className="absolute right-1 top-1 bg-[#2A3B31] rounded-full p-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
             </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/host" className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 hover:text-[#E58E58] transition-colors">
              Modo Anfitrião
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-right hidden lg:block mr-2">
                <div className="text-xs font-bold">Mariana Costa</div>
                <div className="text-[10px] opacity-50 uppercase tracking-tighter">Hóspede</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#E58E58] text-white flex items-center justify-center font-bold">
                 MC
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
