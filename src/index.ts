import { createServer } from 'http';
import dotenv from 'dotenv';
import { setupSocketServer } from '@/sockets/index.socket';
import { setupLogger } from '@/utils/logger.util';
import { connectQueue } from '@/queues/index.queue';
import { registerAllConsumers } from '@/queues/consumers/index.consumer';
import { config } from '@/config/index.config';
import { startGrpcServer } from '@/grpc/index.grpc';
import { CorsOptions } from '@/config/cors/cors.config';

dotenv.config();

const logger = setupLogger();
const httpServer = createServer();

(async () => {
  try {
    // Setup Socket.IO server
    const io = setupSocketServer(httpServer, {
      cors: CorsOptions,
    });

    // Connect RabbitMQ
    const channel = await connectQueue();

    // Start gRPC server
    await startGrpcServer();

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
