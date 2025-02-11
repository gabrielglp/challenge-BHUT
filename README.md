# Aplicação API de Carros
### Descrição
Esta é uma aplicação Node.js construída com TypeScript que fornece uma API REST para gerenciamento de informações de carros. A aplicação utiliza MongoDB para armazenamento de dados e RabbitMQ para fila de mensagens.

### Pré-requisitos

- Docker e Docker Compose
- Node.js 20.x
- npm (Gerenciador de Pacotes do Node)

### Variáveis de Ambiente

Crie um arquivo ```.env``` no diretório raiz com as seguintes variáveis:
````
PORT=3000
MONGODB_URL=mongodb://localhost:27017/carros_api
RABBITMQ_URL=amqp://localhost
API_BASE_URL=http://api-test.bhut.com.br:3000/api/v1
API_LOGIN=seu_login
API_PASSWORD=sua_senha
````

### Instalação e Configuração

### Usando Docker (Recomendado)

- Clone o repositório
- Construa e inicie os containers:

````docker-compose up -d````

Isso iniciará:

- Container MongoDB (porta 27017)
- Container RabbitMQ (portas 5672 e 15672 para gerenciamento)
- Aplicação API (porta 3000)

### Configuração Manual

- Clone o repositório
- Instale as dependências:

````npm install````

- Inicie o MongoDB e RabbitMQ separadamente
- Construa a aplicação:

````npm run build````

- Inicie a aplicação:

````npm start````


### Desenvolvimento

Para executar a aplicação em modo de desenvolvimento com recarga automática:

````npm run dev````

Para iniciar o consumidor de webhook separadamente:

````npm run start:consumer````

### Estrutura do Projeto
````
Copysrc/
├── config/         # Arquivos de configuração
├── controllers/    # Controladores de rotas
├── middlewares/    # Middlewares do Express
├── models/         # Modelos do MongoDB
├── router/         # Definições de rotas
├── services/       # Lógica de negócio
├── app.ts          # Ponto de entrada da aplicação
└── webhookConsumer.ts # Serviço consumidor de webhook
````

### Documentação da API

A documentação da API está disponível através do Swagger UI em:


````http://localhost:3000/api-docs````

### Scripts Disponíveis

- ````npm run dev````: Inicia o servidor de desenvolvimento com recarga automática
- ````npm run build````: Compila o código TypeScript
- ````npm start````: Inicia o servidor de produção
- ````npm run start:consumer````: Inicia o consumidor de webhook

### Comandos Docker

- Construir e iniciar todos os containers:

````docker-compose up -d````

- Parar todos os containers:

````docker-compose down````

- Visualizar logs:

````docker-compose logs -f````

### Monitoramento

- Interface de Gerenciamento do RabbitMQ: http://localhost:15672

- Credenciais padrão: guest/guest



### Solução de Problemas

- Se a conexão com MongoDB falhar:

- Verifique se o container do MongoDB está rodando: ````docker ps````
- Verifique os logs do MongoDB: ````docker-compose logs mongodb````


- Se a conexão com RabbitMQ falhar:

- Verifique se o container do RabbitMQ está rodando: ````docker ps````
- Verifique os logs do RabbitMQ: ````docker-compose logs rabbitmq````
