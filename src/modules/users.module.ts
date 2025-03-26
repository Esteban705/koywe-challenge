import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/models/entities/user.schema";
import { UsersService } from "src/bll/users.service";
import { UsersRepository } from "src/dal/users.repositoy";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {} 