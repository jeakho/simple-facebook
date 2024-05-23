import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UsersController } from "./users.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { HashModule } from "src/hash/hash.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    providers: [UserService],
    controllers: [UsersController],
    imports: [
        PrismaModule, 
        HashModule,
        AuthModule
    ]
})
export class UserModule {}