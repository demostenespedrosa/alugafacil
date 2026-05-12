# Cronograma MVP (8 Semanas)

## Fase 1: Core Foundation & Listings (Semanas 1-2)
**Objetivo:** Permitir que anfitriões criem os anúncios e usuários busquem e vejam detalhes.
*   **Semana 1:**
    *   Configuração de infra AWS/GCP (ambientes DEV e STG).
    *   Setup CI/CD no GitHub Actions.
    *   Modelagem e build de schemas de DB.
    *   Autenticação JWT, Registro e Login (Frontend/Backend).
*   **Semana 2:**
    *   CRUD de Anúncios (Cadastro pelo Anfitrião) com upload de imagens (S3).
    *   Geolocalização simplificada para armazenamento de coordenadas.
    *   Home Page App com Busca Avançada (Filtros de preço, acomodação).

## Fase 2: Booking Engine & Payments (Semanas 3-4)
**Objetivo:** Motor de reservas funcional e gateway de pagamentos.
*   **Semana 3:**
    *   Calendário de disponibilidade (backend e interface UI).
    *   Fluxo UX de Check-out e Pré-reserva.
    *   Bloqueio e prevenção de overbooking (Lock Preditivo via Redis/DB Transacional).
*   **Semana 4:**
    *   Integração com Stripe (Pré-autorização) e MercadoPago (PIX).
    *   Webhooks para atualizar status do pagamento no DB.
    *   Gerador de PDF in-app para o *Click-Wrap Contract* (Contrato Digital simplificado).

## Fase 3: Comunicação & Dashboard Anfitrião (Semanas 5-6)
**Objetivo:** Funcionalidades de suporte e gestão primária.
*   **Semana 5:**
    *   Chat in-app (WebSocket) vinculado à Reserva.
    *   Notificações e E-mails automatizados (Confirmação, lembrete Check-in).
*   **Semana 6:**
    *   Dashboard do Proprietário Web/Mobile (Vue de reservas passadas/futuras).
    *   Relatório transacional báscio (Extrato e recebíveis).
    *   Painel Admin Interno (Retool ou painel customizado para moderar/aprovar anúncios).

## Fase 4: Suporte, Qualidade e Go-Live (Semanas 7-8)
**Objetivo:** Refinamento, features complementares críticas de longo prazo e Deploy final.
*   **Semana 7:**
    *   Ordens de Manutenção (Abertura de ticket no app, anexo de fotos).
    *   Sistema de Avaliação e Review Bi-Direcional (Hóspede <-> Anfitrião).
    *   Configuração flexível de Políticas de Cancelamento no anúncio.
*   **Semana 8:**
    *   Testes de Carga, Pentesting (Básico), Bug Fixing.
    *   Criação de métricas de negócio em dashboard admin (Conversão, NPS, Receita).
    *   Submissão do App iOS (App Store) e Android (Google Play).
    *   Deploy para PRD.

## Plano Pós-Lançamento e MVP Iterations
- Integração de verificação de Identidade Completa (Jumio ou Onfido).
- Integração de Iot para Keyless Entry/Smart Locks.
- Expansão de ferramentas analíticas na UI do proprietário.
