import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() { email, password }: LoginDto) {
    if (typeof email !== 'string' || !email) {
      throw new BadRequestException('Invalid type or value of parameter "email"')
    }
    if (typeof password !== 'string' || !password) {
      throw new BadRequestException('Invalid type or value of parameter "password"')
    }
    
    return this.authService.login(email, password);
  }
}
