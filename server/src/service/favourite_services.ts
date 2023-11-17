import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Favourite_Content = {
    answer_id: number;
    user_id: number;
};



class Service {

    //get all favourites for user
    getAllFavouritesForUser(user_id: number) {
        return new Promise<Favourite_Content[]>((resolve, reject) => {
            pool.query(
            'SELECT * FROM answer_user_favourite WHERE user_id = ?',
            [user_id],
            (error, results: RowDataPacket[]) => {
                if (error) return reject(error);
                if (results.length === 0) return reject('No favourite found');
                
                resolve(results as Favourite_Content[]);
            },
            );
        });
    }



    //get all favourites by answer id
    getAllFavouritesByAnswerId(answer_id: number) {
        return new Promise<Favourite_Content[]>((resolve, reject) => {
            pool.query(
            'SELECT * FROM answer_user_favourite WHERE answer_id = ?',
            [answer_id],
            (error, results: RowDataPacket[]) => {
                if (error) return reject(error);
                if (results.length === 0) return reject('No favourite found');

                resolve(results as Favourite_Content[]);
            },
            );
        });
    }

    // denne kunne med fordel vært en post, delete og en get, istedenfor at post kan resultere i både delete, insert og get
    // Dette må i så fall fikses lenger oppe. Fikse om vi har tid
    //create favourite relation with answerid and userid
    createFavouriteRelation(answer_id: number, user_id: number) {
      return new Promise<void>((resolve, reject) => {
          pool.query(
              'SELECT * FROM answer_user_favourite WHERE answer_id = ? AND user_id = ?',
              [answer_id, user_id],
              (selectError, results) => {
                  if (selectError) {
                      return reject(selectError);
                  }
  
                if ((results as RowDataPacket[]).length === 0) {
                      // If no matching row exists, insert a new one
                      pool.query(
                          'INSERT INTO answer_user_favourite (answer_id, user_id) VALUES (?, ?)',
                          [answer_id, user_id],
                          (insertError) => {
                              if (insertError) {
                                  return reject(insertError);
                              }
                              resolve();
                          }
                      );
                  } else {
                      // If a matching row exists, delete it
                      pool.query(
                          'DELETE FROM answer_user_favourite WHERE answer_id = ? AND user_id = ?',
                          [answer_id, user_id],
                          (deleteError) => {
                              if (deleteError) return reject(deleteError);

                              resolve();
                          }
                      );
                  }
              }
          );
      });
  }
  


    //get all favourite relations
    getAllFavouriteRelations() {
        return new Promise<Favourite_Content[]>((resolve, reject) => {
            pool.query('SELECT * FROM answer_user_favourite', (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results as Favourite_Content[]);
            });
        });
    }



    //delete favourite relation with answerid and userid
    deleteFavouriteRelation(answer_id: number, user_id: number) {
        return new Promise<void>((resolve, reject) => {
            pool.query('DELETE FROM answer_user_favourite WHERE answer_id=? AND user_id=?', [answer_id, user_id], (error, response: ResultSetHeader) => {
            if (error) return reject(error);
            if (response.affectedRows == 0) return reject('No row deleted');

            resolve();
            });
        });
    }


}

export const favouriteService = new Service();
