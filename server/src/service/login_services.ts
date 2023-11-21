import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Login_Content = {
  user_id: number;
  google_id: string;
  username: string;
  email: string;
};

class Service {
  getUser(user_id: number) {
    return new Promise<Login_Content | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Users WHERE user_id=?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results[0] as Login_Content);
        },
      );
    });
  }
}
export const loginService = new Service();
