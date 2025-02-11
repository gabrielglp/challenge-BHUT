import { Request, Response, NextFunction } from 'express';
import { Webhook } from '../../models/webhook/webhook';

export class WebhookUrlController {
  public getWebhooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const webhooks = await Webhook.find();
      res.json(webhooks);
    } catch (error) {
      next(error);
    }
  };

  public createWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { url } = req.body;
      if (!url) {
        res.status(400).json({ error: 'URL é obrigatória' });
        return;
      }
      const webhook = new Webhook({ url });
      await webhook.save();
      res.status(201).json(webhook);
    } catch (error) {
      next(error);
    }
  };

  public deleteWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const webhook = await Webhook.findByIdAndDelete(id);
      if (!webhook) {
        res.status(404).json({ error: 'Webhook não encontrado' });
        return;
      }
      res.json({ message: 'Webhook removido com sucesso' });
    } catch (error) {
      next(error);
    }
  };
}
