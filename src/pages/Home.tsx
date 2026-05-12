import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import type { Property } from "@/src/types";

export function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  }, []);

  const filteredProperties = properties.filter((p) => filterType === "all" || p.type === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Mobile Search header */}
      <div className="md:hidden mb-6 relative">
          <input 
            type="text" 
            placeholder="Onde será sua próxima casa?"
            className="w-full bg-white shadow-sm rounded-full pl-12 pr-4 py-3.5 text-sm font-bold outline-none border border-black/5"
          />
          <div className="absolute left-4 top-3.5 text-[#1A1A1A]/60">
             <SearchIcon />
          </div>
      </div>

      <div className="flex justify-between items-center mb-6 overflow-x-auto pb-2 scrollbar-none">
        <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A] hidden md:block">
          Propriedades em Destaque
        </h1>
        <div className="flex space-x-2">
          <FilterButton active={filterType === "all"} onClick={() => setFilterType("all")}>Todos</FilterButton>
          <FilterButton active={filterType === "short-term"} onClick={() => setFilterType("short-term")}>Temporada</FilterButton>
          <FilterButton active={filterType === "long-term"} onClick={() => setFilterType("long-term")}>Longo Prazo</FilterButton>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="animate-pulse bg-gray-200 aspect-[4/3] rounded-2xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <Link key={property.id} to={`/guest/property/${property.id}`} className="group cursor-pointer">
              <div className="relative aspect-[4/3] mb-3 overflow-hidden rounded-3xl border border-black/5">
                <img 
                  src={property.imageUrl} 
                  alt={property.title} 
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <button className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition">
                  <HeartIcon />
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

function SearchIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
}

function HeartIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
}

function FilterButton({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${
        active ? "bg-[#2A3B31] text-white" : "bg-white text-[#1A1A1A] hover:bg-[#F8F7F4] border border-black/5"
      }`}
    >
      {children}
    </button>
  );
}
