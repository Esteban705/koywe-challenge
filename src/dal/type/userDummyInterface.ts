import { User } from "@/models/entities/user.schema";

export interface UserWithId extends User {
    _id: string;
  }