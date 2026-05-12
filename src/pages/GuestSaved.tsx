import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Star } from "lucide-react";

export function GuestSaved() {
  const savedProperties = [
    {
      id: "p1",
      title: "Cobertura de Luxo com Vista para o Mar",
      location: "Copacabana, Rio de Janeiro",
      price: 850,
      type: "short-term",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      area: 250,
      createdAt: "2023-10-01T10:00:00Z"
    },
    {
      id: "p2",
      title: "Chalé Charmoso nas Montanhas",
      location: "Campos do Jordão, SP",
      price: 450,
      type: "short-term",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      area: 120,
      createdAt: "2023-10-15T14:30:00Z"
    },
    {
      id: "p3",
      title: "Loft Moderno no Centro",
      location: "Bela Vista, São Paulo",
      price: 3200,
      type: "long-term",
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1c24240f57?auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      area: 45,
      createdAt: "2023-11-20T08:15:00Z"
    }
  ];

  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  const filteredProperties = savedProperties.filter((p) => filterType === "all" || p.type === filterType);
  
  let sortedProperties = [...filteredProperties];
  switch (sortBy) {
    case 'recent':
      sortedProperties.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      break;
    case 'price-asc':
      sortedProperties.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sortedProperties.sort((a, b) => b.price - a.price);
      break;
    case 'area-desc':
      sortedProperties.sort((a, b) => (b.area || 0) - (a.area || 0));
      break;
    case 'relevance':
    default:
      sortedProperties.sort((a, b) => b.rating - a.rating);
      break;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full pb-28 md:pb-12 border-box">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-light tracking-tighter text-[#1A1A1A]">Favoritos</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button 
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap border border-black/5 ${
                filterType === "all" ? "bg-[#2A3B31] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#F8F7F4]"
              }`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilterType("short-term")}
              className={`px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap border border-black/5 ${
                filterType === "short-term" ? "bg-[#2A3B31] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#F8F7F4]"
              }`}
            >
              Temporada
            </button>
            <button 
              onClick={() => setFilterType("long-term")}
              className={`px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap border border-black/5 ${
                filterType === "long-term" ? "bg-[#2A3B31] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#F8F7F4]"
              }`}
            >
              Longo Prazo
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 hidden md:block">Ordenar por:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-auto appearance-none bg-white text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-2xl border border-black/5 outline-none cursor-pointer hover:bg-[#F8F7F4] pr-8 relative"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
            >
              <option value="relevance">Mais Relevantes</option>
              <option value="recent">Mais Recentes</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="area-desc">Maior Área</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart className="w-12 h-12 text-black/10 mb-4" />
          <h3 className="text-lg font-bold text-[#1A1A1A]">Nenhum favorito encontrado</h3>
          <p className="text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-widest mt-2 max-w-sm">
            Você ainda não salvou nenhuma propriedade deste tipo.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProperties.map((property) => (
            <Link key={property.id} to={`/guest/property/${property.id}`} className="group cursor-pointer">
                <div className="relative aspect-[4/3] mb-3 overflow-hidden rounded-3xl border border-black/5 bg-slate-200">
                <img 
                  src={property.imageUrl} 
                  alt={property.title} 
                  loading="lazy"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute top-3 right-3 p-3 bg-white/20 backdrop-blur-md rounded-full text-[#E58E58] hover:bg-white/40 transition">
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-[#1A1A1A] line-clamp-1">{property.title}</h3>
                  <p className="text-[#1A1A1A]/50 text-xs flex items-center mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {property.location}
                  </p>
                </div>
                <div className="flex items-center text-sm font-bold">
                  <Star className="w-4 h-4 fill-current text-[#E58E58] mr-1" />
                  <span>{property.rating}</span>
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-bold text-lg text-[#1A1A1A]">R$ {property.price}</span>
                <span className="text-[10px] uppercase font-bold opacity-40"> {property.type === 'short-term' ? '/ noite' : '/ mês'}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
