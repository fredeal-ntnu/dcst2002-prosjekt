// DENNE ER GOOD MED QUESTION OG ANSWER
import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { tagService } from '../../src/service/tag_services';

const testTags = [
    { tag_id: 1, name: 'JavaScript' },
    { tag_id: 2, name: 'Node.js' },
    { tag_id: 3, name: 'Express' },
];

axios.defaults.baseURL = 'http://localhost:3002/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3002, () => done());
});

beforeEach((done) => {
    // Delete all tags, and reset id auto-increment start value
  pool.query('TRUNCATE TABLE Tags', (error) => {
    if (error) return done.fail(error);
    
    tagService 
    .createTag(testTags[0].name)
    .then(() => tagService.createTag(testTags[1].name)) 
    .then(() => tagService.createTag(testTags[2].name)) 
    .then(() => done());

  });
});

afterAll((done) => {
  if (!webServer) return done.fail(new Error());
  webServer.close(() => pool.end(() => done()));
});

describe('Fetch tags', () => {
  test('Fetch single tag by ID (200 OK)', (done) => {
    axios.get('/tags/1')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testTags[0]);
        done();
      })
      .catch((error) => done(error));
  });

  test('Fetch tag by non-existing ID (404 Not Found)', (done) => {
    axios.get('/tags/9999')
      .catch((error) => {
        expect(error.response.status).toEqual(500);
        done();
      });
  });

  test('Fetch all tags (200 OK)', (done) => {
    axios.get('/tags')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testTags);
        done();
      })
  });

});
