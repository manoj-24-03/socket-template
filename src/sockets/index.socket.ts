import { Server } from 'socket.io';
import { handleOrderSocket } from './orders/order.socket';

export const setupSocketServer = (server: any) => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    handleOrderSocket(socket);
  });

  return io;
};
