import { config } from '../config/index.config';
import type { Channel } from 'amqplib';
import amqp from 'amqplib';
import { setupLogger } from '@/utils/logger.util';

const logger = setupLogger();

let connection: any;
let channel: Channel;

export const connectQueue = async () => {
  try {
    connection = await amqp.connect(config.rabbitmqUrl!);
    channel = await connection.createChannel();
    logger.info('Connected to RabbitMQ');
    return channel;
  } catch (error) {
    logger.error(`RabbitMQ connection error: ${error}`);
    process.exit(1);
  }
};

export const getRabbitChannel = () => channel;
