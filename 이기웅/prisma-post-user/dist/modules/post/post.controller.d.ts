import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPost(id: string): Promise<PostDto>;
    getPosts(search?: string): Promise<PostDto[]>;
    createPost(createPostDto: CreatePostDto): Promise<{
        id: string;
    }>;
    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<void>;
    deletePost(id: string): Promise<void>;
}
