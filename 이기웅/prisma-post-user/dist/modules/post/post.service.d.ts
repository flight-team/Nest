import { PrismaService } from '@/database/prisma.service';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostService {
    private readonly prisma;
    private readonly userService;
    constructor(prisma: PrismaService, userService: UserService);
    getPost(id: string): Promise<PostDto>;
    getPosts(search?: string): Promise<PostDto[]>;
    createPost(createPostDto: CreatePostDto): Promise<{
        id: string;
    }>;
    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<void>;
    deletePost(id: string): Promise<void>;
}
