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
  const io = setupSocketServer(httpServer);
  const channel = await connectQueue();
  startGrpcServer();
  await registerAllConsumers(channel, io);

  const PORT = config.port || 5000;
  httpServer.listen(PORT, () => {
    logger.info(`Socket BFF running on port ${PORT}`);
  });
})();
