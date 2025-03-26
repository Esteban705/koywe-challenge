import { Injectable } from '@nestjs/common';
import { User } from '../../models/entities/user.schema';
import { CreateUserDto } from '../../models/dtos/create-user.dto';
import { UserWithId } from '../type/userDummyInterface';




@Injectable()
export class DummyUsersRepository {
  private users: UserWithId[] = [];

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      _id: Math.random().toString(),
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      toObject: function() {
        return { ...this };
      }
    } as UserWithId;
    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    return user ? { ...user, toObject: () => ({ ...user }) } as User : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user._id === id);
    return user ? { ...user, toObject: () => ({ ...user }) } as User : null;
  }

  async clearAll(): Promise<void> {
    this.users = [];
  }
} 