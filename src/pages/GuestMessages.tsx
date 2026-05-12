import { useState, useRef, useEffect } from "react";
import { Search, ArrowLeft, Send, Phone, Video, MoreVertical, Check, CheckCheck, Smile, Paperclip, Mic } from "lucide-react";

export function GuestMessages() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const CHATS = [
    {
      id: 1,
      hostName: "Carlos Andrade",
      initials: "CA",
      property: "Cobertura de Luxo",
      lastMessage: "Olá! Sim, o check-in antecipado é possível dependendo da...",
      time: "10:30",
      unread: 2,
      online: true,
      messages: [
        { id: 101, text: "Olá Carlos! Gostaria de saber se é possível fazer o check-in um pouco mais cedo, por volta das 12h.", sender: "me", time: "10:15", status: "read" },
        { id: 102, text: "Olá! Sim, o check-in antecipado é possível dependendo da saída do hóspede anterior. Me confirme amanhã cedo.", sender: "them", time: "10:30" },
      ]
    },
    {
      id: 2,
      hostName: "Juliana Silva",
      initials: "JS",
      property: "Chalé Charmoso",
      lastMessage: "Obrigada pela reserva! Te enviei as instruções de...",
      time: "Ontem",
      unread: 0,
      online: false,
      messages: [
        { id: 201, text: "Obrigada pela reserva! Te enviei as instruções de check-in por email.", sender: "them", time: "18:45" },
        { id: 202, text: "Perfeito, acabei de receber. Muito obrigada!", sender: "me", time: "18:50", status: "read" }
      ]
    },
  ];

  const selectedChat = CHATS.find(c => c.id === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedChatId) {
      scrollToBottom();
    }
  }, [selectedChatId]);

  return (
    <div className="w-full flex-1 flex flex-col md:p-6 lg:p-8 md:pb-12 max-w-7xl mx-auto h-[calc(100vh-80px)] md:h-[calc(100vh-80px)]">
      {/* WhatsApp style container */}
      <div className="w-full h-full bg-white md:rounded-[32px] md:border border-black/5 flex overflow-hidden shadow-sm">
        
        {/* Sidebar / Chat List */}
        <div className={`w-full md:w-[350px] lg:w-[400px] flex-col border-r border-black/5 bg-white ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 bg-[#F8F7F4] flex items-center justify-between border-b border-black/5">
             <div className="font-bold text-[#1A1A1A] text-lg">Mensagens</div>
             <div className="flex gap-4 text-[#1A1A1A]/60">
                <MoreVertical className="w-5 h-5 cursor-pointer hover:text-[#1A1A1A]" />
             </div>
          </div>
          
          <div className="p-3 border-b border-black/5">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar conversa..."
                className="w-full bg-[#F8F7F4] rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold outline-none border border-black/5"
              />
              <Search className="w-4 h-4 absolute left-4 top-2.5 opacity-40 text-[#1A1A1A]" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-none pb-20 md:pb-0">
            {CHATS.map((chat) => (
              <div 
                key={chat.id} 
                className={`flex gap-4 cursor-pointer p-4 hover:bg-[#F8F7F4] transition-colors border-b border-black/5 ${selectedChatId === chat.id ? 'bg-[#F8F7F4]' : ''}`}
                onClick={() => setSelectedChatId(chat.id)}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-[#2A3B31] rounded-full flex items-center justify-center font-bold text-white shrink-0">
                    {chat.initials}
                  </div>
                  {chat.online && (
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-bold truncate pr-2">{chat.hostName}</span>
                    <span className={`text-[10px] font-bold shrink-0 ${chat.unread > 0 ? 'text-[#25D366]' : 'opacity-40'}`}>{chat.time}</span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1 truncate">{chat.property}</p>
                  <div className="flex items-center gap-1">
                    {chat.unread === 0 && <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1] shrink-0" />}
                    <p className={`text-xs truncate ${chat.unread > 0 ? 'font-bold opacity-100 text-[#1A1A1A]' : 'opacity-60 font-medium'}`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <div className="ml-auto w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Area / Chat Screen */}
        <div className={`flex-1 flex-col bg-[#F0F2F5] relative ${selectedChatId ? 'flex' : 'hidden md:flex'}`}>
          {selectedChat ? (
             <>
                {/* Chat Header */}
                <div className="h-[68px] bg-white border-b border-black/5 flex items-center px-4 justify-between z-10 shrink-0">
                  <div className="flex items-center gap-3">
                    <button className="md:hidden p-1 mr-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A]" onClick={() => setSelectedChatId(null)}>
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="w-10 h-10 bg-[#2A3B31] rounded-full flex items-center justify-center font-bold text-white shrink-0">
                      {selectedChat.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{selectedChat.hostName}</span>
                      <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest">{selectedChat.online ? 'Online' : 'Visto por último recentemente'}</span>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[#1A1A1A]/60">
                    <Video className="w-5 h-5 cursor-pointer hover:text-[#1A1A1A] hidden sm:block" />
                    <Phone className="w-5 h-5 cursor-pointer hover:text-[#1A1A1A]" />
                    <MoreVertical className="w-5 h-5 cursor-pointer hover:text-[#1A1A1A]" />
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                   className="flex-1 overflow-y-auto p-4 space-y-3 pb-[170px] md:pb-20" 
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h10v10H10V10zM30 30h10v10H30V30z' fill='%23e5e5f7' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                     backgroundSize: '30px 30px'
                   }}
                >
                   <div className="flex justify-center mb-6">
                      <div className="bg-white/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                         Hojé
                      </div>
                   </div>

                   {/* Property context bubble */}
                   <div className="flex justify-center mb-6">
                      <div className="bg-[#FFF3C2] text-[#1A1A1A] text-[10px] font-bold p-3 rounded-2xl shadow-sm border border-[#E58E58]/20 flex flex-col items-center max-w-[280px] text-center gap-1">
                         <span className="uppercase tracking-widest opacity-60">Reserva confirmada</span>
                         <span className="text-sm">{selectedChat.property}</span>
                         <span className="opacity-80">Check-in: 15 Out • Check-out: 20 Out</span>
                      </div>
                   </div>

                   {selectedChat.messages.map((msg) => {
                     const isMe = msg.sender === 'me';
                     return (
                       <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                         <div 
                           className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-3 shadow-sm relative group ${
                             isMe 
                               ? 'bg-[#E7F8CB] rounded-tr-sm text-[#1A1A1A]' 
                               : 'bg-white rounded-tl-sm text-[#1A1A1A]'
                           }`}
                         >
                           <p className="text-sm font-medium pr-12 pb-1.5">{msg.text}</p>
                           <div className="absolute bottom-1.5 right-2 flex items-center gap-1 text-[10px] opacity-60 font-bold">
                             {msg.time}
                             {isMe && (
                               msg.status === 'read' ? <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" /> : <Check className="w-3.5 h-3.5" />
                             )}
                           </div>
                         </div>
                       </div>
                     );
                   })}
                   <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="absolute bottom-[96px] md:bottom-0 left-0 right-0 bg-[#F0F2F5] p-3 flex gap-2 items-center z-10">
                   <button className="p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition">
                      <Smile className="w-6 h-6" />
                   </button>
                   <button className="p-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition hidden sm:block">
                      <Paperclip className="w-5 h-5" />
                   </button>
                   <input 
                     type="text" 
                     placeholder="Digite uma mensagem"
                     className="flex-1 bg-white rounded-xl px-4 py-3 text-sm outline-none shadow-sm font-medium border-none"
                     value={messageText}
                     onChange={(e) => setMessageText(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' && messageText.trim()) {
                         setMessageText("");
                         setTimeout(scrollToBottom, 100);
                       }
                     }}
                   />
                   {messageText.trim() ? (
                     <button 
                       className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white shrink-0 hover:bg-[#20bd5a] transition shadow-sm ml-1"
                       onClick={() => {
                          setMessageText("");
                          setTimeout(scrollToBottom, 100);
                       }}
                     >
                        <Send className="w-4 h-4 ml-1" />
                     </button>
                   ) : (
                     <button className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center text-[#1A1A1A]/60 shrink-0 hover:bg-black/5 transition ml-1">
                        <Mic className="w-6 h-6" />
                     </button>
                   )}
                </div>
             </>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#F8F7F4]">
                <div className="w-64 h-64 opacity-50 mb-8 pointer-events-none">
                  {/* Simplistic stylized chat illustration empty state */}
                  <div className="w-full h-full relative">
                     <div className="absolute top-1/4 left-1/4 w-1/2 h-1/4 bg-white rounded-2xl rounded-tl-none shadow-sm -rotate-6"></div>
                     <div className="absolute top-1/2 right-1/4 w-1/2 h-1/4 bg-[#E7F8CB] rounded-2xl rounded-tr-none shadow-sm rotate-6"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-light tracking-tight text-[#1A1A1A] mb-2">Suas mensagens</h3>
                <p className="text-sm font-bold opacity-40 uppercase tracking-widest">
                  Envie e receba mensagens dos anfitriões.
                </p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
