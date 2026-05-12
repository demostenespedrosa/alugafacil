export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  bedrooms: number;
  type: "short-term" | "long-term";
  imageUrl: string;
  images?: string[];
  videoUrl?: string;
  amenities: string[];
  lat: number;
  lng: number;
  area?: number;
  bathrooms?: number;
  parkingSpots?: number;
  createdAt?: string;
  host?: {
    name: string;
    phone: string;
    initials: string;
    memberSince: string;
  };
}

export interface Booking {
  id: string;
  propertyId: string;
  status: "pending_payment" | "confirmed" | "cancelled" | "completed";
  checkIn: string;
  checkOut: string;
  totalPrice: number;
}
