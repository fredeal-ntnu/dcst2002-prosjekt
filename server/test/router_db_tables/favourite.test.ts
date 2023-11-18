import axios from 'axios';
import pool from '../../src/mysql-pool';
import app from '../../src/app';
import { Favourite_Content, favouriteService } from '../../src/service/favourite_services';

// Test data for favorites
const testFavorites: Favourite_Content[] = [
  { answer_id: 1, user_id: 1 },
  { answer_id: 1, user_id: 2 },
  { answer_id: 2, user_id: 2 },
];

axios.defaults.baseURL = 'http://localhost:3009/api/v2';
  
  let webServer: any;
  beforeAll((done) => {
    webServer = app.listen(3009, () => done());
  });

beforeEach((done) => {
    pool.query('TRUNCATE TABLE answer_user_favourite', (error) => {
      if (error) return done.fail(error);

        //Hei ingrid, byttet navn på disse fordi dette navnet gir mer mening
      favouriteService.handleFavouriteRelation(testFavorites[0].answer_id, testFavorites[0].user_id)
        .then(() => favouriteService.handleFavouriteRelation(testFavorites[1].answer_id, testFavorites[1].user_id))
        .then(() => favouriteService.handleFavouriteRelation(testFavorites[2].answer_id, testFavorites[2].user_id))
        .then(() => done())
    });
});

afterAll((done) => {
    if (!webServer) return done.fail(new Error());
    webServer.close(() => pool.end(() => done()));
  });

  describe('Favourite Routes', () => {
    test('GET /users/:id/favourites - retrieve all favourites for a user', (done) => {
      const userId = 1;
      axios.get(`/users/${userId}/favourites`)
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testFavorites.filter((favourite) => favourite.user_id === userId));
          done();
        })
    });

    test('GET (500) /users/:id/favourites - user does not exist', (done) => {
        const userId = 999;
        axios.get(`/users/${userId}/favourites`)
            .catch((error) => {
            expect(error.response.status).toEqual(500);
            expect(error.response.data).toEqual('No favourite found');
            done();
            })
        });
  
    test.skip('POST /users/:userId/favourites/:answerId - create a new favourite relation', (done) => {
      const userId = 3;
      const answerId = 3;
      const newFavouriteData = { user_id: userId, answer_id: answerId };
      axios.post(`/users/${userId}/favourites/${answerId}`, newFavouriteData)
        .then((response) => {
          expect(response.status).toEqual(200);
          // Check the response to confirm creation
          done();
        })
        .catch((error) => done.fail(error));
    });
  
    test('GET /favourites - get a list of all favourite relations', (done) => {
      axios.get('/favourites')
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.data).toEqual(testFavorites);
          done();
        })
    });
  
    test('GET /favourites/:id - get favourite relation by answer id', (done) => {
      const answerId = 1;
      axios.get(`/favourites/${answerId}`)
        .then((response) => {
          expect(response.status).toEqual(200);
          // Check the response data structure
          done();
        })
    });

    test('GET ERROR (500) /favourites/:id - Get non existing favourite', (done) => {
        const answerId = 99;
        axios.get(`/favourites/${answerId}`)
            .catch((error) => {
            expect(error.response.status).toEqual(500);
            expect(error.response.data).toEqual('No favourite found');
            done();
            });
        });
  
    test('DELETE /favourites/:id - delete favourite relation by answer id', (done) => {
      const userId = 1;
      const answerId = 1;
      axios.delete(`/favourites/${answerId}`, {data: testFavorites[0]})
        .then((response) => {
          expect(response.status).toEqual(200);
          done();
        })
    });
    describe('second batch Favourite Routes', () => {
      
        test('POST /users/:userId/favourites/:answerId - delete by trying to create duplicate', (done) => {
            const userId = 1;
            const answerId = 1;
            const newFavouriteData = { user_id: userId, answer_id: answerId };
            axios.post(`/users/${userId}/favourites/${answerId}`, newFavouriteData)
                .then((response) => {
                    expect(response.status).toEqual(200);
                    // Check the response to confirm deletion
                    done();
                })
        });
      
        test('POST ERROR /users/:userId/favourites/:answerId - attempt to create favourite with invalid data', (done) => {
          const invalidData = { answer_id: 'invalid', user_id: 'invalid' }; // Invalid data types for IDs
          axios.post('/users/invalid/favourites/invalid', invalidData)
            .catch((error) => {
              expect(error.response.status).toEqual(400); // Bad request for invalid data
              done();
            });
        });
      
        test('DELETE ERROR /favourites/:id - attempt to delete non-existent favourite relation', (done) => {
          const nonExistentUserId = 999; // Non-existent user ID
          const nonExistentAnswerId = 999; // Non-existent answer ID
          axios.delete(`/favourites/${nonExistentAnswerId}`, { data: { user_id: nonExistentUserId, answer_id: nonExistentAnswerId } })
            .then(() => {
              done.fail('Non-existent favourite should not be deleted');
            })
            .catch((error) => {
              expect(error.response.status).toEqual(500);
              done();
            });
        });

        test('DELETE ERROR (400) /favourites/:id - attempt to delete favourite relation with invalid data', (done) => {
            const invalidData = { answer_id: 'hei', user_id: 1 }; 
            axios.delete('/favourites/1', { data: invalidData })
              .catch((error) => {
                expect(error.response.status).toEqual(400); // Bad request for invalid data
                done();
              });
          });
      
      });
    });      