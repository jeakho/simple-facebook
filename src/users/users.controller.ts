import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Observable, interval, take } from 'rxjs';

import { User as UserModel } from '@prisma/client';
import { UserService } from 'src/users/user.service';
import { HashService } from 'src/hash/hash.service';
import { AuthEntity } from 'src/auth/auth.entity';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly hash: HashService,
    ) { }

    @Post('register')
    signupUser(
        @Body() userData: { name: string; email: string; password: string },
    ): Promise<AuthEntity> {
        return this.userService.createUser({
            name: userData.name,
            email: userData.email,
            hashedPassword: this.hash.hashCrypto(userData.password)
        });
    }

    @Get('some')
    public findUser(): Observable<number> {
        return interval(1000).pipe(take(4));
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string): Promise<UserModel> {
      return this.userService.deleteUser({ id: Number(id) });
    }
}
