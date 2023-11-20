import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { questionCommentService, Question_Comment_Content } from '../../src/service/question-comment_services';

const testQuestionComments: Question_Comment_Content[] = [
    { question_comment_id: 1, text: 'This is a comment for question 1 by user 1', question_id: 1, user_id: 1 },
    { question_comment_id: 2, text: 'This is another comment for question 1 by user 2', question_id: 1, user_id: 2 },
    { question_comment_id: 3, text: 'This is a comment for question 2 by user 2', question_id: 2, user_id: 2 },
  ];

axios.defaults.baseURL = 'http://localhost:3007/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3007, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE Question_comments', (error) => {
    if (error) return done.fail(error);

    questionCommentService.createQuestionComment(testQuestionComments[0].text, testQuestionComments[0].question_id, testQuestionComments[0].user_id)
          .then(() => questionCommentService.createQuestionComment(testQuestionComments[1].text, testQuestionComments[1].question_id, testQuestionComments[1].user_id))
          .then(() => questionCommentService.createQuestionComment(testQuestionComments[2].text, testQuestionComments[2].question_id, testQuestionComments[2].user_id))
          .then(() => done());
  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Question Comment Routes', () => {
  test('GET /questions/:questionId/comments - retrieve all comments for a question', (done) => {
    const questionId = 1; // Assuming this question ID exists in your test database
    axios.get(`/questions/${questionId}/comments`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(expect.arrayContaining([
          expect.objectContaining({ text: expect.any(String), question_id: questionId }),
        ]));
        done();
      })
      .catch((error) => done.fail(error));
  });

  test('POST /questions/:questionId/comments - create a new question comment', (done) => {
    const questionId = 1; // Assuming this question ID exists
    const newCommentData = { text: 'New comment', question_id: questionId, user_id: 1 };
    axios.post(`/questions/${questionId}/comments`, newCommentData)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toHaveProperty('id');
        done();
      })
      .catch((error) => done.fail(error));
  });

  test('GET /comments/:id - retrieve a specific question comment by id', (done) => {
    const commentId = 1; // Assuming this comment ID exists
    axios.get(`/comments/${commentId}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toHaveProperty('question_comment_id', commentId);
        done();
      })
      .catch((error) => done.fail(error));
  });

  test('DELETE /comments/:id - delete a question comment', (done) => {
    const commentId = 1; // Assuming this comment ID exists
    axios.delete(`/comments/${commentId}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        // Check the database to ensure the deletion
        questionCommentService.getQuestionCommentById(commentId)
          .then(() => done.fail('Comment should have been deleted'))
          .catch(() => done()); // Expect an error since the comment should no longer exist
      })
  });

  test('DELETE ERROR (500) /comments/:id - delete a non-existing question comment', (done) => {
    const commentId = 99; // Assuming this comment ID does not exist
    axios.delete(`/comments/${commentId}`)
      .catch((error) => {
        expect(error.response.status).toEqual(500);
        expect(error.response.data).toEqual('No row deleted');
        done();
      });
  });

  test('PUT /comments - update a question comment', (done) => {
    const commentId = 1; 
    const updatedCommentData = { text: 'Updated comment', question_comment_id: commentId };
    axios.put(`/comments`, updatedCommentData)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done.fail(error));
  });

  test('POST ERROR (400) /questions/:questionId/comments - invalid input', (done) => {
    const questionId = 1; 
    const invalidCommentData = {}; 
    axios.post(`/questions/${questionId}/comments`, invalidCommentData)
      .catch((error) => {
        expect(error.response.status).toEqual(400);
        expect(error.response.data).toContain('Missing question comment properties');
        done();
    });
  });  
});