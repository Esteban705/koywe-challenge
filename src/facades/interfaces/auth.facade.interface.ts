import { CreateUserDto } from '../../models/dtos/create-user.dto';
import { LoginUserDto } from '../../models/dtos/login-user.dto';
import { User } from '../../models/entities/user.schema';

export interface IAuthFacade {
  register(createUserDto: CreateUserDto): Promise<{ user: Partial<User>, token: string }>;
  login(loginUserDto: LoginUserDto): Promise<{ access_token: string }>;
}