import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const client = context.switchToWs().getClient();
    const cookies: string[] = client.handshake.headers.cookie.split('; ');
    const authToken = cookies
      .find((cookie) => cookie.startsWith('jwt'))
      .split('=')[1];
    console.log(authToken);
    const jwtPayload: JwtPayload = <JwtPayload>(
      jwt.verify(authToken, process.env.JWT_SECRET)
    );
    const user = await this.userRepository.findOne({
      username: jwtPayload.username,
    });

    return Boolean(user);
  }
}
