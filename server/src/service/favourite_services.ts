import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Favourite_Content = {
question_id: number;
user_id: number;
};



class Service {

    //get all favourites for user
    getAllFavouritesForUser(user_id: number) {
        return new Promise<Favourite_Content[]>((resolve, reject) => {
            pool.query(
            'SELECT * FROM question_user_favourites WHERE user_id = ?',
            [user_id],
            (error, results: RowDataPacket[]) => {
                if (error) return reject(error);
                
                resolve(results as Favourite_Content[]);
            },
            );
        });
    }



    //get all favourites by question id
    getAllFavouritesByQuestionId(question_id: number) {
        return new Promise<Favourite_Content[]>((resolve, reject) => {
            pool.query(
            'SELECT * FROM question_user_favourites WHERE question_id = ?',
            [question_id],
            (error, results: RowDataPacket[]) => {
                if (error) return reject(error);
    
                resolve(results as Favourite_Content[]);
            },
            );
        });
    }

    //create favourite relation with questionid and userid
    createFavouriteRelation(question_id: number, user_id: number) {
        return new Promise<ResultSetHeader>((resolve, reject) => {
            pool.query(
            'INSERT INTO question_user_favourites (question_id, user_id) VALUES (?, ?)',
            [question_id, user_id],
            (error, result: ResultSetHeader) => {
                if (error) return reject(error);
    
                resolve(result);
            },
            );
        });
    }


    //get all favourite relations
    getAllFavouriteRelations() {
        return new Promise<Favourite_Content[]>((resolve, reject) => {
            pool.query('SELECT * FROM question_user_favourites', (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results as Favourite_Content[]);
            });
        });
    }



    //delete favourite relation with questionid and userid
    deleteFavouriteRelation(question_id: number, user_id: number) {
        return new Promise<void>((resolve, reject) => {
            pool.query('DELETE FROM question_user_favourites WHERE question_id=? AND user_id=?', [question_id, user_id], (error) => {
            console.log(error);
            if (error) return reject(error);
            resolve();
            });
        });
    }


}

export const favouriteService = new Service();
