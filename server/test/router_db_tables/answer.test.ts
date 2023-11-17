import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { Answer_Content, answerService } from '../../src/service/answer_services';

const testAnswers: Answer_Content[] = [
    { answer_id: 1, text: 'Dette er et svar 1', confirmed_answer: false, last_edited: new Date("2022-03-25"), question_id: 1, user_id: 1 },
    { answer_id: 2, text: 'Dette er et svar 2', confirmed_answer: false, last_edited: new Date("2023-03-25"), question_id: 1, user_id: 1 },
    { answer_id: 3, text: 'Dette er et svar 3', confirmed_answer: false, last_edited: new Date("2022-08-22"), question_id: 2, user_id: 2 },
    ];

axios.defaults.baseURL = 'http://localhost:3005/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3005, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE Answers', (error) => {
    if (error) return done.fail(error);
    
    // Insert test answers into the database
    answerService.createAnswer(testAnswers[0].text, testAnswers[0].question_id)
        .then(() => answerService.createAnswer(testAnswers[1].text, testAnswers[1].question_id))
        .then(() => answerService.createAnswer(testAnswers[2].text, testAnswers[2].question_id))
        .then(() => done());
  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Answer Routes', () => {
  test('Get all answers by question ID (200 OK)', (done) => {
    const questionId = 1; // Replace with a valid question ID
    axios.get(`/questions/${questionId}/answers`)
      .then((response) => {
        expect(response.status).toEqual(200);
        // Perform additional checks on the response data if necessary
        done();
      })
      .catch((error) => done(error));
  });

  test('Get all favourite answers by user ID (200 OK)', (done) => {
    const userId = 1; // Replace with a valid user ID
    axios.get(`/user/${userId}/favourites`)
      .then((response) => {
        expect(response.status).toEqual(200);
        // Perform additional checks on the response data if necessary
        done();
      })
      .catch((error) => done(error));
  });

  test('Get answer by ID (200 OK)', (done) => {
    const answerId = 1; // Replace with a valid answer ID
    axios.get(`/answers/${answerId}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        // Perform additional checks on the response data if necessary
        done();
      })
      .catch((error) => {
        if (error.response) {
          expect(error.response.status).toEqual(404);
        }
        done(error);
      });
  });

  test('Create new answer (200 OK)', (done) => {
    const questionId = 1; // Replace with a valid question ID
    const postData = {
      text: 'Sample answer text',
      question_id: questionId
    };
    axios.post(`/questions/${questionId}/answers`, postData)
      .then((response) => {
        expect(response.status).toEqual(200);
        // Check for the existence of the answer ID in the response
        done();
      })
      .catch((error) => done(error));
  });

  test('Update answer (200 OK)', (done) => {
    const updateData = {
      answer_id: 1, // Replace with a valid answer ID
      text: 'Updated answer text',
      confirmed_answer: false,
      last_edited: new Date().toISOString(),
      question_id: 1, // Replace with
        user_id: 1 // Replace with
    };
    axios.put('/answers', updateData)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done(error));
    });
    });


