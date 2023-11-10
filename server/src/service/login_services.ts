// vi trenger getUser, createUser, updateUser

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader,  } from 'mysql2';

export type Login_Content = {
  user_name: string;
  password: string;  
};

class Service {

    //getUser
    getUser(user_name: string, password: string) {
        return new Promise<Login_Content | undefined>((resolve, reject) => {
            pool.query('SELECT * FROM User WHERE user_name = ?, password = ?', [user_name, password], (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results[0] as Login_Content);
            });
        });
    }

    //createUser
    createUser(user_name: string, password: string) {
        return new Promise<ResultSetHeader>((resolve, reject) => {
            pool.query('INSERT INTO Login (user_name, password) VALUES (?, ?)', [user_name, password], (error, result) => {
            if (error) return reject(error);
    
            resolve(result as ResultSetHeader);
            });
        });
    }

    //updateUser
    updateUser(user_name: string, password: string) {
        return new Promise<ResultSetHeader>((resolve, reject) => {
            pool.query('UPDATE Login SET password = ? WHERE user_name = ?', [password, user_name], (error, result) => {
            if (error) return reject(error);
    
            resolve(result as ResultSetHeader);
            });
        });
    }
    
}
export const loginService = new Service(); 
