import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { type JWTPayload } from './types/jwt-payload.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, res: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + +this.configService.getOrThrow('JWT_EXP'),
    );

    const payload: JWTPayload = {
      _id: user._id.toHexString(),
      email: user.email,
      name: user.name,
    };

    const token = this.jwtService.sign(payload);

    res.cookie('access-token', token, {
      httpOnly: true,
      expires,
    });
  }

  async logout(response: Response) {
    response.cookie('access-token', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }

  verifyWs(request: Request): JWTPayload {
    const cookies: string[] = request.headers.cookie.split('; ');
    const authCookie = cookies.find((cookie) =>
      cookie.includes('access-token'),
    );
    const jwt = authCookie.split('access-token=')[1];
    return this.jwtService.verify(jwt);
  }
}
