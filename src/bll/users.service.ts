import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/entities/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersRepository } from 'src/dal/users.repositoy';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async create(email: string, password: string): Promise<{ user: Partial<User>, token: string }> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser ={
      email,
      password: hashedPassword,
    };
    
    const savedUser = await this.userRepository.create(newUser);
    const token = this.generateToken(savedUser._id.toString());
    
    // Excluimos el password del objeto usuario
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    
    return {
      user: userWithoutPassword,
      token
    };
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

    async findById(id: string): Promise<User | null> {
      return this.userRepository.findById(id);
    }
} 