//vi trenger getUser, getAllUsers, createUser, updateUser, deleteUser
import e from 'express';
import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type User = {
  user_id: number;
  google_id: string;
  username: string;
  email: string;
};


class UserService {
  
// create new user

  create(newUser: Omit<User, 'user_id'>): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      pool.query(
        'INSERT INTO Users (username, email, google_id) VALUES (?, ?, ?)',
        [newUser.username, newUser.email, newUser.google_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          const user = {
            user_id: results.insertId,
            username: newUser.username,
            email: newUser.email,
            google_id: newUser.google_id,
          } as User;

          resolve(user);
        },
      );
    });
  }

  /*
  Combining above methods to create a new user if it doesn't exist,
   or return the existing user if it does:
   */


  findOrCreate(providerUser: Omit<User, 'user_id'>,
   callback:(error: string | Error | null, user: Express.User | undefined) => void
   ){
    return new Promise<void>((resolve, reject) => {
      this.getUserwithGoogleId(providerUser.google_id).then((user) => {
        if (user) {
          callback(null, user);
          resolve();
        } else {
          this.create(providerUser).then((newUser) => {
            if (!newUser) {
              const error = new Error('Failed to create user');
              callback(error, undefined);
              reject(error);
            } else {
              callback(null, newUser);
              resolve();
            }
          }).catch((error) => {
            callback(error, undefined);
            reject(error);
          });
        }
      }).catch((error) => {
        callback(error, undefined);
        reject(error);
      });
    });
  }
  getUserwithGoogleId(google_id: string) {
    throw new Error('Method not implemented.');
  }
  

  }


export const userService = new UserService();

