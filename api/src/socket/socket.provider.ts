import { IoAdapter } from '@nestjs/platform-socket.io';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { User } from '../auth/user.entity';
import { ServerOptions } from 'http';

export interface CustomSocket extends Socket {
  user: User;
}

export class AuthAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);
    server.use((socket: CustomSocket, next) => {
      const accessToken =
        socket.handshake?.query?.accessToken.toString() || null;
      if (!accessToken) {
        next(new Error('Authentication error'));
      }
      verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          next(new Error('Authentication error'));
        }

        socket.user = decoded as User;
        next();
      });
    });
    return server;
  }
}
