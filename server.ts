import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // ==========================================
  // API ROUTES (MOCKED FOR MVP)
  // ==========================================
  
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Backend is running" });
  });

  // Mock Properties Database
  const properties = [
    {
      id: "p1",
      title: "Cobertura de Luxo com Vista para o Mar",
      location: "Copacabana, Rio de Janeiro",
      price: 850,
      currency: "BRL",
      rating: 4.9,
      reviews: 124,
      bedrooms: 3,
      bathrooms: 4,
      parkingSpots: 2,
      type: "short-term",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687931-cecebd802404?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c15cecb1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687931-cecebd802404?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4e5fd?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80"
      ],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      amenities: ["WiFi", "Piscina", "Cozinha", "Ar-condicionado", "Academia", "Churrasqueira", "Varanda Gourmet"],
      lat: -22.9711,
      lng: -43.1822,
      area: 250,
      createdAt: "2023-10-01T10:00:00Z",
      host: { name: "Carlos Andrade", phone: "5511999999999", initials: "CA", memberSince: "Janeiro 2020" }
    },
    {
      id: "p2",
      title: "Chalé Charmoso nas Montanhas",
      location: "Campos do Jordão, SP",
      price: 450,
      currency: "BRL",
      rating: 4.7,
      reviews: 89,
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 1,
      type: "short-term",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542314831-c6a4d14eccda?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Lareira", "WiFi", "Estacionamento"],
      lat: -22.7394,
      lng: -45.5914,
      area: 120,
      createdAt: "2023-10-15T14:30:00Z",
      host: { name: "Juliana Silva", phone: "5511888888888", initials: "JS", memberSince: "Março 2021" }
    },
    {
      id: "p3",
      title: "Apartamento Moderno no Centro",
      location: "Paulista, São Paulo",
      price: 320,
      currency: "BRL",
      rating: 4.5,
      reviews: 56,
      bedrooms: 1,
      bathrooms: 1,
      parkingSpots: 0,
      type: "long-term",
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1c24240f57?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1c24240f57?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: ["Academia", "WiFi", "Coworking", "Metro próximo"],
      lat: -23.5615,
      lng: -46.6560,
      area: 45,
      createdAt: "2023-11-20T08:15:00Z",
      host: { name: "Roberto Alves", phone: "5511777777777", initials: "RA", memberSince: "Outubro 2022" }
    }
  ];

  app.get("/api/properties", (req, res) => {
    res.json(properties);
  });

  app.get("/api/properties/:id", (req, res) => {
    const prop = properties.find(p => p.id === req.params.id);
    if (prop) res.json(prop);
    else res.status(404).json({ error: "Not found" });
  });

  app.post("/api/bookings", (req, res) => {
    // Mock booking creation
    res.status(201).json({
      success: true,
      bookingId: `bk_${Math.random().toString(36).substr(2, 9)}`,
      status: "pending_payment",
      message: "Reserva pré-autorizada com sucesso."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
