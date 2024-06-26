import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './auth.entity';

import { HashService } from 'src/hash/hash.service';


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwtService: JwtService,
        private hashService: HashService
    ) {}

    async login(email: string, password: string): Promise<AuthEntity> {
      const user = await this.prisma.user.findUnique({ where: { email: email } });
  
      if (!user) {
        throw new NotFoundException(`No user found for email: ${email}`);
      }
  
      if (user.hashedPassword !== this.hashService.hashCrypto(password)) {
        throw new UnauthorizedException('Invalid password');
      }
  
      return {
        accessToken: this.jwtService.sign({ userId: user.id }),
      };
    }
}
