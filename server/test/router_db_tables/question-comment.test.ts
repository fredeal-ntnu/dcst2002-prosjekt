import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import {
  questionCommentService,
  Question_Comment_Content,
} from '../../src/service/question-comment_services';

const testQuestionComments: Question_Comment_Content[] = [
  {
    question_comment_id: 1,
    text: 'This is a comment for question 1 by user 1',
    question_id: 1,
    user_id: 1,
  },
  {
    question_comment_id: 2,
    text: 'This is another comment for question 1 by user 2',
    question_id: 1,
    user_id: 2,
  },
  {
    question_comment_id: 3,
    text: 'This is a comment for question 2 by user 2',
    question_id: 2,
    user_id: 2,
  },
];

axios.defaults.baseURL = 'http://localhost:3007/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3007, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE Question_comments', (error) => {
    if (error) return done.fail(error);

    questionCommentService
      .createQuestionComment(
        testQuestionComments[0].text,
        testQuestionComments[0].question_id,
        testQuestionComments[0].user_id,
      )
      .then(() =>
        questionCommentService.createQuestionComment(
          testQuestionComments[1].text,
          testQuestionComments[1].question_id,
          testQuestionComments[1].user_id,
        ),
      )
      .then(() =>
        questionCommentService.createQuestionComment(
          testQuestionComments[2].text,
          testQuestionComments[2].question_id,
          testQuestionComments[2].user_id,
        ),
      )
      .then(() => done());
  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Question Comment Routes - Successful Requests (Code 200)', () => {
  test('GET /questions/:questionId/comments - Retrieve all comments for a question', (done) => {
    const questionId = 1;
    axios
      .get(`/questions/${questionId}/comments`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ text: expect.any(String), question_id: questionId }),
          ]),
        );
        done();
      })
      .catch((error) => done.fail(error));
  });

  test('GET /comments/:id - Retrieve a specific question comment by ID', (done) => {
    const commentId = 1;
    axios
      .get(`/comments/${commentId}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toHaveProperty('question_comment_id', commentId);
        done();
      })
      .catch((error) => done.fail(error));
  });

  test('POST /questions/:questionId/comments - Create a new question comment', (done) => {
    const questionId = 1;
    const newCommentData = { text: 'New comment', question_id: questionId, user_id: 1 };
    axios
      .post(`/questions/${questionId}/comments`, newCommentData)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toHaveProperty('id');
        done();
      })
      .catch((error) => done.fail(error));
  });

  test('DELETE /comments/:id - Delete a question comment', (done) => {
    const commentId = 1;
    axios.delete(`/comments/${commentId}`).then((response) => {
      expect(response.status).toEqual(200);
      questionCommentService
        .getQuestionCommentById(commentId)
        .then(() => done.fail('Comment should have been deleted'))
        .catch(() => done());
    });
  });

  test('PUT /comments - Update a question comment', (done) => {
    const commentId = 1;
    const updatedCommentData = { text: 'Updated comment', question_comment_id: commentId };
    axios
      .put(`/comments`, updatedCommentData)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch((error) => done.fail(error));
  });
});

describe('Question Comment Routes - Error Handling (Code 500)', () => {
  test('DELETE /comments/:id - Delete non-existing answer comment', (done) => {
    const commentId = 99;
    axios.delete(`/comments/${commentId}`).catch((error) => {
      expect(error.response.status).toEqual(500);
      expect(error.response.data).toEqual('No row deleted');
      done();
    });
  });

  test('POST /questions/:questionId/comments - Invalid input', (done) => {
    const questionId = 1;
    const invalidCommentData = {};
    axios.post(`/questions/${questionId}/comments`, invalidCommentData).catch((error) => {
      expect(error.response.status).toEqual(400);
      expect(error.response.data).toContain('Missing question comment properties');
      done();
    });
  });
});
