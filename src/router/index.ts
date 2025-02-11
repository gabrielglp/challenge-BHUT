import { Router } from 'express';
import { CarController } from '../controllers/car/carController';
import { LogController } from '../controllers/log/logController';
import { WebhookUrlController } from '../controllers/webhook/webhookUrlController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const carController = new CarController();
const logController = new LogController();
const webhookUrlController = new WebhookUrlController();

router.get('/api/car', authMiddleware, carController.getCars);
router.post('/api/car', authMiddleware, carController.createCar);

router.get('/api/logs', authMiddleware, logController.getLogs);

router.get('/api/webhooks', authMiddleware, webhookUrlController.getWebhooks);
router.post('/api/webhooks', authMiddleware, webhookUrlController.createWebhook);
router.delete('/api/webhooks/:id', authMiddleware, webhookUrlController.deleteWebhook);

export default router;