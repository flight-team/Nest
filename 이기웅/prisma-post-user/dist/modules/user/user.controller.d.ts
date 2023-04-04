import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<UserDto>;
    getUsers(search?: string): Promise<UserDto[]>;
    createUser(createUserDto: CreateUserDto): Promise<{
        id: string;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<void>;
    deleteUser(id: string): Promise<void>;
}
