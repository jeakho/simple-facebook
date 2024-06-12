import { Controller, Get, UseGuards, Post, Body, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './create-post.dto';

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
      @Body() { content: post }: CreatePostDto,
      @Request() req: any
    ): Promise<PostModel> {
        return this.postService.createPost({
            post,
            author: {
                connect: { id: req.user.id }
            }
        });
    }
}
