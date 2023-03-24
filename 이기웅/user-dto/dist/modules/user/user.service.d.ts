import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private users;
    create(dto: CreateUserDto): void;
    getAll(): User[];
    getOne(id: string): User;
    update(id: string, dto: UpdateUserDto): void;
    deleteOne(id: string): boolean;
}
