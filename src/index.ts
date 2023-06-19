import 'dotenv/config';
import { logger } from './logger';

(async () => {
  try {
    logger.info('Iniciou');
  } catch (error) {
    logger.error(error);
  }
})();
