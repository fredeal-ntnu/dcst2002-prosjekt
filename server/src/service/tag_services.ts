//vi trenger getTag og getAllTags

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Tag_Content = {
  tag_id: number;
  name: string;
};

class Service {
  /*
   * Get tag with given id.
   */

  getTag(tag_id: number) {
    return new Promise<Tag_Content>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Tags WHERE tag_id = ?',
        [tag_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if (results.length === 0) return reject(error);

          resolve(results[0] as Tag_Content);
        },
      );
    });
  }

  /*
   * Get all tags.
   */

  getAllTags() {
    return new Promise<Tag_Content[]>((resolve, reject) => {
      pool.query('SELECT * FROM Tags', (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Tag_Content[]);
      });
    });
  }
}

export const tagService = new Service();
