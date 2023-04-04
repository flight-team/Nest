import { User } from '@prisma/client';
export declare class UserDto {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    constructor(args: User);
}
