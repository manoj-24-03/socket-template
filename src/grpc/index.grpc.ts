import { config } from '@/config/index.config';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { setupLogger } from '@/utils/logger.util';

const logger = setupLogger();

export function startGrpcServer() {
  try {
    const protoPath = path.resolve(__dirname, './protos/order.proto');

    const packageDef = protoLoader.loadSync(protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    const grpcObject = grpc.loadPackageDefinition(packageDef) as any;
    const orderPackage = grpcObject.order;

    const server = new grpc.Server();

    server.addService(orderPackage.OrderService.service, {});

    server.bindAsync(
      config.grpcUrl,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          logger.error('Failed to start gRPC server:', err);
          return;
        }
        logger.info(`gRPC Product Service running on port ${port}`);
      }
    );
  } catch (error) {
    logger.error('Failed to start gRPC server:', error);
  }
}
