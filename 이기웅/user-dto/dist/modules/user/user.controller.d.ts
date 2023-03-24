import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(): import("./entities/user.entity").User[];
    create(dto: CreateUserDto): void;
    getOne(id: string): import("./entities/user.entity").User;
    update(id: string, dto: UpdateUserDto): void;
    deleteOne(id: string): boolean;
}
