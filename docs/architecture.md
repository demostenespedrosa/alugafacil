# AlugaFácil - Guia de Arquitetura

Este documento detalha a arquitetura do sistema para a plataforma de locação de propriedades "AlugaFácil".

## Visão Geral da Arquitetura
O sistema segue um modelo de arquitetura orientada a serviços (SOA) implantada na nuvem.

### Frontend
*   **Web/PWA:** React.js com Vite, TailwindCSS para estilização, React Router para navegação.
*   **Mobile (Planejado):** React Native ou Flutter para compartilhamento de lógica com a versão Web, entregando builds nativos (iOS/Android).

### Backend (API)
*   **Serviço Principal:** Node.js com Express (ou NestJS para maior escala).
*   **Padrão da API:** RESTful, com potencial para GraphQL caso a complexidade de agregações de consulta na busca exija maior flexibilidade.
*   **Autenticação:** JWT gerado após validação de credenciais (e-mail/senha) ou OAuth 2.0 (Google/Apple).

### Persistência de Dados
*   **Banco Relacional Primário:** PostgreSQL. Excelente para regras complexas, transações vitais (reservas, pagamentos) e forte consistência de dados (ACID).
*   **Cache e Filas:** Redis. Usado para cachear resultados da busca, sessões de usuário e gerenciar filas de workers em plano de fundo.
*   **Storage de Arquivos:** Amazon S3 ou Google Cloud Storage (GCS) compatível para imagens de anúncios, documentos de verificação e PDFs de contrato.

### Serviços de Tempo Real e Mensageria
*   **WebSockets / SSE:** Servidor Socket.io para chat in-app entre Inquilino e Proprietário.
*   **Notificações Push / Email:** Firebase Cloud Messaging (FCM) para push, SendGrid ou AWS SES para e-mails transacionais (templates automatizados).
*   **Mensageria Assíncrona:** RabbitMQ ou AWS SQS/SNS para processar webhooks de pagamentos da Stripe, disparar aprovação de contratos e e-mails post-reserva.

### Integrações de Terceiros
*   **Pagamento:** Stripe (Cartão, Pré-autorização global), MercadoPago (PIX, parcelamentos LATAM).
*   **Geolocalização:** Google Maps Platform (Geocoding API, Places API, Maps SDK).
*   **Assinatura Digital:** DocuSign API ou click-wrap in-app dependendo do nível de força legal necessária no país-alvo.

## Modelagem de Dados Base (PostgreSQL)
Abaixo estão os principais modelos do banco para a aplicação:
- **User:** ID, Name, Email, PasswordHash, Role (Host, Guest, Admin), VerificationStatus, DocumentUrl, Rating.
- **Property:** ID, HostID, Title, Description, Type (Long/Short), Location (Lat, Lng, Address Component), BasePrice, Status.
- **ListingContent:** ID, PropertyID, Rules, Amenities (JSONB), ImageUrls (Array), VideoUrl.
- **AvailabilityCalendar:** ID, PropertyID, Date, IsAvailable, DynamicPrice.
- **Reservation:** ID, PropertyID, GuestID, StartDate, EndDate, TotalPrice, Status (Pending, Confirmed, Cancelled, Completed).
- **Payment:** ID, ReservationID, StripeIntentID, Amount, Currency, Method (Pix/Card), Status.
- **Message:** ID, ReservationID (or RoomID), SenderID, ReceiverID, Content, Timestamp, ReadStatus.
- **MaintenanceRequest:** ID, PropertyID, ReporterID, Description, PhotoUrls (Array), Status, ResolveDate.
- **Review:** ID, AuthorID, TargetEntity (Property/Host/Guest), TargetID, Rating, Comment, Date.

## Segurança e Conformidade
*   SSL/TLS obrigatório no Load Balancer.
*   Bcrypt para hashes de senha. 
*   Filtragem PII (Personal Identifiable Information) para banco de logs.
*   Políticas de controle de acesso (RBAC) rigorosas na camada de API.
*   Proteção contra fraude via análise de device/IP (Sift ou reCAPTCHA) em pagamentos.
