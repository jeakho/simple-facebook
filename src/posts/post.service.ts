import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Post as PostModel } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async posts(): Promise<PostModel[]> {
    return this.prisma.post.findMany();
  }

  async createPost(data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.prisma.post.create({
      data
    });
  }
}