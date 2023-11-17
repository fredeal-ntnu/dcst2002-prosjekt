import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { Favourite_Content, favouriteService } from '../../src/service/favourite_services';

// Test data for favorites
const testFavorites: Favourite_Content[] = [
  { question_id: 1, user_id: 1 },
  { question_id: 1, user_id: 2 },
  { question_id: 2, user_id: 2 },
];

axios.defaults.baseURL = 'http://localhost:3008/api/v2';

let webServer: any;
beforeAll((done) => {
  webServer = app.listen(3008, () => done());
});

beforeEach((done) => {
    pool.query('TRUNCATE TABLE question_user_favourite', (error) => {
      if (error) return done.fail(error);

      favouriteService.createFavouriteRelation(testFavorites[0].question_id, testFavorites[0].user_id)
        .then(() => favouriteService.createFavouriteRelation(testFavorites[1].question_id, testFavorites[1].user_id))
        .then(() => favouriteService.createFavouriteRelation(testFavorites[2].question_id, testFavorites[2].user_id))
        .then(() => done())
    });
});

afterAll((done) => {
  webServer.close(() => done());
});

describe('Favorite Routes', () => {
    test('GET /users/:id/favourites - retrieve all favorites for a user', (done) => {
      const userId = 1; // Use a valid user ID from your test data
      axios.get(`/users/${userId}/favourites`)
        .then((response) => {
          expect(response.status).toBe(200);
          // Check for the structure of the response data
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  
    test('POST /users/:id/favourites/:id - create a new favourite relation', (done) => {
      const userId = 1; // Use a valid user ID from your test data
      const questionId = 1; // Use a valid question ID from your test data
      const postData = { answer_id: questionId, user_id: userId };
      axios.post(`/users/${userId}/favourites/${questionId}`, postData)
        .then((response) => {
          expect(response.status).toBe(200);
          // Additional checks can be done here
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  
    test('GET /favourites - get a list of all favourite relations', (done) => {
      axios.get('/favourites')
        .then((response) => {
          expect(response.status).toBe(200);
          // Check for the structure of the response data
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  
    test('GET /favourites/:id - get favourite relation by question id', (done) => {
      const questionId = 1; // Use a valid question ID from your test data
      axios.get(`/favourites/${questionId}`)
        .then((response) => {
          expect(response.status).toBe(200);
          // Check for the structure of the response data
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  
    test('DELETE /favourites/:id - delete favourite relation by question id and user id', (done) => {
      const userId = 1; // Use a valid user ID from your test data
      const questionId = 1; // Use a valid question ID from your test data
      const deleteData = { user_id: userId, question_id: questionId };
      axios.delete(`/favourites/${questionId}`, { data: deleteData })
        .then((response) => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((error) => {
          done(error);
        });
    });
  
    // ...add any additional tests for error cases and invalid inputs
  });