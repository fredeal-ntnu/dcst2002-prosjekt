import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Tag_Question_Relation = {
  tag_id: number;
  question_id: number;
};

export type Question_User_Favourite = {
  user_id: number;
  question_id: number;
};

class Service {

  //gets all tags using question id

  getAllTagsByQuestionId(question_id: number) {
    return new Promise<Tag_Question_Relation[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Tag_Question_Relation WHERE question_id = ?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Tag_Question_Relation[]);
        },
      );
    });
  }

  //puts tagid and question id into the relation table

  createTagQuestionRelation(tag_id: number, question_id: number) {
    return new Promise<ResultSetHeader>((resolve, reject) => {
      pool.query(
        'INSERT INTO tag_question_relation (tag_id, question_id) VALUES (?, ?)',
        [tag_id, question_id],
        (error, result: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(result);
        },
      );
    });
  }

  //gets all relations from the relation table

  getAllTagQuestionRelations() {
    return new Promise<Tag_Question_Relation[]>((resolve, reject) => {
      pool.query('SELECT * FROM tag_question_relation', (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Tag_Question_Relation[]);
      });
    });
  }

  //gets all relations from the relation table using tag id
  
  getAllQuestionsByTagId(tag_id: number) {
    return new Promise<Tag_Question_Relation[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM tag_question_relation WHERE tag_id=?',
        [tag_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Tag_Question_Relation[]);
        },
      );
    });
  }
}

export const questionRelationService = new Service();
