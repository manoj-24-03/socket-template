import winston from 'winston';

export const setupLogger = () => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(
        ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`
      )
    ),
    transports: [new winston.transports.Console()],
  });
};
