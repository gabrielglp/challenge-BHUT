import { Connection, Channel, ConsumeMessage } from 'amqplib';
import * as amqp from 'amqplib';

export interface QueueMessage {
  name: string;
  marca: string ;
  preco: number;
  anoFabricacao: number;
}

export class MessageService {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private readonly queueName = 'car_created';
  private isConnecting: boolean = false;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;

  async connect(): Promise<void> {
    if (this.isConnecting) return;
    
    try {
      this.isConnecting = true;
      const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
      
      console.log('Tentando conectar ao RabbitMQ...');
      this.connection = await amqp.connect(rabbitmqUrl);
      
      this.connection.on('error', (err) => {
        console.error('Erro na conexão RabbitMQ:', err);
        this.handleDisconnect();
      });

      this.connection.on('close', () => {
        console.log('Conexão RabbitMQ fechada');
        this.handleDisconnect();
      });

      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });

      this.isConnecting = false;
      this.reconnectAttempts = 0;
      console.log('Conectado ao RabbitMQ com sucesso!');
    } catch (error) {
      this.isConnecting = false;
      console.error('Erro ao conectar ao RabbitMQ:', error);
      await this.handleDisconnect();
    }
  }

  private async handleDisconnect(): Promise<void> {
    this.channel = null;
    this.connection = null;
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Tentativa de reconexão ${this.reconnectAttempts} de ${this.maxReconnectAttempts}`);
      
      const timeout = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      await new Promise(resolve => setTimeout(resolve, timeout));
      
      await this.connect();
    } else {
      console.error('Número máximo de tentativas de reconexão atingido');
    }
  }

  async sendMessage(message: QueueMessage): Promise<boolean> {
    try {
      if (!this.channel) {
        await this.connect();
      }

      const success = this.channel!.sendToQueue(
        this.queueName,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );

      return success;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw error;
    }
  }

  async consumeMessages(callback: (data: QueueMessage) => Promise<void>): Promise<void> {
    try {
      if (!this.channel) {
        await this.connect();
      }

      await this.channel!.consume(
        this.queueName,
        async (msg: ConsumeMessage | null) => {
          if (msg) {
            try {
              const data: QueueMessage = JSON.parse(msg.content.toString());
              await callback(data);
              this.channel!.ack(msg);
            } catch (error) {
              console.error('Erro ao processar mensagem:', error);
              this.channel!.nack(msg, false, true);
            }
          }
        },
        { noAck: false }
      );
    } catch (error) {
      console.error('Erro ao consumir mensagens:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      this.channel = null;
      this.connection = null;
    } catch (error) {
      console.error('Erro ao fechar conexão RabbitMQ:', error);
      throw error;
    }
  }
}
