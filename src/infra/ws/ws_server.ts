import express from 'express';
import { createServer, Server } from 'http';
import * as WebSocket from 'ws';
import { HandleDataInterface, Operation } from '../../api/defenitons';
import { logger } from '../../logger';

export class WsServer {
  webSocketServer: WebSocket.Server;
  server: Server;
  observer!: HandleDataInterface;
  receivers: WebSocket[] = [];

  constructor() {
    const app = express();
    this.server = createServer(app);
    this.webSocketServer = new WebSocket.Server({ server: this.server });
    this.init();
    this.listen();
  }

  init(): void {
    const port = process.env.PORT || 8100;

    this.server.listen(port, () => {
      logger.info(`Server started on port ${port}`);
    });
  }

  listen(): void {
    this.webSocketServer.on('connection', (webSocket: WebSocket) => {
      webSocket.on('message', this.receivedMessage(webSocket));

      webSocket.send('Connected');
    });
  }

  public addObserver(observer: HandleDataInterface) {
    this.observer = observer;
  }

  private receivedMessage = (webSocket: WebSocket) => (message: string) => {
    const operation = this.getOperation(message);

    if (operation === Operation.OUTPUT) {
      this.receivers.push(webSocket);
    }

    const resultReduce = this.observer.reduce();

    this.sendMessage(resultReduce);
  };

  private getOperation(message: string): string {
    const bufferValue = Buffer.from(message, 'hex');
    const stringValue = bufferValue.toString('utf8');
    const messageObj = JSON.parse(stringValue);

    if (!messageObj?.operation) {
      return '';
    }

    const operationUpperCase = messageObj?.operation.toUpperCase();
    if (!Object.values(Operation).includes(operationUpperCase)) {
      return '';
    }

    return operationUpperCase;
  }

  private sendMessage(resultReduce: string): void {
    this.receivers.forEach((webSocket: WebSocket) => {
      webSocket.send(resultReduce);
    });
  }
}
