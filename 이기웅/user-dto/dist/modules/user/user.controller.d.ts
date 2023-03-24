import { Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(res: Response): void;
    create(dto: CreateUserDto, res: Response): void;
    getOne(id: string, res: Response): void;
    update(id: string, dto: UpdateUserDto, res: Response): void;
    deleteOne(id: string, res: Response): void;
}
