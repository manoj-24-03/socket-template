import type { Channel } from 'amqplib';
import type { Server } from 'socket.io';
import { setupLogger } from '@/utils/logger.util';
import { QUEUES } from '@/constants/queue.constants';

const logger = setupLogger();

/**
 * Listens to RabbitMQ queues and emits to Socket.IO clients.
 */
export const registerOrderConsumers = async (channel: Channel, io: Server) => {
  await channel.assertQueue(QUEUES.ORDER_EVENTS, { durable: true });
  channel.consume(
    QUEUES.ORDER_EVENTS,
    (msg) => {
      if (!msg) {
        return;
      }
      const content = JSON.parse(msg.content.toString());
      logger.info(`Received Order Event: ${JSON.stringify(content)}`);
      // Emit to frontend via socket
      io.to('orders').emit('order:created', content);

      channel.ack(msg);
    },
    { noAck: false }
  );

  logger.info("Consumer listening on 'order_events' queue");
};
