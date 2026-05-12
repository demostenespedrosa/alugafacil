import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, ChevronLeft, Calendar, User, Check, Menu, Share, Heart } from "lucide-react";
import type { Property } from "@/src/types";

export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/guest");
      });
  }, [id, navigate]);

  const handleBooking = async () => {
    setBookingStatus("loading");
    await new Promise(r => setTimeout(r, 1500)); // Simulate API call
    
    fetch("/api/bookings", { method: "POST" })
      .then(res => res.json())
      .then(() => {
        setBookingStatus("success");
      });
  };

  if (loading || !property) {
    return <div className="p-8 text-center text-xs font-bold uppercase tracking-widest opacity-60">Carregando...</div>;
  }

  return (
    <div className="pb-24 md:pb-12 w-full max-w-7xl mx-auto md:px-8 mt-0 md:mt-8 flex flex-col gap-8">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 w-full z-10 flex justify-between items-center p-4">
         <button onClick={() => navigate(-1)} className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-sm text-[#1A1A1A] border border-black/5">
           <ChevronLeft className="w-5 h-5" />
         </button>
         <div className="flex gap-2">
           <button className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-sm text-[#1A1A1A] border border-black/5">
              <Share className="w-5 h-5"/>
           </button>
           <button className="bg-white/80 backdrop-blur-md p-3 rounded-full shadow-sm text-[#1A1A1A] border border-black/5">
              <Heart className="w-5 h-5"/>
           </button>
         </div>
      </div>

      <div className="hidden md:flex justify-between items-end mb-2">
        <h1 className="text-4xl lg:text-5xl font-light tracking-tighter text-[#1A1A1A] leading-none">
          {property.title}
        </h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#E58E58] transition-colors">
            <Share className="w-4 h-4"/> Compartilhar
          </button>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#E58E58] transition-colors">
            <Heart className="w-4 h-4"/> Salvar
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="w-full relative aspect-[4/3] md:aspect-[21/9] md:rounded-[40px] overflow-hidden border border-black/5 flex bg-white">
        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
      </div>

      <div className="px-4 sm:px-6 md:px-0 mt-6 md:mt-0">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-16">
          
          <div className="flex-1">
            <h1 className="text-3xl font-light tracking-tighter text-[#1A1A1A] leading-tight mb-4 md:hidden">{property.title}</h1>
            
            <div className="flex items-center text-sm font-bold text-[#1A1A1A]/80 mb-8 flex-wrap gap-y-2 uppercase tracking-widest">
              <span className="flex items-center"><Star className="w-4 h-4 text-[#E58E58] mr-2 fill-current" /> {property.rating} <span className="opacity-40 ml-2">({property.reviews})</span></span>
              <span className="mx-4 text-[#1A1A1A]/20">•</span>
              <span className="flex items-center text-[#1A1A1A] opacity-60"><MapPin className="w-4 h-4 mr-2" /> {property.location}</span>
            </div>

            <div className="py-8 border-y border-black/5">
               <div className="flex items-center justify-between">
                 <div>
                    <h2 className="text-xl font-bold text-[#1A1A1A]">Hospedado por Carlos</h2>
                    <p className="text-[#1A1A1A]/50 text-xs font-bold uppercase tracking-widest mt-2">{property.bedrooms} quartos · 1 banheiro</p>
                 </div>
                 <div className="w-16 h-16 bg-[#2A3B31] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    CA
                 </div>
               </div>
            </div>

            <div className="py-8 border-b border-black/5">
               <p className="text-[#1A1A1A]/70 leading-relaxed font-medium">
                 Desfrute de uma estadia inesquecível nesta propriedade exclusiva. 
                 Comodidades modernas, localização privilegiada e todo o conforto que você
                 e sua família merecem para momentos de descanso e lazer.
                 Perfeito para quem busca proximidade com os melhores pontos turísticos mantendo a privacidade.
               </p>
            </div>

            <div className="py-8 border-b border-black/5">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Comodidades</h3>
              <div className="grid grid-cols-2 gap-y-6">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center font-bold text-sm text-[#1A1A1A]">
                    <Check className="w-5 h-5 mr-3 text-[#E58E58]" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="py-8">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Localização</h3>
              <div className="w-full h-64 bg-slate-200 rounded-[32px] border border-black/5 flex items-center justify-center">
                 <span className="text-xs font-bold uppercase tracking-widest opacity-40">Mapa da Região</span>
              </div>
            </div>
          </div>

          {/* Desktop Booking Card */}
          <div className="hidden lg:block w-[420px]">
            <div className="sticky top-28 bg-white border border-black/5 rounded-[40px] p-8 shadow-2xl shadow-black/5">
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-4xl font-light tracking-tighter">R$ {property.price}</span>
                <span className="text-[10px] uppercase font-bold opacity-40"> {property.type === 'short-term' ? '/ noite' : '/ mês'}</span>
              </div>
              <div className="grid grid-cols-2 border border-black/10 rounded-3xl mb-6 overflow-hidden bg-[#F8F7F4]">
                <div className="p-4 border-r border-black/10 cursor-pointer hover:bg-white transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-[#E58E58]">Check-in</div>
                  <div className="text-sm font-bold text-[#1A1A1A]">Adicionar data</div>
                </div>
                <div className="p-4 cursor-pointer hover:bg-white transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-[#E58E58]">Check-out</div>
                  <div className="text-sm font-bold text-[#1A1A1A]">Adicionar data</div>
                </div>
              </div>
              
              <div className="space-y-4 mb-6 px-2">
                <div className="flex justify-between text-sm font-bold opacity-60">
                  <span>R$ {property.price} x 5 noites</span>
                  <span>R$ {property.price * 5}</span>
                </div>
                <div className="flex justify-between text-sm font-bold opacity-60">
                  <span>Taxa de limpeza</span>
                  <span>R$ 150</span>
                </div>
                <div className="flex justify-between text-sm font-bold opacity-60">
                  <span>Taxa de serviço</span>
                  <span>R$ 210</span>
                </div>
                <div className="border-t border-black/10 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>R$ {property.price * 5 + 150 + 210}</span>
                </div>
              </div>

              {bookingStatus === "success" ? (
                <div className="w-full bg-[#2A3B31] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs text-center mt-4">
                  Reserva Confirmada!
                </div>
              ) : (
                <button 
                  onClick={handleBooking}
                  disabled={bookingStatus === "loading"}
                  className="w-full bg-[#2A3B31] text-white font-bold py-5 rounded-3xl hover:bg-[#1A1A1A] transition disabled:opacity-70 mt-4 text-xs uppercase tracking-widest"
                >
                  {bookingStatus === "loading" ? "Processando..." : "Reservar Agora"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-black/5 p-4 lg:hidden z-20 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tighter">R$ {property.price}</span>
            <span className="text-[10px] opacity-40 font-bold uppercase underline">Total R$ {(property.price * 5) + 360}</span>
          </div>
          {bookingStatus === "success" ? (
             <div className="bg-[#2A3B31] text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Confirmado!</div>
          ) : (
            <button 
              onClick={handleBooking}
              disabled={bookingStatus === "loading"}
              className="bg-[#2A3B31] text-white px-8 py-4 rounded-3xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#1A1A1A] transition disabled:opacity-70"
            >
              {bookingStatus === "loading" ? "..." : "Reservar"}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
