import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Home, Key, TrendingUp, Check } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";

export function HostOnboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user, profile, setProfile } = useAuth();
  const navigate = useNavigate();

  const handleBecomeHost = async () => {
    if (!user || !profile) return;
    setLoading(true);
    
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        role: "host"
      });
      setProfile({ ...profile, role: "host" });
      navigate("/host");
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Anuncie seu espaço",
      description: "Milhões de viajantes estão buscando lugares únicos como o seu. Junte-se à nossa comunidade de anfitriões.",
      icon: <Home className="w-12 h-12 text-[#E58E58]" />,
      features: ["Cadastro gratuito de imóveis", "Apareça nas buscas imediatamente", "Controle total sobre o calendário"]
    },
    {
      title: "Gestão inteligente",
      description: "Tenha todas as ferramentas necessárias para gerir suas locações em um único painel, simples e eficiente.",
      icon: <CheckCircle2 className="w-12 h-12 text-[#2A3B31]" />,
      features: ["Painel financeiro detalhado", "Gestão de manutenção centralizada", "Chat direto com inquilinos"]
    },
    {
      title: "Receba com segurança",
      description: "Nosso sistema protege você com verificações de identidade e pagamentos processados de forma segura.",
      icon: <Key className="w-12 h-12 text-[#34B7F1]" />,
      features: ["Análise de perfil de locatários", "Processamento de pagamentos seguro", "Suporte 24/7 disponível"]
    },
    {
      title: "Aumente sua renda",
      description: "Proprietários que anunciam conosco percebem um aumento de até 30% na ocupação de longo ou curto prazo.",
      icon: <TrendingUp className="w-12 h-12 text-purple-500" />,
      features: ["Aumento médio de ocupação", "Sugestões de precificação inteligente", "Flexibilidade (temporada ou longo prazo)"]
    }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-[40px] border border-black/5 overflow-hidden shadow-sm flex flex-col md:flex-row">
        
        {/* Left Side - Visual */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center bg-[#F8F7F4]/50 border-r border-black/5">
           <div className="w-32 h-32 rounded-full bg-white shadow-sm flex items-center justify-center mb-8 border border-black/5">
              {currentStep.icon}
           </div>
           
           <div className="flex gap-2">
             {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-300 ${i + 1 === step ? 'w-8 bg-[#2A3B31]' : 'w-2 bg-black/10'}`} 
                />
             ))}
           </div>
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <h2 className="text-2xl font-light tracking-tighter text-[#1A1A1A] mb-4">
            {currentStep.title}
          </h2>
          <p className="text-sm text-[#1A1A1A]/70 font-medium mb-8 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="space-y-4 mb-12 flex-1">
             {currentStep.features.map((feat, idx) => (
               <div key={idx} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#1A1A1A]/80">
                  <div className="w-5 h-5 rounded-full bg-[#E7F8CB] text-[#2A3B31] flex items-center justify-center shrink-0">
                     <Check className="w-3 h-3" />
                  </div>
                  {feat}
               </div>
             ))}
          </div>

          <div className="flex gap-4 mt-auto">
             {step > 1 && (
               <button 
                 onClick={() => setStep(step - 1)}
                 className="flex-1 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black/5 rounded-full transition-colors"
               >
                 Voltar
               </button>
             )}
             
             {step < steps.length ? (
               <button 
                 onClick={() => setStep(step + 1)}
                 className="flex-[2] bg-[#2A3B31] text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#1A251E] transition-colors flex items-center justify-center gap-2"
               >
                 Próximo <ArrowRight className="w-4 h-4" />
               </button>
             ) : (
               <button 
                 onClick={handleBecomeHost}
                 disabled={loading}
                 className="flex-[2] bg-[#E58E58] text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#D47E48] transition-colors disabled:opacity-50"
               >
                 {loading ? "Aguarde..." : "Quero Anunciar"}
               </button>
             )}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => navigate("/guest")} 
        className="mt-8 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
      >
        Agora não, voltar ao início
      </button>
    </div>
  );
}
