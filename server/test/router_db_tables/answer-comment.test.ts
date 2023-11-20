// DENNE ER FUCKED
import axios from 'axios';
import pool from '../../src/mysql-pool'; 
import app from '../../src/app';
import { Answer_Comment_Content, answerCommentService } from '../../src/service/answer-comment_services';


 const testAnswerComments: Answer_Comment_Content[] = [
    {answer_comment_id: 1, text: 'Dette er kommentar på et svar 1 med id 1', answer_id: 1, user_id: 1},
    {answer_comment_id: 2, text: 'Dette er kommentar på et svar 1 med id 2', answer_id: 1, user_id: 2},
    {answer_comment_id: 3, text: 'Dette er kommentar på et svar 2 med id 3', answer_id: 2, user_id: 2},
  ];
  ''
  axios.defaults.baseURL = 'http://localhost:3005/api/v2';
  
  let webServer: any;
  beforeAll((done) => {
    webServer = app.listen(3005, () => done());
  });
  
  beforeEach((done) => {
    pool.query('TRUNCATE TABLE Answer_comments', (error) => {
      if (error) return done.fail(error);
      
      answerCommentService.createAnswerComment(testAnswerComments[0].text, testAnswerComments[0].answer_id, testAnswerComments[0].user_id)
            .then(() => answerCommentService.createAnswerComment(testAnswerComments[1].text, testAnswerComments[1].answer_id, testAnswerComments[1].user_id))
            .then(() => answerCommentService.createAnswerComment(testAnswerComments[2].text, testAnswerComments[2].answer_id, testAnswerComments[2].user_id))
            .then(() => done());
    });
  });
  
  afterAll((done) => {
    if (!webServer) return done.fail(new Error());
    webServer.close(() => pool.end(() => done()));
  });
  
  describe('Answer Comment Routes', () => {
    test('GET /answers/:id/comments - retrieve all comments for an answer', (done) => {
      const answerId = 1; // Assuming this answer ID exists in your test database
      axios.get(`/answers/${answerId}/comments`)
        .then((response) => {
          expect(response.status).toEqual(200);
          // Expect the response to match an array of comments
          done();
        })
    });
  
    test('POST /answer/:id/comments - create a new answer comment', (done) => {
      const answerId = 1; // Assuming this answer ID exists
      const newCommentData = { text: 'New comment', answer_id: 5, user_id: 5 };
      axios.post(`/answer/${answerId}/comments`, newCommentData)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toHaveProperty('id');
          done();
        })
    });
  
    test('GET /answer/comments/:id - retrieve a specific answer comment by id', (done) => {
      const commentId = 1; // Assuming this comment ID exists
      axios.get(`/answer/comments/${commentId}`)
        .then((response) => {
          expect(response.status).toEqual(200);
          // Expect the response to contain comment data
          done();
        })
        .catch((error) => {
          done(error);
        });
    });

    test('GET ERROR (500) /answer/comments/:id - Get non existing answer comment', (done) => {
        const commentId = 99;
        axios.get(`/answer/comments/${commentId}`)
            .catch((error) => {
            expect(error.response.status).toEqual(500);
            expect(error.response.data).toEqual('No answer comment found');
            done();
            });
        });
  
    test('DELETE /answer/comments/:id - delete an answer comment', (done) => {
      const commentId = 1; // Assuming this comment ID exists
      axios.delete(`/answer/comments/${commentId}`)
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });

    test('DELETE ERROR (500) /answer/comments/:id - delete non existing answer comment', (done) => {
        const commentId = 99;
        axios.delete(`/answer/comments/${commentId}`)
            .catch((error) => {
            expect(error.response.status).toEqual(500);
            expect(error.response.data).toEqual('No row deleted');
            done();
            });
        });
  
    test('PUT /comments/:id - update an answer comment', (done) => {
      const answerId = 1; // Assuming this answer ID exists
      const commentId = 1; // Assuming this comment ID exists
      const updateData = { answer_comment_id: commentId, text: 'Updated comment', answer_id: answerId };
      axios.put(`/comments/${commentId}`, updateData)
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
    });
  
    //post missing answer comment properties
    test('POST ERROR (400) /answer/:id/comments', (done) => {
      const answerId = 1;
      const incompleteCommentData = {}; // Missing text
      axios.post(`/answer/${answerId}/comments`, incompleteCommentData)
        .catch((error) => {
          expect(error.response.status).toEqual(400);
          expect(error.response.data).toEqual('Missing answer comment properties');
          done();
        });
    });
});
  