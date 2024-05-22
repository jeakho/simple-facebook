import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { HashModule } from 'src/hash/hash.module';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    HashModule,
    JwtModule.register({
      secret: jwtSecret
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
