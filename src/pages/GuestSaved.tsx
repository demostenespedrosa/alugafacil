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
    },
    {
      id: "p2",
      title: "Chalé Charmoso nas Montanhas",
      location: "Campos do Jordão, SP",
      price: 450,
      type: "short-term",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full pb-28 md:pb-12">
      <h1 className="text-3xl font-light tracking-tighter text-[#1A1A1A] mb-8">Favoritos</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedProperties.map((property) => (
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
    </div>
  );
}
