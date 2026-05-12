import { Search } from "lucide-react";

export function GuestMessages() {
  const messages = [
    {
      id: 1,
      hostName: "Carlos Andrade",
      initials: "CA",
      property: "Cobertura de Luxo",
      lastMessage: "Olá! Sim, o check-in antecipado é possível dependendo da...",
      time: "10:30",
      unread: true,
    },
    {
      id: 2,
      hostName: "Juliana Silva",
      initials: "JS",
      property: "Chalé Charmoso",
      lastMessage: "Obrigada pela reserva! Te enviei as instruções de...",
      time: "ONTEM",
      unread: false,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full pb-28 md:pb-12">
      <h1 className="text-3xl font-light tracking-tighter text-[#1A1A1A] mb-8">Mensagens</h1>

      <div className="bg-white rounded-[40px] border border-black/5 flex flex-col p-6 sm:p-8 shadow-sm">
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Buscar mensagens..."
            className="w-full bg-[#F8F7F4] rounded-full pl-12 pr-4 py-3 text-xs font-bold outline-none border border-black/5"
          />
          <Search className="w-4 h-4 absolute left-5 top-3.5 opacity-40" />
        </div>

        <div className="space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-4 cursor-pointer group">
              <div className="w-14 h-14 bg-[#2A3B31] rounded-full flex items-center justify-center font-bold text-white shrink-0 group-hover:scale-105 transition-transform">
                {msg.initials}
              </div>
              <div className="flex-1 border-b border-black/5 pb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`text-sm ${msg.unread ? 'font-black' : 'font-bold'}`}>{msg.hostName}</span>
                  <span className={`text-[10px] uppercase font-bold ${msg.unread ? 'text-[#E58E58]' : 'opacity-40'}`}>{msg.time}</span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">{msg.property}</p>
                <p className={`text-xs ${msg.unread ? 'font-bold opacity-100 text-[#1A1A1A]' : 'opacity-60 font-medium'} line-clamp-1`}>
                  {msg.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
