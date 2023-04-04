import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPosts(search?: string): Promise<PostDto[]>;
    createPost(createPostDto: CreatePostDto): Promise<{
        id: string;
    }>;
}
