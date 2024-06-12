import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { User as UserModel } from '@prisma/client';
import { UserService } from 'src/users/user.service';
import { HashService } from 'src/hash/hash.service';
import { AuthEntity } from 'src/auth/auth.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDto } from './register-user.dto';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly hash: HashService,
    ) { }

    @Post('register')
    async register(
        @Body() { name, email, password }: RegisterUserDto,
    ): Promise<AuthEntity> {
        await this.userService.createUser({
            name,
            email,
            hashedPassword: this.hash.hashCrypto(password)
        });

        return this.authService.login(email, password);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public findUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
        return this.userService.user({ id });
    }
}
