import { BarChart3, Home as HomeIcon, MessageSquare, Wrench, Users } from "lucide-react";

export function HostDashboard() {
  const metrics = [
    { title: "Reservas Ativas", value: "3", change: "+1 desde a última semana" },
    { title: "Receita (Mês)", value: "R$ 4.500", change: "+15% vs mês anterior" },
    { title: "Taxa de Ocupação", value: "85%", change: "Excelente" },
    { title: "Notificações", value: "2", change: "Mensagens não lidas" },
  ];

  const maintenance = [
    { id: 1, property: "Cobertura de Luxo...", issue: "Ar-condicionado falhando", status: "Pendente" },
    { id: 2, property: "Apartamento Moderno", issue: "Limpeza pós check-out", status: "Agendado" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-8 mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Dashboard</h1>
        <button className="bg-[#2A3B31] text-white px-6 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#1A1A1A] transition">
          + Novo Anúncio
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((m) => (
          <div key={m.title} className="bg-white p-8 rounded-[32px] border border-black/5 flex flex-col justify-between">
             <div className="text-[10px] font-bold uppercase tracking-widest text-[#E58E58] mb-4">{m.title}</div>
             <div className="text-3xl font-light leading-none tracking-tighter mb-1">{m.value}</div>
             <div className="text-xs opacity-50 mt-1 font-bold">{m.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Próximos Check-ins */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[40px] border border-black/5 flex flex-col p-8">
             <h2 className="text-xl font-bold mb-6">Mensagens e Entradas</h2>
            <div className="space-y-6">
               {[1, 2].map(i => (
                 <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-[#1A1A1A] shrink-0">
                      {i === 1 ? 'JO' : 'MA'}
                    </div>
                    <div className="flex-1 border-b border-black/5 pb-4">
                      <div className="flex justify-between">
                        <span className="font-bold text-sm">{i === 1 ? "João Augusto" : "Maria Silva"}</span>
                        <span className="text-[10px] opacity-40 uppercase font-bold">14:00</span>
                      </div>
                      <p className="text-xs opacity-60 mt-1">Check-in: Cobertura Copacabana</p>
                      <div className="mt-2">
                        <span className="text-[10px] px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">CONFIRMADO</span>
                      </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Manutenção */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           {maintenance.map(m => (
             <div key={m.id} className="bg-white rounded-[32px] p-8 border border-black/5 flex flex-col justify-between">
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-[#E58E58]">Ação Necessária</p>
                   <h3 className="text-xl font-bold mt-2 leading-tight">{m.issue}</h3>
                   <p className="text-sm opacity-50 mt-1">{m.property}</p>
                </div>
                <button className="mt-6 w-full py-4 bg-[#F8F7F4] rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#2A3B31] hover:text-white transition-colors">
                  Ver Ordem
                </button>
             </div>
           ))}
        </div>

      </div>

    </div>
  );
}
