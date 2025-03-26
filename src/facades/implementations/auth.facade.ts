import { AuthService } from "src/bll/auth.service";
import { UsersService } from "src/bll/users.service";
import { CreateUserDto } from "src/models/dtos/create-user.dto";
import { User } from "src/models/entities/user.schema";
import { IAuthFacade } from "../interfaces/auth.facade.interface";
import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { LoginUserDto } from "src/models/dtos/login-user.dto";

@Injectable()
export class AuthFacade implements IAuthFacade {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{ user: Partial<User>, token: string }> {
    try {
      return await this.usersService.create(createUserDto.email, createUserDto.password);
    } catch (error) {
      if (error.message.includes('ya está registrado')) {
        throw new BadRequestException('El email ya está registrado');
      }
      throw new BadRequestException('Error al registrar el usuario');
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    try {
      const result = await this.authService.login(loginUserDto);
      if (!result) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('Error al iniciar sesión');
    }
  }
}