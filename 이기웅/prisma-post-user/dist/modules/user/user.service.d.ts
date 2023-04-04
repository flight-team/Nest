import { PrismaService } from '@/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private checkNameDuplicated;
    getUser(id: string): Promise<UserDto>;
    getUsers(searchName?: string): Promise<UserDto[]>;
    createUser(createUserDto: CreateUserDto): Promise<{
        id: string;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
