import { Before, After, Given, When, Then } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CustomWorld } from '../world/custom-world';
import { INestApplication } from '@nestjs/common';
import { TestModule } from '../test.module';
import { UsersRepository } from 'src/dal/users.repositoy';
import { DummyUsersRepository } from '@/dal/dummy/users.repository.dummy';
import { expect } from 'chai';

let app: INestApplication;
let dummyRepository: DummyUsersRepository;
let response: request.Response;

Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TestModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  
  dummyRepository = moduleFixture.get<DummyUsersRepository>(UsersRepository);
});

After(async () => {
  if (dummyRepository) {
    await dummyRepository.clearAll();
  }
  await app.close();
});

Given('que existe un usuario con el correo {string}', async (email: string) => {
  await dummyRepository.create({
    email,
    password: 'somehashedpassword'
  });
});

Given('que no existe un usuario con el correo {string}', async (email: string) => {
  // No necesitamos hacer nada aquí ya que el repositorio dummy comienza vacío
  // y el clearAll() en el After asegura que esté limpio para cada test
});

When('intento registrarme con los siguientes datos:', async function(this: CustomWorld, dataTable: any) {
  const userData = dataTable.hashes()[0];
  response = await request(app.getHttpServer())
    .post('/auth/register')
    .send(userData);
  this.response = response.body;
  this.error = response.status !== 200 ? response.body : undefined;
});

Then('debería recibir una respuesta exitosa', function(this: CustomWorld) {
  expect(this.response).to.exist;
});

Then('la respuesta debería contener un token JWT', function(this: CustomWorld) {
  expect(this.response.token).to.exist;
  expect(typeof this.response.token).to.equal('string');
});

Then('la respuesta debería contener los datos del usuario sin la contraseña', function(this: CustomWorld) {
  expect(this.response.user).to.exist;
  expect(this.response.user.email).to.exist;
  expect(this.response.user.password).to.be.undefined;
});

Then('debería recibir un error de conflicto', async () => {
  expect(response.status).to.equal(409);
  expect(response.body.message).to.equal('El email ya está registrado');
});

Then('el mensaje de error debería ser {string}', function(this: CustomWorld, message: string) {
  expect(this.error.message).to.equal(message);
}); 