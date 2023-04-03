import { PrismaService } from '@/database/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUsers(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").User[]>;
}
