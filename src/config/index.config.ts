import 'dotenv/config';

export const config = {
  port: process.env.SOCKET_PORT || 5007,
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '*').split(','),
  grpcUrl: process.env.GRPC_URL || 'localhost:50051',
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '3d',
    algorithm: 'HS256' as const,
  },
};
