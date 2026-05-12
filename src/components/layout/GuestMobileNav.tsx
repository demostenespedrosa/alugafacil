import { Search, Heart, User, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export function GuestMobileNav() {
  const location = useLocation();

  const links = [
    { href: "/guest", label: "Explorar", icon: Search },
    { href: "/guest/saved", label: "Salvos", icon: Heart },
    { href: "/guest/messages", label: "Chat", icon: MessageCircle },
    { href: "/guest/profile", label: "Perfil", icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm h-16 bg-[#2A3B31] rounded-full shadow-2xl flex items-center justify-around px-4 border border-white/10 md:hidden z-50">
      {links.map((link) => {
        const isActive = location.pathname === link.href || (location.pathname.startsWith(link.href) && link.href !== "/guest");
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "flex flex-col items-center justify-center w-10 h-10 rounded-full transition-colors",
              isActive ? "bg-white/20 text-white" : "text-white/50 hover:text-white"
            )}
          >
            <Icon className="w-5 h-5" />
          </Link>
        );
      })}
    </div>
  );
}
