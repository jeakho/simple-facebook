import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { User as UserModel } from '@prisma/client';
import { UserService } from 'src/users/user.service';
import { HashService } from 'src/hash/hash.service';
import { AuthEntity } from 'src/auth/auth.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly hash: HashService,
    ) { }

    @Post('register')
    async register(
        @Body() { name, email, password }: { name: string; email: string; password: string },
    ): Promise<AuthEntity> {
        if (typeof name !== 'string' || !name) {
            throw new BadRequestException('Invalid type or value of parameter "name"')
        }
        if (typeof email !== 'string' || !email) {
            throw new BadRequestException('Invalid type or value of parameter "email"')
        }
        if (typeof password !== 'string' || !password) {
            throw new BadRequestException('Invalid type or value of parameter "password"')
        }

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
