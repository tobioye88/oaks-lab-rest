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

  it('/v1/tasks/:id (PATCH)', async () => {
    const response = await request(app.getHttpServer())
      .patch('/v1/tasks/1')
      .send(patchTaskPayload)
      .expect(200);

    expect(response.body.data.title).toBe(patchTaskPayload.title);
  });

  it('/v1/tasks/:id/task-step (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put('/v1/tasks/1/task-step')
      .send(putTaskStepPayload)
      .expect(200);
    console.log(response.body.data.step);
    expect(response.body.data.steps[0].name).toBe(putTaskStepPayload.name);
  });

  it('/v1/tasks/:id/task-step (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/tasks/1/task-step')
      .send(addTaskStepPayload)
      .expect(201);
    const expectedLastStep =
      response.body.data.steps[response.body.data.steps.length - 1];
    expect(expectedLastStep.name).toBe(addTaskStepPayload.name);
  });

  it('/v1/tasks/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer())
      .delete('/v1/tasks/1')
      .expect(200);
    expect(response.body.data).toEqual(testResponse.data[0]);
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
          id: 2,
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
const putTaskStepPayload = {
  id: 1,
  name: 'Second Task, First Step --updated',
  isDone: false,
};
const addTaskStepPayload = {
  name: 'New Task',
  isDone: false,
};
