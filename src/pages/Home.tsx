import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, Map as MapIcon, List as ListIcon } from "lucide-react";
import type { Property } from "@/src/types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create custom pin icon
const createCustomIcon = (price: number) => {
  return L.divIcon({
    className: "custom-pin",
    html: `<div style="background-color: white; border-radius: 99px; padding: 6px 12px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); white-space: nowrap; transition: transform 0.2s;">
      R$ ${price}
    </div>`,
    iconSize: [60, 30],
    iconAnchor: [30, 15],
    popupAnchor: [0, -15],
  });
};

export function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [sortBy, setSortBy] = useState<string>("relevance");

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  }, []);

  const filteredProperties = properties.filter((p) => filterType === "all" || p.type === filterType);
  
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
    <div className="relative w-full flex-1 flex flex-col items-center">
      <div className={`w-full ${viewMode === 'map' ? 'flex-1 flex flex-col' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        
        {/* Header & Filters (Only show in List mode or overlaid on Map) */}
        {viewMode === 'list' && (
          <>
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
              <div className="ml-4 flex items-center md:hidden">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-2xl border border-black/5 outline-none cursor-pointer hover:bg-[#F8F7F4] pr-8 relative"
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

            <div className="hidden md:flex justify-end mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">Ordenar por:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white text-[#1A1A1A] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-2xl border border-black/5 outline-none cursor-pointer hover:bg-[#F8F7F4] pr-8 relative"
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
          </>
        )}

        {viewMode === 'map' && (
          <div className="absolute top-4 left-4 right-4 md:left-auto md:right-8 z-[400] overflow-x-auto pb-2 scrollbar-none flex space-x-2">
             <FilterButton active={filterType === "all"} onClick={() => setFilterType("all")}>Todos</FilterButton>
             <FilterButton active={filterType === "short-term"} onClick={() => setFilterType("short-term")}>Temporada</FilterButton>
             <FilterButton active={filterType === "long-term"} onClick={() => setFilterType("long-term")}>Longo Prazo</FilterButton>
             
             <div className="ml-2 pl-2 border-l border-black/10 flex items-center">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-2xl border border-black/5 outline-none cursor-pointer hover:bg-white pr-8 relative whitespace-nowrap"
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
        )}

        {loading ? (
          viewMode === 'list' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-[#1A1A1A]/5 aspect-[4/3] rounded-3xl mb-3"></div>
                  <div className="flex justify-between items-start">
                     <div className="w-2/3">
                        <div className="h-4 bg-[#1A1A1A]/5 rounded w-full mb-2"></div>
                        <div className="h-3 bg-[#1A1A1A]/5 rounded w-1/2"></div>
                     </div>
                     <div className="h-4 bg-[#1A1A1A]/5 rounded w-8"></div>
                  </div>
                  <div className="h-5 bg-[#1A1A1A]/5 rounded w-24 mt-3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full bg-[#F8F7F4] animate-pulse"></div>
          )
        ) : viewMode === 'list' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24 md:pb-12">
            {sortedProperties.map((property) => (
              <Link key={property.id} to={`/guest/property/${property.id}`} className="group cursor-pointer">
                <div className="relative aspect-[4/3] mb-3 overflow-hidden rounded-3xl border border-black/5 bg-slate-200">
                  <img 
                    src={property.imageUrl} 
                    alt={property.title} 
                    loading="lazy"
                    fetchPriority="high"
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
        ) : (
          <div className="flex-1 w-full z-0 relative pb-24 md:pb-0">
             <MapContainer center={[-23.5615, -46.6560]} zoom={6} className="w-full h-full absolute inset-0" zoomControl={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {sortedProperties.map(prop => (
                  <Marker key={prop.id} position={[prop.lat || -23.5615, prop.lng || -46.6560]} icon={createCustomIcon(prop.price)}>
                    <Popup className="rounded-3xl p-0 overflow-hidden custom-popup">
                       <Link to={`/guest/property/${prop.id}`} className="flex flex-col w-[200px] hover:opacity-90">
                          <img src={prop.imageUrl} alt={prop.title} className="w-full h-32 object-cover rounded-t-xl" />
                          <div className="p-3">
                            <h3 className="font-bold text-xs line-clamp-1 mb-1">{prop.title}</h3>
                            <p className="font-bold text-sm">R$ {prop.price} {prop.type === 'short-term' ? '/ noite' : '/ mês'}</p>
                          </div>
                       </Link>
                    </Popup>
                  </Marker>
                ))}
             </MapContainer>
          </div>
        )}
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setViewMode(prev => prev === 'list' ? 'map' : 'list')}
        className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-5 py-3 rounded-full font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:bg-[#2A3B31] transition-transform hover:scale-105 z-[1000]"
      >
        {viewMode === 'list' ? (
          <><MapIcon className="w-4 h-4" /> Mostrar mapa</>
        ) : (
           <><ListIcon className="w-4 h-4" /> Mostrar lista</>
        )}
      </button>
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
