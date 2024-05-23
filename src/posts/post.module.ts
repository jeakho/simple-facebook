import { PrismaModule } from "src/prisma/prisma.module";
import { PostService } from "./post.service";
import { AuthModule } from "src/auth/auth.module";
import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";

@Module({
    providers: [PostService],
    controllers: [PostsController],
    imports: [
        PrismaModule,
        AuthModule
    ]
})
export class PostModule {}