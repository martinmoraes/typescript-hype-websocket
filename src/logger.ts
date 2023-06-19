import winston from 'winston';
import * as path from 'path';

const formatRules = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const { timestamp, level, message, stack } = info;
    return `[${timestamp}] ${level}: ${message} Stacktrace: ${stack}`;
  }),
);

const LOG_DIR = process.env.LOG_DIR ?? '../log';

export const logger = winston.createLogger({
  level: 'info',
  format: formatRules,
  transports: [
    new winston.transports.File({
      filename: path.resolve(LOG_DIR, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({ filename: path.resolve(LOG_DIR, 'combined.log') }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: formatRules,
    }),
  );
}
