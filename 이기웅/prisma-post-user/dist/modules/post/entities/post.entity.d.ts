import { Post as PrismaPost } from '@prisma/client';
export declare class Post implements PrismaPost {
    id: string;
    title: string;
    content: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}
