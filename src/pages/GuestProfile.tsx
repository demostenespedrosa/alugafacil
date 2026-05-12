import { LogOut, User, FileText, CreditCard, Bell, Shield, HelpCircle } from "lucide-react";

export function GuestProfile() {
  const menuItems = [
    { icon: User, label: "Informações Pessoais", description: "Atualize seus dados" },
    { icon: FileText, label: "Reservas", description: "Histórico de viagens" },
    { icon: CreditCard, label: "Pagamentos", description: "Cartões e transações" },
    { icon: Bell, label: "Notificações", description: "Preferências de contato" },
    { icon: Shield, label: "Privacidade e Segurança", description: "Segurança da conta" },
    { icon: HelpCircle, label: "Central de Ajuda", description: "Dúvidas e suporte" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full pb-28 md:pb-12">
      <h1 className="text-3xl font-light tracking-tighter text-[#1A1A1A] mb-8">Perfil</h1>

      <div className="bg-white rounded-[40px] border border-black/5 p-6 sm:p-8 shadow-sm mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-[#E58E58] rounded-full flex items-center justify-center font-black text-white text-2xl">
            MC
          </div>
          <div>
            <h2 className="text-xl font-bold">Mariana Costa</h2>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-1">Hóspede desde 2023</p>
            <p className="text-sm font-medium mt-1">mariana.costa@email.com</p>
          </div>
        </div>
        <button className="hidden sm:block px-6 py-3 bg-[#F8F7F4] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2A3B31] hover:text-white transition-colors">
          Editar Perfil
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-black/5 p-6 sm:p-8 shadow-sm">
        <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-6">Configurações da Conta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {menuItems.map((item) => (
            <div key={item.label} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-[#F8F7F4] cursor-pointer transition-colors group">
              <div className="w-12 h-12 bg-[#F8F7F4] group-hover:bg-white rounded-full flex items-center justify-center text-[#2A3B31]">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm">{item.label}</div>
                <div className="text-[10px] opacity-50 uppercase tracking-widest font-bold mt-1">{item.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-black/5">
          <button className="flex items-center gap-3 text-red-500 hover:text-red-600 font-bold text-sm transition-colors px-4">
             <LogOut className="w-5 h-5" />
             Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
