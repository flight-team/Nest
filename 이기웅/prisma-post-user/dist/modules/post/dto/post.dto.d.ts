import { Post, User } from '@prisma/client';
import { UserDto } from '@/modules/user/dto/user.dto';
export type PostDtoArgs = Exclude<Post, 'User'> & {
    User: User;
};
export declare class PostDto {
    id: string;
    title: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: UserDto;
    constructor(args: PostDtoArgs);
}
