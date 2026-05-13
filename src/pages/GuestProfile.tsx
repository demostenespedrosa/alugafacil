import { LogOut, User, FileText, CreditCard, Bell, Shield, HelpCircle, Key } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";

export function GuestProfile() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: User, label: "Informações Pessoais", description: "Atualize seus dados" },
    { icon: FileText, label: "Reservas", description: "Histórico de viagens" },
    { icon: CreditCard, label: "Pagamentos", description: "Cartões e transações" },
    { icon: Bell, label: "Notificações", description: "Preferências de contato" },
    { icon: Shield, label: "Privacidade e Segurança", description: "Segurança da conta" },
    { icon: HelpCircle, label: "Central de Ajuda", description: "Dúvidas e suporte" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  if (!user) {
    return (
       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full flex flex-col items-center justify-center text-center pb-28 md:pb-12">
          <div className="w-20 h-20 bg-[#F8F7F4] rounded-full flex items-center justify-center mb-6 border border-black/5">
             <User className="w-8 h-8 text-[#1A1A1A]/40" />
          </div>
          <h2 className="text-2xl font-light tracking-tighter text-[#1A1A1A] mb-2">Seu Perfil</h2>
          <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-8">Faça login para ver suas informações</p>
          <Link to="/auth">
            <button className="px-8 py-4 bg-[#2A3B31] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A251E] transition">
              Entrar ou Cadastrar
            </button>
          </Link>
       </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full pb-28 md:pb-12">
      <h1 className="text-3xl font-light tracking-tighter text-[#1A1A1A] mb-8">Perfil</h1>

      <div className="bg-white rounded-[40px] border border-black/5 p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 bg-[#E58E58] rounded-full flex items-center justify-center font-black text-white text-2xl">
            {profile?.displayName ? profile.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile?.displayName || user.email?.split('@')[0]}</h2>
            <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-1">
               Hóspede desde {new Date(profile?.createdAt || Date.now()).getFullYear()}
            </p>
            <p className="text-sm font-medium mt-1">{user.email}</p>
          </div>
        </div>
        <button className="w-full sm:w-auto px-6 py-3 bg-[#F8F7F4] rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#2A3B31] hover:text-white transition-colors">
          Editar Perfil
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-black/5 p-6 sm:p-8 shadow-sm mb-8">
         <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-[#2A3B31]/5 rounded-3xl flex items-center justify-center text-[#2A3B31]">
               <Key className="w-8 h-8" />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="font-bold text-lg mb-1">Quer ganhar dinheiro com seu espaço?</h3>
               <p className="text-sm font-medium text-[#1A1A1A]/60">Anuncie no Aluga Fácil e gerencie suas propriedades com ferramentas exclusivas.</p>
            </div>
            {profile?.role === 'host' ? (
              <Link to="/host" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-8 py-4 bg-[#2A3B31] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A251E] transition">
                  Painel do Anfitrião
                </button>
              </Link>
            ) : (
              <Link to="/host-onboarding" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-8 py-4 bg-[#E58E58] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#D47E48] transition">
                  Quero Anunciar
                </button>
              </Link>
            )}
         </div>
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
          <button 
             onClick={handleLogout}
             className="flex items-center gap-3 text-red-500 hover:text-red-600 font-bold text-sm transition-colors px-4 w-full justify-center md:justify-start"
          >
             <LogOut className="w-5 h-5" />
             Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
