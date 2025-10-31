import type { Channel } from 'amqplib';
import type { Server } from 'socket.io';
import { registerOrderConsumers } from './orders/order.consumer';

export async function registerAllConsumers(channel: Channel, io: Server) {
  await Promise.all([registerOrderConsumers(channel, io)]);
}
