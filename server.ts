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
      type: "short-term",
      imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      amenities: ["WiFi", "Piscina", "Cozinha", "Ar-condicionado"]
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
      type: "short-term",
      imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      amenities: ["Lareira", "WiFi", "Estacionamento"]
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
      type: "long-term",
      imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1c24240f57?auto=format&fit=crop&w=800&q=80",
      amenities: ["Academia", "WiFi", "Coworking", "Metro próximo"]
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
