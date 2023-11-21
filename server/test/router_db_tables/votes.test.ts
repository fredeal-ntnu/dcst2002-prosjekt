import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { Vote_Content, voteService } from '../../src/service/vote_services';

// Test data for votes
const testVotes: Vote_Content[] = [
  { user_id: 1, answer_id: 1, vote_type: true },
  { user_id: 2, answer_id: 1, vote_type: false },
  { user_id: 3, answer_id: 1, vote_type: true },
];

axios.defaults.baseURL = 'http://localhost:3004/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3004, () => done());
});

beforeEach((done) => {
  pool.query('TRUNCATE TABLE Votes', (error) => {
    if (error) return done.fail(error);

    // Insert test votes into the database
    voteService
      .createVote(testVotes[0].user_id, testVotes[0].answer_id, testVotes[0].vote_type)
      .then(() =>
        voteService.createVote(
          testVotes[1].user_id,
          testVotes[1].answer_id,
          testVotes[1].vote_type,
        ),
      )
      .then(() =>
        voteService.createVote(
          testVotes[2].user_id,
          testVotes[2].answer_id,
          testVotes[2].vote_type,
        ),
      )
      .then(() => done());
  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Vote Routes - Successful Requests (Code 200)', () => {
  test('GET /answers/:id/votes - Retrieve all votes for an answer', (done) => {
    const answerId = 1;
    axios.get(`/answers/${answerId}/votes`).then((response) => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(testVotes);
      done();
    });
  });

  test('POST Positive vote /answers/:id/votes - Create a positive vote', (done) => {
    const answerId = 1;
    const voteData = { user_id: 1, answer_id: answerId, vote_type: true };
    axios.post(`/answers/${answerId}/votes`, voteData).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});

describe('Vote Routes - Error Handling (Code 500)', () => {
  test('GET /answers/:id/votes - Retrieve votes for an answer with no votes', (done) => {
    const answerId = 2;
    axios.get(`/answers/${answerId}/votes`).catch((error) => {
      expect(error.response.status).toEqual(500);
      expect(error.response.data).toEqual('Votes not found');
      done();
    });
  });

  test('POST /vote - Attempt to create a vote with missing properties', (done) => {
    const incompleteVoteData = { user_id: 1, answer_id: 1 };
    axios.post('/vote', incompleteVoteData).catch((error) => {
      expect(error.response.status).toEqual(400);
      done();
    });
  });

  test('POST /answers/:id/votes - Attempt to create a positive vote with missing properties', (done) => {
    const answerId = 1;
    const incompleteVoteData = { user_id: 1, answer_id: answerId };
    axios.post(`/answers/${answerId}/votes`, incompleteVoteData).catch((error) => {
      expect(error.response.status).toEqual(400);
      done();
    });
  });
});
