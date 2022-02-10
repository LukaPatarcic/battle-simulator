import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from './socket/socket.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from './auth/websocket.guard';

@WebSocketGateway({ cors: true })
@UseGuards(WsJwtGuard)
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleDisconnect() {
    console.log('disconnected');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }
}
