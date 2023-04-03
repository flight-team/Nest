import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").User[]>;
}
