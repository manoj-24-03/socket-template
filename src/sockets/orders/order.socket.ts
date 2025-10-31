import type { Socket } from 'socket.io';

export const handleOrderSocket = (socket: Socket) => {
  socket.on('subscribe:orders', () => {
    socket.join('orders');
    console.log(`${socket.id} joined orders room`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};
