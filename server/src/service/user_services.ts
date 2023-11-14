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
 // get user by if
    get(userId: number) {
        return new Promise<User | undefined>((resolve, reject) => {
          pool.query(
            'SELECT * FROM Users WHERE user_id=?',
            [userId], (error, results: RowDataPacket[]) => {
              if (error) return reject(error);

              resolve(results[0] as User);
            },
          );
        });
      }

      // gets given user_id based on google_id //tror er feil

      getUserwithGoogleId(google_id: User['google_id']) {
        return new Promise<User | undefined>((resolve, reject) => {
          pool.query('SELECT * FROM Users WHERE google_id = ?', [google_id], (error, results: RowDataPacket[]) => {
            if (error) return reject(error);

            resolve(results[0] as User | undefined);
          });
        });
      }


  // Gets a user by username
  getUser(username: string) {
    return new Promise<User | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Users WHERE username = ?',
        [username],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if (results.length === 0) return resolve(undefined);

          resolve(results[0] as User);
        },
      );
    });
  }

  // Gets all users
  getAllUsers() {
    return new Promise<User[]>((resolve, reject) => {
      pool.query('SELECT * FROM Users', (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as User[]);
      });
    });
  }
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
  
// update user
  update(user: User) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Users SET username = ?, email = ? WHERE user_id = ?',
        [user.username, user.email, user.user_id],
        (error) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }
  
  delete(user_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELETE FROM Users WHERE user_id = ?',
        [user_id],
        (error) => {
          if (error) return reject(error);

          resolve();
        },
      );
    }

       
 
)}
  }


export const userService = new UserService();

