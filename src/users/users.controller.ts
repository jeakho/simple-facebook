import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

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
        @Body() userData: { name: string; email: string; password: string },
    ): Promise<AuthEntity> {
        try {
            await this.userService.createUser({
                name: userData.name,
                email: userData.email,
                hashedPassword: this.hash.hashCrypto(userData.password)
            });

            return this.authService.login(userData.email, userData.password);
        } catch (e) {
            throw e;
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    public findUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
        console.log(typeof id)
        return this.userService.user({ id });
    }

    @Delete(':id')
    async deletePost(@Param('id') id: number): Promise<UserModel> {
      return this.userService.deleteUser({ id: Number(id) });
    }
}
