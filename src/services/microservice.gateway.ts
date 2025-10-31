import type { Socket } from 'socket.io-client';
import { io as Client } from 'socket.io-client';
import { setupLogger } from '../utils/logger.util';

const logger = setupLogger();

export const connectToMicroservices = (clientSocket: Socket, user: any) => {
  const endpoints = [
    { name: 'seller', url: process.env.SELLER_SOCKET_URL },
    { name: 'shop', url: process.env.SHOP_SOCKET_URL },
  ];

  const sockets = endpoints.map((svc) => {
    const svcSocket = Client(svc.url!, {
      auth: { token: user.token },
      reconnection: true,
    });

    svcSocket.on('connect', () =>
      logger.info(`🔌 Connected to ${svc.name} service`)
    );
    svcSocket.onAny((event, data) => {
      clientSocket.emit(`${svc.name}:${event}`, data);
    });

    return svcSocket;
  });

  return sockets;
};
