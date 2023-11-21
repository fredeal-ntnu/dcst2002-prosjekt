import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { Answer_Content, answerService } from '../../src/service/answer_services';

const testAnswers: Answer_Content[] = [
  {
    answer_id: 1,
    text: 'Dette er et svar 1',
    confirmed_answer: false,
    last_updated: new Date('2022-03-25'),
    question_id: 1,
    user_id: 1,
  },
  {
    answer_id: 2,
    text: 'Dette er et svar 2',
    confirmed_answer: false,
    last_updated: new Date('2023-03-25'),
    question_id: 1,
    user_id: 1,
  },
  {
    answer_id: 3,
    text: 'Dette er et svar 3',
    confirmed_answer: false,
    last_updated: new Date('2022-08-22'),
    question_id: 2,
    user_id: 2,
  },
];

axios.defaults.baseURL = 'http://localhost:3006/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3006, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE Answers', (error) => {
    if (error) return done.fail(error);

    answerService
      .createAnswer(testAnswers[0].text, testAnswers[0].question_id, testAnswers[0].user_id)
      .then(() =>
        answerService.createAnswer(
          testAnswers[1].text,
          testAnswers[1].question_id,
          testAnswers[1].user_id,
        ),
      )
      .then(() =>
        answerService.createAnswer(
          testAnswers[2].text,
          testAnswers[2].question_id,
          testAnswers[2].user_id,
        ),
      )
      .then(() => done());
  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Answer Routes - Successful Requests (Code 200)', () => {
  test('GET /questions/:id/answers - Retrieve all answers for a question', (done) => {
    const questionId = 1;
    axios
      .get(`/questions/${questionId}/answers`)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done(error));
  });

  test('GET /answers/:id - Retrieve a specific answer by ID', (done) => {
    axios.get(`/answers/${testAnswers[0].answer_id}`).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toHaveProperty('text');
      done();
    });
  });

  test('GET /questions/:id/answer/votes - Retrieve votes for answers to a question', (done) => {
    const questionId = 1;
    axios.get(`/questions/${questionId}/answer/votes`).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  test('POST /questions/:id/answers - Create a new answer', (done) => {
    const questionId = 3;
    const newAnswerText = 'This is a new answer.';
    const postData = {
      text: newAnswerText,
      question_id: questionId,
      user_id: 1,
    };
    axios.post(`/questions/${questionId}/answers`, postData).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual({ id: 4 });
      done();
    });
  });

  test('PUT /answers/:id - Update an answer', (done) => {
    const updatedAnswerText = 'This is an updated answer.';
    const putData = {
      answer_id: 1,
      text: updatedAnswerText,
      confirmed_answer: false,
      last_updated: new Date('2022-03-25'),
      question_id: 1,
      user_id: 1,
    };
    axios.put('/answers', putData).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });

  test('DELETE /answers/:id - Delete an answer', (done) => {
    const answerId = 1;
    axios.delete(`/answers/${answerId}`).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});

describe('Answer Routes - Error Handling (Code 500)', () => {
  test('GET /answers/:id - Handle error for non-existing answer', (done) => {
    const answerId = 9999;
    axios.get(`/answers/${answerId}`).catch((error) => {
      expect(error.response.status).toEqual(500);
      done();
    });
  });

  test('POST /questions/:id/answers - Handle error for invalid answer creation', (done) => {
    const questionId = 3;
    const postData = {
      text: 3,
      question_id: questionId,
      user_id: 1,
    };
    axios.post(`/questions/${questionId}/answers`, postData).catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data).toEqual('Missing required properties');
      done();
    });
  });

  test('PUT /answers/:id - Handle error for invalid answer update', (done) => {
    const answerId = 1;
    const putData = {
      answer_id: answerId,
      text: '',
      confirmed_answer: false,
      last_updated: new Date('2022-03-25'),
      question_id: 1,
      user_id: 1,
    };
    axios.put('/answers', putData).catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data).toEqual('Missing answer properties');
      done();
    });
  });
});
