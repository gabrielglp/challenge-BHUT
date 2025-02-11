import axios from 'axios';
import { Webhook } from '../../models/webhook/webhook';

export class WebhookNotificationService {

  public async notifyEvent(event: string, data: any): Promise<void> {
    try {
      const webhooks = await Webhook.find();
      for (const webhook of webhooks) {
        try {
          await axios.post(webhook.url, {
            event,
            data,
          });
          console.log(`Notificação enviada para: ${webhook.url}`);
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Erro ao notificar ${webhook.url}:`, error.message);
          } else {
            console.error(`Erro ao notificar ${webhook.url}:`, error);
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao notificar webhooks:', error.message);
      } else {
        console.error('Erro ao notificar webhooks:', error);
      }
    }
  }
}
