// SKAL VÆRE GOOD I HVERT FALL MED QUESTIONS
import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { Answer_Content, answerService } from '../../src/service/answer_services';
import e from 'express';

// NEW ANSWER 
// CREATE TABLE Answers (
//   answer_id INT PRIMARY KEY AUTO_INCREMENT,
//   text VARCHAR(255) NOT NULL,
//   confirmed_answer BOOLEAN DEFAULT FALSE,
//   last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   question_id INT NOT NULL,
//   user_id INT NOT NULL
// )ENGINE=InnoDB;

// CREATE TEST ANSWERS  

const testAnswers = [
  { answer_id: 1, text: 'Dette er et svar 1', confirmed_answer: false, last_updated: new Date("2022-03-25"), question_id: 1, user_id: 1 },
  { answer_id: 2, text: 'Dette er et svar 2', confirmed_answer: false, last_updated: new Date("2023-03-25"), question_id: 1, user_id: 1 },
  { answer_id: 3, text: 'Dette er et svar 3', confirmed_answer: false, last_updated: new Date("2022-08-22"), question_id: 2, user_id: 2 },
]

axios.defaults.baseURL = 'http://localhost:3006/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3006, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE Answers', (error) => {
    if (error) return done.fail(error);
    
    // Insert test answers into the database
    answerService.createAnswer(testAnswers[0].text, testAnswers[0].question_id, testAnswers[0].user_id)
        .then(() => answerService.createAnswer(testAnswers[1].text, testAnswers[1].question_id, testAnswers[1].user_id))
        .then(() => answerService.createAnswer(testAnswers[2].text, testAnswers[2].question_id, testAnswers[2].user_id))
        .then(() => done());
  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Answer Routes', () => {
    test('Get all answers by question ID (200 OK)', (done) => {
      const questionId = 1;
      axios.get(`/questions/${questionId}/answers`)
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
        .catch((error) => done(error));
    });

// get answer by answer id
    test('GET (200) /answers/:id', (done) => {
        axios.get(`/answers/${testAnswers[0].answer_id}`)
          .then((response) => {
            expect(response.status).toEqual(200);
            expect(response.data).toHaveProperty('text');
            done();
          })
      });

// get answer by non-existing id
    test('GET (500) /answers/:id', (done) => {
      const answerId = 9999;
        axios.get(`/answers/${answerId}`)
          .catch((error) => {
            expect(error.response.status).toEqual(500);
            done();
          });
      });


// get all votes for all answers to a specific question
    test('GET (200) /questions/:id/answer/votes', (done) => {
        const questionId = 1;
        axios.get(`/questions/${questionId}/answer/votes`)
          .then((response) => {
            expect(response.status).toEqual(200);
            done();
          })
      });
    
    test('Create new answer (200 OK)', (done) => {
      const questionId = 3; // Assuming you want to post to a new question ID
      const newAnswerText = 'This is a new answer.';
      const postData = {
        text: newAnswerText,
        question_id: questionId,
        user_id: 1 
      };
      axios.post(`/questions/${questionId}/answers`, postData)
        .then((response) => {
          expect(response.status).toEqual(200);
          // Check that the response contains the ID of the new answer
          expect(response.data).toEqual({ id: 4 });
          done();
        })
    });
// this fixed serializing error, use line from .catch and put done('some message')
    test('Create new answer (400 Bad Request)', (done) => {
        const questionId = 3;
        const postData = {
            text: 3,
            question_id: questionId,
            user_id: 1
        };
        axios.post(`/questions/${questionId}/answers`, postData)
            .catch((error) => {
                expect(error.response.status).toEqual(400);
                expect(error.response.data).toEqual('Missing required properties');
                done();
              });
            
        });
  
    test('Update answer (200 OK)', (done) => {
        const updatedAnswerText = 'This is an updated answer.';
        const putData = {
            answer_id: 1,
            text: updatedAnswerText,
            confirmed_answer: false,
            last_updated: new Date("2022-03-25"),
            question_id: 1,
            user_id: 1
        };
        axios.put('/answers', putData)
            .then((response) => {
            expect(response.status).toEqual(200);
            done();
            })
        });

    test('Update answer (400 Bad Request)', (done) => {
        const answerId = 1; // Assuming this answer ID exists
        const putData = {
            answer_id: answerId,
            text: '',
            confirmed_answer: false,
            last_updated: new Date("2022-03-25"),
            question_id: 1,
            user_id: 1
        };
        axios.put('/answers', putData)
            .catch((error) => {
            expect(error.response.status).toEqual(400);
            expect(error.response.data).toEqual('Missing answer properties');
            done();
            });
        });

    test('Delete answer (200 OK)', (done) => {
        const answerId = 1;
        axios.delete(`/answers/${answerId}`)
            .then((response) => {
            expect(response.status).toEqual(200);
            done();
            })
        });
  });
  

