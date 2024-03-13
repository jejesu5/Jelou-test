import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  generateToken(payload: any) {
    const token = this.jwtService.sign(payload);

    return {
      message: 'Token generated',
      token,
    };
  }
}
