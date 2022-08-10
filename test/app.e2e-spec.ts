import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/v1/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1/tasks')
      .expect(200)
      .expect(testResponse);
  });

  it('/v1/tasks (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/tasks')
      .send(createTestPayload)
      .expect(201);
    expect(response.body.data.id).toBeDefined();
  });

  it('/v1/tasks (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/v1/tasks/1')
      .send(patchTaskPayload)
      .expect(200);

    expect(response.body.data.title).toBe(patchTaskPayload.title);
  });
});

const testResponse = {
  data: [
    {
      id: 1,
      title: 'First Title',
      isDone: true,
      steps: [
        {
          id: 1,
          taskId: 1,
          name: 'First Step',
          isDone: true,
        },
        {
          id: 1,
          taskId: 1,
          name: 'Second Step',
          isDone: true,
        },
      ],
    },
  ],
  message: 'success',
};
const createTestPayload = {
  title: 'Second Task',
  steps: [
    {
      name: 'Second Task, First Step',
      isDone: false,
    },
    {
      name: 'Second Task, Second Step',
      isDone: false,
    },
  ],
};
const patchTaskPayload = {
  title: 'First Task Patched',
};
