import 'dotenv/config';
import { logger } from './logger';
import { WsServer } from './infra/ws/ws_server';
import { HeartBeatsService } from './api/heart_beats.service';
import { newFormulaCalculator } from './api/calculator/new_formula_calculator';

(async () => {
  try {
    logger.info('Iniciou');

    const wsServer = new WsServer();
    const heartBeatsService = new HeartBeatsService(newFormulaCalculator);

    wsServer.addObserver(heartBeatsService);
    wsServer.listen();
  } catch (error) {
    logger.error(error);
  }
})();
