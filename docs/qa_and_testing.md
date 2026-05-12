# Plano de Testes de Garantia de Qualidade (QA)

Este documento dita as diretrizes de QA para a aplicação AlugaFácil.

## Estratégia
*   **Testes Unitários:** Base do backend em Jest/Vitest (foco em cálculos de preço e disponibilidade de datas).
*   **Testes de Integração:** Supertest para bater nos endpoins REST mockando o PostgreSQL.
*   **Testes End-to-End (E2E):** Cypress ou Playwright, em ambiente de Staging.

## Critérios de Aceitação (Exemplo: Funcionalidade "Reserva")

**História de Usuário:** *"Como inquilino, quero poder reservar uma casa para uma data no futuro com meu cartão"*
- [ ] O calendário nao deve permitir selecionar datas marcadas como indisponíveis no banco.
- [ ] Ao aprovar o pagamento, o valor não deve cair *imediatamente* na conta do proprietário (Escrow).
- [ ] Ao cancelar uma reserva na "Política Flexível", 100% do valor deve ser estornado se cancelado > 24hr.

## Checklist de Lançamento Manual (Regression Manual)
1. **Autenticação:** Criar Host, Criar Inquilino, Resetar Senha, JWT Expirando Trata Refresh?
2. **Caminho Feliz (Happy Path):** Anfitrião cria casa -> Inquilino procura por cidade -> Inquilino loca -> Anfitrião aprova -> Check-in acontece.
3. **Casos de Servidor Cair (Resiliência):** O redis na fila de notificações sobe sem derrubar o estado da reserva?
4. **Verificação KYC:** A imagem da carteira de identidade foi mandada pro backend e anonimizada nos metadados?
