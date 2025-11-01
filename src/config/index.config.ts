import 'dotenv/config';

export const config = {
  port: process.env.SOCKET_PORT || 5007,
  rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
  allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()) || ['*'],
   cors: {
    methods:
      process.env.CORS_METHODS?.split(',').map((m) => m.trim()) || [
        'GET',
        'POST',
      ],
    allowedHeaders:
      process.env.CORS_ALLOWED_HEADERS?.split(',').map((h) => h.trim()) || [
        'Content-Type',
        'Authorization',
      ],
    credentials: process.env.CORS_CREDENTIALS === 'true' || true, // default true
  },
  // cors: {
  //   methods: ['GET', 'POST'], 
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // },
  grpcUrl: process.env.GRPC_URL || 'localhost:50051',
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '3d',
    algorithm: 'HS256' as const,
  },
};
