import { World } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { DummyUsersRepository } from 'src/dal/dummy/users.repository.dummy';

export interface CustomWorld {
  app: INestApplication;
  response: any;
  error: any;
}

export class CustomWorld extends World implements CustomWorld {
  app: INestApplication;
  response: any;
  error: any;
  usersRepository: DummyUsersRepository;
  authToken: string;
  quoteId: string;
} 