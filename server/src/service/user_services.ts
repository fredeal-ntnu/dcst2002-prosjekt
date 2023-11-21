import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type User = {
  user_id: number;
  google_id: string;
  username: string;
  email: string;
};

class UserService {
  // gets given user_id based on google_id

  getUserwithGoogleId(google_id: User['google_id']) {
    return new Promise<User | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Users WHERE google_id = ?',
        [google_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as User | undefined);
        },
      );
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

  // Combining above methods to create a new user if it doesn't exist,
  // or return the existing user if it does:

  findOrCreate(
    providerUser: Omit<User, 'user_id'>,
    callback: (error: string | Error | null, user: Express.User | undefined) => void,
  ) {
    return new Promise<void>((resolve, reject) => {
      this.getUserwithGoogleId(providerUser.google_id)
        .then((user) => {
          if (user) {
            callback(null, user);
            resolve();
          } else {
            this.create(providerUser)
              .then((newUser) => {
                if (!newUser) {
                  const error = new Error('Failed to create user');
                  callback(error, undefined);
                  reject(error);
                } else {
                  callback(null, newUser);
                  resolve();
                }
              })
              .catch((error) => {
                callback(error, undefined);
                reject(error);
              });
          }
        })
        .catch((error) => {
          callback(error, undefined);
          reject(error);
        });
    });
  }
}

export const userService = new UserService();
