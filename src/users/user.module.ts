import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UsersController } from "./users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { HashModule } from "src/hash/hash.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtSecret } from "src/auth/auth.module";

@Module({
    providers: [UserService],
    controllers: [UsersController],
    imports: [
        PrismaModule, 
        HashModule,
        JwtModule.register({
            secret: jwtSecret
        }),
    ]
})
export class UserModule {}