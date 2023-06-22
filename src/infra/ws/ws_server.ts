import express, { Express, Request } from 'express';
import { createServer, Server } from 'http';
import * as WebSocket from 'ws';
import { HandleDataInterface, Operation } from '../../api/defenitons';
import { logger } from '../../logger';
import path from 'path';

export class WsServer {
  webSocketServer: WebSocket.Server;
  app: Express;
  server: Server;
  observer!: HandleDataInterface;
  output = new Set<WebSocket>();

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.webSocketServer = new WebSocket.Server({ server: this.server });
  }

  listen(): void {
    this.listenWebServer();
    this.listenWebSocket();
  }

  listenWebServer() {
    const port = process.env.PORT || 3000;

    this.app.use(express.static(path.join(__dirname, '..', '..', '..', 'public')));

    this.server.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  }

  listenWebSocket() {
    this.webSocketServer.on('connection', (connection: WebSocket, req: Request) => {
      const isOutput = req.url.toUpperCase().includes(Operation.OUTPUT);
      if (isOutput) {
        this.installOutput(connection);
      }

      const headers = JSON.stringify(req.headers);
      logger.info(`{ CONNECTED: ${headers} }`);

      connection.on('message', this.handleMessage(isOutput ? Operation.OUTPUT : Operation.INPUT));

      connection.on('close', () => {
        const headers = JSON.stringify(req.headers);
        logger.info(`{ DISCONNECTED: ${headers} }`);
      });
    });
  }

  public addObserver(observer: HandleDataInterface) {
    this.observer = observer;
  }

  private handleMessage = (operation: Operation) => (message: string) => {
    if (operation === Operation.INPUT && this.isBeat(message)) {
      const calculatedResult = this.observer.calculate();
      this.fanOutMessage(calculatedResult);
    }
  };

  private installOutput(connection: WebSocket) {
    this.output.add(connection);
  }

  private uninstallOutput(connection: WebSocket) {
    this.output.delete(connection);
  }

  private isBeat(message: string): boolean {
    const bufferValue = Buffer.from(message, 'hex');

    const stringValue = bufferValue.toString('utf8');

    let messageObj;
    try {
      messageObj = JSON.parse(stringValue);
    } catch (error) {
      logger.error(error);
      return false;
    }

    return messageObj?.type === 'beat';
  }

  private fanOutMessage(calculatedResult: string): void {
    this.output.forEach((connection: WebSocket) => {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(calculatedResult);
      } else {
        this.uninstallOutput(connection);
      }
    });
  }
}
