import 'dotenv/config';
import { logger } from './logger';
import { WsServer } from './infra/ws/ws_server';
import { HeartBeatsService } from './api/heart_beats.service';
import { newFormulaReducer } from './api/reducers/new_formula_reducer';

(async () => {
  try {
    logger.info('Iniciou');

    const wsServer = new WsServer();
    const heartBeatsService = new HeartBeatsService(newFormulaReducer);

    wsServer.addObserver(heartBeatsService);
  } catch (error) {
    logger.error(error);
  }
})();
