import { createServer } from 'http';
import dotenv from 'dotenv';
import { setupSocketServer } from '@/sockets/index.socket';
import { setupLogger } from '@/utils/logger.util';
import { connectQueue } from '@/queues/index.queue';
import { registerAllConsumers } from '@/queues/consumers/index.consumer';
import { config } from '@/config/index.config';
import { startGrpcServer } from '@/grpc/index.grpc';

dotenv.config();

const logger = setupLogger();
const httpServer = createServer();


(async () => {
  try {
    // Setup Socket.IO server with dynamic CORS
    const io = setupSocketServer(httpServer, {
      cors: {
        origin: (origin, callback) => {
          if (!origin || config.allowedOrigins.includes(origin) || config.allowedOrigins.includes('*')) {
            callback(null, true);
          } else {
            callback(new Error(`Origin ${origin} is not allowed by CORS`));
          }
        },
        methods: config.cors.methods,
        allowedHeaders: config.cors.allowedHeaders,
        credentials: config.cors.credentials,
      },
    });

    // Connect RabbitMQ
    const channel = await connectQueue();

    // Start gRPC server
    startGrpcServer();

    // Register consumers
    await registerAllConsumers(channel, io);

    // Start the HTTP server
    const PORT = config.port || 5000;
    httpServer.listen(PORT, () => {
      logger.info(`Socket BFF running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start Socket BFF', error);
  }
})();
