import { Controller, Get, UseGuards, Post, Body, Request, BadRequestException } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postService: PostService
    ) { }


    @Get()
    @UseGuards(JwtAuthGuard)
    getPosts(): Promise<PostModel[]> {
        return this.postService.posts();
    }

    @Post('post')
    @UseGuards(JwtAuthGuard)
    async createPost(
      @Body() { post }: { post: string },
      @Request() req: any
    ): Promise<PostModel> {
        if (typeof post !== 'string') {
            throw new BadRequestException('Invalid type of parameter "post"')
        }

        return this.postService.createPost({
            post,
            author: {
                connect: { id: req.user.id }
            }
        });
    }
}
