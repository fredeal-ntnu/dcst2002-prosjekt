import axios from 'axios';
import pool from '../../src/mysql-pool'; 
import app from '../../src/app';
import { questionService, Question_Content } from '../../src/service/question_services';

const testQuestion: Question_Content[] = [
    {question_id: 1, title: 'Test1', text: 'Dette er test 1', view_count: 1, has_answer: 1, user_id: 1},
    {question_id: 2, title: 'Test2', text: 'Dette er test 2', view_count: 10, has_answer: 1, user_id: 1},
    {question_id: 3, title: 'Test3', text: 'Dette er test 3', view_count: 20, has_answer: 0, user_id: 2},
    {question_id: 4, title: 'Test4', text: 'Dette er test 4', view_count: 30, has_answer: 0, user_id: 3}
];

// Since API is not compatible with v1, API version is increased to v2
axios.defaults.baseURL = 'http://localhost:3001/api/v2';

let webServer: any;
beforeAll((done) => {
  // Use separate port for testing
  webServer = app.listen(3001, () => done());
});

beforeEach((done) => {
    // Delete all questions, and reset id auto-increment start value
    pool.query('TRUNCATE TABLE Tasks', (error) => {
      if (error) return done.fail(error);
  
      questionService
      .createQuestion(testQuestion[0].title, testQuestion[0].text, testQuestion[0].view_count)
      .then(() => questionService.createQuestion(testQuestion[1].title, testQuestion[1].text, testQuestion[1].view_count) // Create testTask[1] after testTask[0] has been created
      .then(() => questionService.createQuestion(testQuestion[2].title, testQuestion[2].text, testQuestion[2].view_count) // Create testTask[2] after testTask[1] has been created
      .then(() => done()); // Call done() after testTask[2] has been created
  });
  });

  // Stop web server and close connection to MySQL server
afterAll((done) => {
    if (!webServer) return done.fail(new Error());
    webServer.close(() => pool.end(() => done()));
  });