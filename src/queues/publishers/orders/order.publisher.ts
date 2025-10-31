import type { Channel } from 'amqplib';
import { connectQueue } from '@/queues/index.queue';
import { QUEUES } from '@/constants/queue.constants';

export async function publishOrderPlaced(order: any) {
  const channel: Channel = await connectQueue();

  await channel.assertQueue(QUEUES.ORDER_PLACED, { durable: true });
  channel.sendToQueue(QUEUES.ORDER_PLACED, Buffer.from(JSON.stringify(order)), {
    persistent: true,
  });

  console.log(`📤 Published order to ${QUEUES.ORDER_PLACED}`);
}
