# Fluxos de Negócio e Estimativas de Custo e Esforço

## 1. Fluxo de Reserva (Ponto de Vista do Inquilino vs Proprietário)

**Passo 1: Busca e Visualização**
- **Inquilino:** Insere o destino e datas -> Visualiza opções -> Seleciona "Property X".
- **Backend:** Retorna `AvailabilityCalendar` verificado.

**Passo 2: Início da Reserva (Pre-auth)**
- **Inquilino:** Clica "Reservar". Vê o contrato (Click-wrap). Confirma cartão no Stripe PaymentSheet.
- **Backend:** Processa Stripe Intent (HOLD do limite do cartão). Status da reserva muda para `Pending_Host_Approval` (se o anúncio não for "Reserva Instantânea"). Tempo de expiração do hold = 24hrs.

**Passo 3: Confirmação do Proprietário**
- **Proprietário:** Recebe Push Notification: "Nova solicitação para o final de semana!".
- **Proprietário:** Aperta "Aprovar".
- **Backend:** Captura os fundos via Stripe. Status da reserva -> `Confirmed`. Gera PDF do Contrato e armazena em S3. Envia Email com confirmação e contrato anexo a ambos.

## 2. Esforço e Estimativa (MVP 8 Semanas)

**Time Mínimo Sugerido:**
- 1 Desenvolvedor Full-Stack Senior / Lead (Arquitetura e Backend Express/PostgreSQL).
- 1 Desenvolvedor Frontend / Mobile (React/React Native).
- 1 Designer / UX (Meio período ou freela).
- 1 Analista de QA (Testes E2E).

**Estimativa Esforço:** ~6 Pessoas-Mês para a primeira v1 robusta (considerando reuso forte de libs).
**Custo do Time MVP (Aprox. LATAM/Brasil):** 
- R$ 35.000 a R$ 60.000 por mês x 2 meses de MVP = R$ 70.000 a R$ 120.000 + Servidores.
**Custo Infra Estrutura Nuvem (Aprox MVP AWS/DigitalOcean):** ~ $100-$300 / mês (1 DB, 2 Instâncias, S3, Redis).

## 3. Instruções de Implantação e Prevenção de Fraude
- Subir contêineres Docker usando Google Cloud Run ou AWS Fargate.
- Deploy de DB PostgreSQL Gerenciado.
- **Evitando Fraudes:** O onboarding de anfitriões *DEVE* passar pelo Stripe Connect, que realiza verificações KYC completas (Know Your Customer) em proprietários, protegendo o app de liability financeira e lavagem de dinheiro.
