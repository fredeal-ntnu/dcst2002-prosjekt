// userRoutes.test.js

import axios from 'axios';
import pool from '../../src/mysql-pool'; 
import app from '../../src/app';
import { userService, User } from '../../src/service/user_services';
import { questionService, Question_Content } from '../../src/service/question_services';

// Test data
const testUsers: User[] = [
    {user_id: 1, google_id: 'somethinglonghere1', username: 'test1', email: 'something@test1.com'},
    {user_id: 2, google_id: 'somethinglonghere2', username: 'test2', email: 'something@test2.com'},
    {user_id: 3, google_id: 'somethinglonghere3', username: 'test3', email: 'something@test3.com'}
];

const testQuestions: Question_Content[] = [
    {question_id: 1, title: 'Test1', text: 'Dette er test 1', view_count: 0, has_answer: false, user_id: 1},
    {question_id: 2, title: 'Test2', text: 'Dette er test 2', view_count: 0, has_answer: false, user_id: 2},
    {question_id: 3, title: 'Test3', text: 'Dette er test 3', view_count: 0, has_answer: false, user_id: 1},
];

axios.defaults.baseURL = 'http://localhost:3003/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3003, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE Users', (error) => {
    if (error) return done.fail(error);
    // Insert test users
    userService.create(testUsers[0])
        .then(() => userService.create(testUsers[1]))
        .then(() => userService.create(testUsers[2]))
        .then(() => done());
    });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

  test.skip('Fetch user by session (200 OK)', (done) => {
    axios.get('/user/me')
        .then((response) => {
            expect(response.status).toEqual(200);
            done();
        })
        .catch((error) => done(error));
    done();
  });

