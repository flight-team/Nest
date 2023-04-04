import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(userId: string): Promise<UserDto>;
    getUsers(search?: string): Promise<UserDto[]>;
    createUser(createUserDto: CreateUserDto): Promise<{
        id: string;
    }>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<void>;
    deleteUser(userId: string): Promise<void>;
}
