import { AuthFacade } from "../implementations/auth.facade";
import { Controller, Post, Body } from "@nestjs/common";
import { CreateUserDto } from "src/models/dtos/create-user.dto";
import { LoginUserDto } from "src/models/dtos/login-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authFacade.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authFacade.login(loginUserDto);
  }
}