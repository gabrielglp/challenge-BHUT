import mongoose from 'mongoose';

const WebhookSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Webhook = mongoose.model('Webhook', WebhookSchema);