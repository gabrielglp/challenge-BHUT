import 'dotenv/config';
import express from 'express';
import routes from './router';
import { connectDatabase } from './config/database';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';;
import { Webhook } from './models/webhook/webhook';
import { startWebhookConsumer } from './webhookConsumer'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

connectDatabase();

const setupWebhook = async () => {
  try {
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      const existingWebhook = await Webhook.findOne({ url: webhookUrl });
      if (!existingWebhook) {
        await new Webhook({ url: webhookUrl }).save();
        console.log('Webhook URL registrada:', webhookUrl);
      }
    }
  } catch (error) {
    console.error('Erro ao configurar webhook:', error);
  }
};

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  await connectDatabase();
  await setupWebhook();
  await startWebhookConsumer();
});

export default app;