export const config = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://api-test.bhut.com.br:3000/api/v1',
    login: process.env.API_LOGIN || 'gabriel.martins',
    password: process.env.API_PASSWORD || 'd28e604e-8673-4192-9a44-9a6700fb25f2'
  },
  mongodb: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/carros_api'
  },
  rabbitmq: {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    options: {
      heartbeat: 60
    }
  },
};