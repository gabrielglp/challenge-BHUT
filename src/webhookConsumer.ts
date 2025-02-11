import { MessageService, QueueMessage } from './services/messageService';
import { CarService } from './services/car/carService';
import { WebhookNotificationService } from './services/webhook/webhookNotificationService';
import { Log } from './models/log/log';

const messageService = new MessageService();
const carService = new CarService();
const webhookNotificationService = new WebhookNotificationService();

const processMessage = async (message: QueueMessage): Promise<void> => {
  try {    
    const createdCar = await carService.createCar(message);

    await webhookNotificationService.notifyEvent('CAR_CREATED', {
      car_id: createdCar.id,
      car_data: message,
      created_at: new Date()
    });

    const log = new Log({
      car_id: createdCar.id,
      data_hora_criacao: new Date(),
      data_hora_processamento: new Date()
    });
    await log.save();

  } catch (error) {
    console.error('Erro ao processar mensagem do webhook:', error);
    throw error;
  }
};

export const startWebhookConsumer = async (): Promise<void> => {
  try {
    await messageService.connect();
    console.log('Consumidor de mensagens para webhook iniciado!');
    await messageService.consumeMessages(processMessage);
  } catch (error) {
    console.error('Erro ao iniciar o consumidor de mensagens:', error);
    process.exit(1);
  }
};