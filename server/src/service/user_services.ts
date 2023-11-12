//vi trenger getUser, getAllUsers, createUser, updateUser, deleteUser

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type User_Content = {
  user_name: string;
  password: string;
};

class Service {

    getUser(user_name: string) { 
        return new Promise<User_Content | undefined>((resolve, reject) => {
            pool.query('SELECT * FROM User WHERE username = ?', [user_name], (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results[0] as User_Content);
            });
        });
    }

    getAllUsers() {
        return new Promise<User_Content[]>((resolve, reject) => {
            pool.query('SELECT * FROM Users', (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results as User_Content[]);
            });
        });
    }

    createUser(user_name: string, password: string) {
        return new Promise<number>((resolve, reject) => {
            pool.query('INSERT INTO Users SET username=?, password=?', [user_name, password], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
    
            resolve(results.insertId);
            });
        });
    }

    updateUser(user_name: string, password: string) {
        return new Promise<number>((resolve, reject) => {
            pool.query('UPDATE Users SET username=?, password=? WHERE user_name=?', [user_name, password], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
    
            resolve(results.insertId);
            });
        });
    }

    deleteUser(user_name: string) {
        return new Promise<void>((resolve, reject) => {
            pool.query('DELETE FROM Users WHERE username = ?', [user_name], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row deleted'));

            resolve();
            });
        });
    }



}

export const tag_contentService = new Service();