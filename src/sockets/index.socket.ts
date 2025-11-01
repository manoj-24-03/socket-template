// src/sockets/index.socket.ts
import { Server } from 'socket.io';
import type { ServerOptions } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { handleOrderSocket } from './orders/order.socket';

export const setupSocketServer = (
  httpServer: HttpServer,
  options?: Partial<ServerOptions>
) => {
  const io = new Server(httpServer, options);

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    handleOrderSocket(socket);

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};
