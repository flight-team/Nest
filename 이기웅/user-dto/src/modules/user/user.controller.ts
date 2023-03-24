import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller("users")
@ApiTags("유저")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "모든 유저 조회" })
  @ApiResponse({ status: 200, description: "조회" })
  getAll(@Res() res: Response) {
    const users = this.userService.getAll();
    res.status(HttpStatus.OK).json({ users });
  }

  @Post()
  @ApiOperation({ summary: "유저 생성" })
  @ApiResponse({ status: 201, description: "생성" })
  create(@Body() dto: CreateUserDto, @Res() res: Response) {
    const createdUserId = this.userService.create(dto);
    res.status(HttpStatus.CREATED).json({ id: createdUserId });
  }

  @Get(":id")
  @ApiOperation({ summary: "userId를 통한 단일 유저 조회" })
  @ApiResponse({ status: 200, description: "조회" })
  @ApiResponse({ status: 404, description: "없을 경우" })
  getOne(@Param("id") id: string, @Res() res: Response) {
    const user = this.userService.getOne(id);
    res.status(HttpStatus.OK).json({ user });
  }

  @Patch(":id")
  @ApiOperation({ summary: "userId를 통한 단일 유저 업데이트" })
  @ApiResponse({ status: 204, description: "생성" })
  @ApiResponse({ status: 404, description: "없을 경우" })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateUserDto,
    @Res() res: Response
  ) {
    this.userService.update(id, dto);
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(":id")
  @ApiOperation({ summary: "userId를 통한 단일 유저 삭제" })
  @ApiResponse({ status: 204, description: "삭제" })
  @ApiResponse({ status: 404, description: "없을 경우" })
  deleteOne(@Param("id") id: string, @Res() res: Response) {
    this.userService.deleteOne(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
