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
    voteService.createVote(testVotes[0].user_id, testVotes[0].answer_id, testVotes[0].vote_type)
        .then(() => voteService.createVote(testVotes[1].user_id, testVotes[1].answer_id, testVotes[1].vote_type))
        .then(() => voteService.createVote(testVotes[2].user_id, testVotes[2].answer_id, testVotes[2].vote_type))
        .then(() => done());
  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe.skip('Vote Routes', () => {
  // Test fetching all votes for an answer
  test('Fetch all votes for an answer (200 OK)', (done) => {
    const answerId = 1; // Assuming this answer ID exists in your test database
    axios.get(`/answers/${answerId}/votes`)
      .then((response) => {
        expect(response.status).toEqual(200);
        // Expect the response to match an array of votes
        // You can add more specific checks on the response data here if necessary
        done();
      })
  });

  // Test fetching votes for an answer with no votes
  test('Fetch votes for an answer with no votes (200 OK)', (done) => {
    const answerId = 2; // Assuming this answer ID has no votes in your test database
    axios.get(`/answers/${answerId}/votes`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual([]); // Expect an empty array when no votes are found
        done();
      })
  });

  // Test creating a vote with correct properties
  test('Create a vote for an answer (200 OK)', (done) => {
    const answerId = 1; // Assuming this answer ID exists and can be voted on
    const voteData = { user_id: 1, answer_id: answerId, vote_type: true };
    axios.post(`/answers/${answerId}/votes`, voteData)
      .then((response) => {
        expect(response.status).toEqual(200);
        done();
      })
  });

  // Test creating a vote with missing properties
  test('Fail to create a vote with missing properties (400 Bad Request)', (done) => {
    const answerId = 1;
    const incompleteVoteData = {}; // Missing answer_id
    axios.post(`/answers/${answerId}/votes`, incompleteVoteData)
      .catch((error) => {
        expect(error.response.status).toEqual(400);
        done();
      });
  });
});

