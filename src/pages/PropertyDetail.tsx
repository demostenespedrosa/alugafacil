import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, MapPin, ChevronLeft, Calendar, User, Check, Share, Heart, MessageCircle, Phone, Ruler, Bed, Bath, Car, Clock, ShieldAlert, ExternalLink } from "lucide-react";
import type { Property } from "@/src/types";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create custom pin icon
const createCustomIcon = (price: number) => {
  return L.divIcon({
    className: "custom-pin",
    html: `<div style="background-color: white; border-radius: 99px; padding: 6px 12px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); white-space: nowrap;">
      R$ ${price}
    </div>`,
    iconSize: [60, 30],
    iconAnchor: [30, 15],
  });
};

export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success">("idle");
  const [showFullGallery, setShowFullGallery] = useState(false);

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        return fetch("/api/properties");
      })
      .then((res) => res.json())
      .then((data) => {
        setSimilarProperties(data.filter((p: Property) => p.id !== id).slice(0, 4));
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

      {/* Full Gallery Modal */}
      {showFullGallery && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white/80 backdrop-blur-md p-4 flex justify-between items-center z-10 border-b border-black/5">
            <button onClick={() => setShowFullGallery(false)} className="p-3 bg-[#F8F7F4] rounded-full hover:bg-black/5 transition">
               <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="font-bold text-sm tracking-widest uppercase">Galeria de Fotos</div>
            <div className="w-11"></div>
          </div>
          <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-4">
             {property.videoUrl && (
               <div className="w-full aspect-video rounded-3xl overflow-hidden bg-black">
                 <video src={property.videoUrl} controls className="w-full h-full object-contain" />
               </div>
             )}
             {property.images?.map((img, idx) => (
               <div key={idx} className="w-full rounded-3xl overflow-hidden">
                 <img src={img} alt={`Foto ${idx+1}`} className="w-full h-auto object-cover" />
               </div>
             ))}
          </div>
        </div>
      )}

      {/* Gallery Thumbnail */}
      <div className="w-full relative aspect-[4/3] md:aspect-[21/9] md:rounded-[40px] overflow-hidden border border-black/5 flex bg-slate-200 group cursor-pointer" onClick={() => setShowFullGallery(true)}>
        <img src={property.imageUrl} alt={property.title} fetchPriority="high" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
          Ver {property.images?.length || 1} fotos
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-0 mt-6 md:mt-0">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-16">
          
          <div className="flex-1">
            <h1 className="text-3xl font-light tracking-tighter text-[#1A1A1A] leading-tight mb-4 md:hidden">{property.title}</h1>
            
            <div className="flex items-center text-sm font-bold text-[#1A1A1A]/80 mb-6 flex-wrap gap-y-2 uppercase tracking-widest">
              <span className="flex items-center"><Star className="w-4 h-4 text-[#E58E58] mr-2 fill-current" /> {property.rating} <span className="opacity-40 ml-2">({property.reviews})</span></span>
              <span className="mx-4 text-[#1A1A1A]/20">•</span>
              <span className="flex items-center text-[#1A1A1A] opacity-60"><MapPin className="w-4 h-4 mr-2" /> {property.location}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
               <div className="flex flex-col bg-[#F8F7F4] p-4 rounded-3xl border border-black/5 flex-1 min-w-[100px] items-center text-center">
                 <Ruler className="w-6 h-6 mb-2 opacity-60" />
                 <span className="text-lg font-black">{property.area} <span className="text-xs">m²</span></span>
                 <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">Área</span>
               </div>
               <div className="flex flex-col bg-[#F8F7F4] p-4 rounded-3xl border border-black/5 flex-1 min-w-[100px] items-center text-center">
                 <Bed className="w-6 h-6 mb-2 opacity-60" />
                 <span className="text-lg font-black">{property.bedrooms}</span>
                 <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">Quartos</span>
               </div>
               <div className="flex flex-col bg-[#F8F7F4] p-4 rounded-3xl border border-black/5 flex-1 min-w-[100px] items-center text-center">
                 <Bath className="w-6 h-6 mb-2 opacity-60" />
                 <span className="text-lg font-black">{property.bathrooms || 1}</span>
                 <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">Banhos</span>
               </div>
               <div className="flex flex-col bg-[#F8F7F4] p-4 rounded-3xl border border-black/5 flex-1 min-w-[100px] items-center text-center">
                 <Car className="w-6 h-6 mb-2 opacity-60" />
                 <span className="text-lg font-black">{property.parkingSpots || 0}</span>
                 <span className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">Vagas</span>
               </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 mb-8">
               <Clock className="w-4 h-4" />
               Publicado em {new Date(property.createdAt || "").toLocaleDateString('pt-BR')}  às {new Date(property.createdAt || "").toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
            </div>

            <div className="py-8 border-y border-black/5">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-[#2A3B31] rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {property.host?.initials || 'CA'}
                   </div>
                   <div>
                      <h2 className="text-xl font-bold text-[#1A1A1A]">Hospedado por {property.host?.name || "Carlos"}</h2>
                      <p className="text-[#1A1A1A]/50 text-[10px] font-bold uppercase tracking-widest mt-1">Membro desde {property.host?.memberSince || "Janeiro 2020"}</p>
                   </div>
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
            
            <div className="py-8 border-b border-black/5">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Localização</h3>
              <div className="w-full h-64 bg-slate-200 rounded-[32px] border border-black/5 overflow-hidden mb-4 relative z-0">
                 <MapContainer center={[property.lat || -23.5615, property.lng || -46.6560]} zoom={15} className="w-full h-full" zoomControl={false}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    <Marker position={[property.lat || -23.5615, property.lng || -46.6560]} icon={createCustomIcon(property.price)} />
                 </MapContainer>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${property.lat},${property.lng}`} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] hover:text-[#E58E58] transition-colors bg-[#F8F7F4] px-4 py-2 rounded-full border border-black/5"
              >
                 <ExternalLink className="w-3 h-3" /> Ver no Google Maps
              </a>
            </div>

            {/* Aviso de Segurança */}
            <div className="py-8 border-b border-black/5">
               <div className="bg-[#FAF9F6] border border-[#E58E58]/20 rounded-3xl p-6 flex items-start gap-4">
                  <ShieldAlert className="w-6 h-6 text-[#E58E58] shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm text-[#E58E58] uppercase tracking-widest mb-2">Dica de Segurança</h4>
                    <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-medium mb-4">Nunca pague por fora da plataforma. Qualquer tentativa de cobrança extra pelo proprietário via PIX, depósito ou em dinheiro vivo viola nossos termos de serviço.</p>
                    <button className="text-[10px] uppercase font-bold tracking-widest text-[#1A1A1A] hover:text-[#E58E58] transition-colors underline">Denunciar este anúncio</button>
                  </div>
               </div>
            </div>

            {/* Mobile Contact Buttons */}
            <div className="py-8 border-b border-black/5 lg:hidden flex flex-col gap-3">
                 <button className="w-full bg-[#F8F7F4] text-[#1A1A1A] font-bold py-4 rounded-full flex items-center justify-center gap-2 transition text-xs uppercase tracking-widest">
                    <MessageCircle className="w-4 h-4" />
                    Contatar pelo Chat
                 </button>
                 <a href={`https://wa.me/${property.host?.phone || "5511999999999"}?text=Olá, tenho interesse no imóvel ${property.title}`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] font-bold py-4 rounded-full flex items-center justify-center gap-2 transition text-xs uppercase tracking-widest">
                    <Phone className="w-4 h-4" />
                    WhatsApp do Anfitrião
                 </a>
            </div>

            {/* Imóveis Similares (Horizontal Scroll) */}
            <div className="py-8">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Imóveis Similares</h3>
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-none snap-x">
                 {similarProperties.map(sim => (
                   <Link key={sim.id} to={`/guest/property/${sim.id}`} className="block w-[280px] shrink-0 snap-start group relative">
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-3 border border-black/5">
                         <img src={sim.imageUrl} alt={sim.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h4 className="font-bold text-sm line-clamp-1 mb-1">{sim.title}</h4>
                      <div className="text-xs font-bold text-[#E58E58] uppercase tracking-widest">R$ {sim.price} <span className="opacity-40">{sim.type === 'short-term' ? '/ noite' : '/ mês'}</span></div>
                   </Link>
                 ))}
                 {similarProperties.length === 0 && (
                   <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Nenhum imóvel similar encontrado.</p>
                 )}
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

              <div className="mt-8 pt-8 border-t border-black/5 flex flex-col gap-3">
                 <button className="w-full bg-[#F8F7F4] text-[#1A1A1A] font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-black/5 transition text-xs uppercase tracking-widest">
                    <MessageCircle className="w-4 h-4" />
                    Contatar pelo Chat
                 </button>
                 <a href={`https://wa.me/${property.host?.phone || "5511999999999"}?text=Olá, tenho interesse no imóvel ${property.title}`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition text-xs uppercase tracking-widest">
                    <Phone className="w-4 h-4" />
                    WhatsApp do Anfitrião
                 </a>
              </div>
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
