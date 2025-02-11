export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Carros",
    description: "API para gerenciamento de carros e webhooks",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  components: {
    schemas: {
      Car: {
        type: "object",
        properties: {
          nome: { type: "string", example: "Etios" },
          marca: { type: "string", example: "Toyota" },
          preco: { type: "number", format: "float", example: 49999.99 },
          anoFabricacao: { type: "integer", example: 2016 },
          ativo: { type: "boolean", example: true },
        },
        required: ["nome", "marca", "preco", "anoFabricacao"],
      },
      Log: {
        type: "object",
        properties: {
          car_id: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" },
          data_hora_criacao: { type: "string", format: "date-time" },
          data_hora_processamento: { type: "string", format: "date-time" },
        },
      },
      Webhook: {
        type: "object",
        properties: {
          id: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" },
          url: { type: "string", example: "http://example.com/webhook" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      WebhookInput: {
        type: "object",
        properties: {
          url: { type: "string", example: "http://example.com/webhook" },
        },
        required: ["url"],
      },
      WebhookEvent: {
        type: "object",
        properties: {
          event: { type: "string", example: "CAR-CREATED-REQUEST" },
          signature: { type: "string", example: "sua-signature-aqui" },
          pendingId: { type: "string", example: "a49de7c7-1c20-4cc4-9afb-f2f60879009a" },
          data: {
            type: "object",
            properties: {
              car_id: { type: "string", example: "072372fb-48d2-4470-9078-21f3d646e43d" },
            },
          },
        },
        required: ["event", "data"],
      },
    },
  },
  paths: {
    "/api/car": {
      get: {
        tags: ["Carros"],
        summary: "Lista todos os carros",
        responses: {
          "200": {
            description: "Lista de carros retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    paginacao: {
                      type: "object",
                      properties: {
                        pagina: { type: "integer" },
                        tamanhoPagina: { type: "integer" },
                        total: { type: "integer" },
                      },
                    },
                    itens: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Car" },
                    },
                  },
                },
              },
            },
          },
          "401": { description: "Não autorizado" },
        },
      },
      post: {
        tags: ["Carros"],
        summary: "Cria um novo carro",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/Car" } } },
        },
        responses: {
          "201": {
            description: "Carro criado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string", example: "123e4567-e89b-12d3-a456-426614174000" },
                  },
                },
              },
            },
          },
          "400": { description: "Dados inválidos" },
          "401": { description: "Não autorizado" },
        },
      },
    },
    "/api/logs": {
      get: {
        tags: ["Logs"],
        summary: "Lista todos os logs",
        responses: {
          "200": {
            description: "Lista de logs retornada com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    total: { type: "integer" },
                    logs: { type: "array", items: { $ref: "#/components/schemas/Log" } },
                  },
                },
              },
            },
          },
          "401": { description: "Não autorizado" },
        },
      },
    },
    "/api/webhooks": {
      get: {
        tags: ["Webhooks"],
        summary: "Lista todas as URLs de webhook cadastradas",
        responses: {
          "200": {
            description: "Lista de URLs de webhook retornada com sucesso",
            content: {
              "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Webhook" } } },
            },
          },
          "401": { description: "Não autorizado" },
        },
      },
      post: {
        tags: ["Webhooks"],
        summary: "Cria uma nova URL de webhook",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { $ref: "#/components/schemas/WebhookInput" } } },
        },
        responses: {
          "201": {
            description: "URL de webhook criada com sucesso",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Webhook" } } },
          },
          "400": { description: "Dados inválidos" },
          "401": { description: "Não autorizado" },
        },
      },
    },
    "/api/webhooks/{id}": {
      delete: {
        tags: ["Webhooks"],
        summary: "Deleta uma URL de webhook pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID da URL de webhook a ser deletada",
          },
        ],
        responses: {
          "200": { description: "Webhook removido com sucesso" },
          "404": { description: "Webhook não encontrado" },
          "401": { description: "Não autorizado" },
        },
      },
    },
  },
};
