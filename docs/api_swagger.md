# AlugaFácil - Documentação de API REST (Draft OpenAPI 3.0)

Abaixo está a estrutura base para as rotas da API, no formato OpenAPI/Swagger.

```yaml
openapi: 3.0.0
info:
  title: AlugaFácil API
  description: Backend services for the AlugaFácil house rental platform
  version: 1.0.0
servers:
  - url: https://api.alugafacil.com/v1
    description: Production Server
paths:
  /properties:
    get:
      summary: Lista propriedades via Web Search
      parameters:
        - in: query
          name: location
          schema:
            type: string
          description: Coordendas ou Cidade alvo
        - in: query
          name: checkIn
          schema:
            type: string
            format: date
        - in: query
          name: checkOut
          schema:
            type: string
            format: date
      responses:
        '200':
          description: Sucesso
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Property'
    post:
      summary: Cria um novo anúncio
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PropertyCreatePayload'
      responses:
        '201':
          description: Criado
  /reservations/{id}/pre-authorize:
    post:
      summary: Inicia fluxo de pagamento na Stripe e bloqueia calendário temporariamente (15m)
      responses:
        '200':
          description: Retorna o `clientSecret` para injetar no Stripe Frontend SDK.

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Property:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        price:
          type: number
        currency:
          type: string
    PropertyCreatePayload:
      type: object
      properties:
        title:
          type: string
        type:
          type: string
          enum: [short-term, long-term]
        basePriceBRL:
          type: number
        amenities:
          type: array
          items:
            type: string
```
