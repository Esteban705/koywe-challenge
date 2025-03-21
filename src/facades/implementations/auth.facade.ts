import { AuthService } from "src/bll/auth.service";
import { UsersService } from "src/bll/users.service";
import { CreateUserDto } from "src/models/dtos/create-user.dto";
import { User } from "src/models/entities/user.schema";
import { IAuthFacade } from "../interfaces/auth.facade.interface";
import { Injectable } from "@nestjs/common";
import { LoginUserDto } from "src/models/dtos/login-user.dto";

@Injectable()
export class AuthFacade implements IAuthFacade {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ user: Partial<User>, token: string }> {
    return this.usersService.create(createUserDto.email, createUserDto.password);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    return this.authService.login(loginUserDto);
  }
}