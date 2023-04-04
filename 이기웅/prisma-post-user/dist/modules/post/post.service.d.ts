import { PrismaService } from '@/database/prisma.service';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UserService } from '../user/user.service';
export declare class PostService {
    private readonly prisma;
    private readonly userService;
    constructor(prisma: PrismaService, userService: UserService);
    getPost(): Promise<void>;
    getPosts(search?: string): Promise<PostDto[]>;
    createPost(createPostDto: CreatePostDto): Promise<{
        id: string;
    }>;
}
