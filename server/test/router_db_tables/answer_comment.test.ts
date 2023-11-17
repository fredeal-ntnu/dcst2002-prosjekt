import axios from 'axios';
import pool from '../../src/mysql-pool'; 
import app from '../../src/app';
import { Answer_Comment_Content, answerCommentService } from '../../src/service/answer-comment_services';


 const testAnswerComments: Answer_Comment_Content[] = [
    {answer_comment_id: 1, text: 'Dette er kommentar på et svar 1 med id 1', answer_id: 1},
    {answer_comment_id: 2, text: 'Dette er kommentar på et svar 1 med id 2', answer_id: 1},
    {answer_comment_id: 3, text: 'Dette er kommentar på et svar 2 med id 3', answer_id: 2},
  ];
  ''
  axios.defaults.baseURL = 'http://localhost:3005/api/v2';
  
  let webServer: any;
  beforeAll((done) => {
    webServer = app.listen(3005, () => done());
  });
  
  beforeEach((done) => {
    pool.query('TRUNCATE TABLE answer_comments', (error) => {
      if (error) return done.fail(error);
      
      answerCommentService.createAnswerComment(testAnswerComments[0].text, testAnswerComments[0].answer_id)
            .then(() => answerCommentService.createAnswerComment(testAnswerComments[1].text, testAnswerComments[1].answer_id))
            .then(() => answerCommentService.createAnswerComment(testAnswerComments[2].text, testAnswerComments[2].answer_id))
            .then(() => done());
      done();
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
  
    test('POST /answers/:id/comments - create a new answer comment', (done) => {
      const answerId = 1; // Assuming this answer ID exists
      const newCommentData = { text: 'New comment', answer_id: answerId };
      axios.post(`/answers/${answerId}/comments`, newCommentData)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toHaveProperty('id');
          done();
        })
        .catch((error) => {
          done(error);
        });
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
  
    test('PUT /answers/:id/comments/:id - update an answer comment', (done) => {
      const answerId = 1; // Assuming this answer ID exists
      const commentId = 1; // Assuming this comment ID exists
      const updateData = { answer_comment_id: commentId, text: 'Updated comment', answer_id: answerId };
      axios.put(`/answers/${answerId}/comments/${commentId}`, updateData)
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  
    // Add more tests for each scenario and endpoint as needed...
  });
  