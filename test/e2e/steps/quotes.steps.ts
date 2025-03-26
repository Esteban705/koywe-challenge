import { Before, After, Given, When, Then } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CustomWorld } from '../world/custom-world';
import { INestApplication } from '@nestjs/common';
import { TestModule } from '../test.module';
import { QuotesRepository } from '@/dal/quotes.repository';
import { DummyQuotesRepository } from '@/dal/dummy/quotes.repository.dummy';
import { expect } from 'chai';

let app: INestApplication;
let dummyRepository: DummyQuotesRepository;
let response: request.Response;
let userId: string;

Before(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [TestModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  
  dummyRepository = moduleFixture.get<DummyQuotesRepository>(QuotesRepository);
});

After(async () => {
  await app.close();
});

Given('que estoy registrado con los siguientes datos:', async (dataTable: any) => {
  const userData = dataTable.hashes()[0];
  const registerResponse = await request(app.getHttpServer())
    .post('/auth/register')
    .send(userData);
  
  userId = registerResponse.body.user._id;
});

Given('que estoy autenticado', async function(this: CustomWorld) {
  const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: 'test@test.com',
      password: 'Password123!'
    });
  
  this.authToken = loginResponse.body.access_token;
});

Given('que existe una cotización con id {string} para el usuario actual', async function(this: CustomWorld, id: string) {
  await dummyRepository.createQuote({
    amount: 100,
    from: 'USD',
    to: 'EUR',
    rate: 0.925,
    convertedAmount: 1110,
    timestamp: new Date(),
    expiresAt: new Date(Date.now() + 3600000), // 1 hora en el futuro
  }, userId);

});

When('intento crear una cotización con los siguientes datos:', async function(this: CustomWorld, dataTable: any) {
  const quoteData = dataTable.hashes()[0];
  response = await request(app.getHttpServer())
    .post('/quote')
    .set('Authorization', `Bearer ${this.authToken}`)
    .send(quoteData);
  
  this.response = response.body;
});

When('intento obtener la cotización {string}', async function(this: CustomWorld, id: string) {
  const quoteId = id
  response = await request(app.getHttpServer())
    .get(`/quote/${quoteId}`)
    .set('Authorization', `Bearer ${this.authToken}`)
    .send();
  
  this.response = response.body;
});

Then('debería recibir una cotización válida', function(this: CustomWorld) {
  expect(this.response).to.exist;
  expect(this.response.from).to.exist;
  expect(this.response.to).to.exist;
  expect(this.response.amount).to.exist;
  expect(this.response.rate).to.exist;
  expect(this.response.convertedAmount).to.exist;
  expect(this.response.timestamp).to.exist;
  expect(this.response.expiresAt).to.exist;
  
});

Then('debería recibir un error de cotización no encontrada', async () => {
  expect(response.status).to.equal(404);
  expect(response.body.message).to.equal('Cotización no encontrada o expirada');
}); 