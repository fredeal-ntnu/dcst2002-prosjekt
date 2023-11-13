import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Question_Comment_Content = {
  question_comment_id: number;
  text: string;
  question_id: number;
};

class Service {
  //get answer comment by question id
  getQuestionCommentByQuestionId(question_id: number) {
    return new Promise<Question_Comment_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM question_comments WHERE question_id = ?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question_Comment_Content[]);
        },
      );
    });
  }

  createQuestionComment(text: string, question_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO question_comments SET text=?, question_id=?',
        [text, question_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  /**
   * Delete answer comment with answer id.
   */

  deleteQuestionComment(question_comment_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELETE FROM question_comments WHERE question_comment_id = ?',
        [question_comment_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) return reject(new Error('No row deleted'));

          resolve();
        },
      );
    });
  }

  /**
   * Update answer Comment with given id.
   */

  updateQuestionComment(text: string, question_comment_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE question_comments SET text=? WHERE question_comment_id=?',
        [text, question_comment_id],
        (error, _results) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }
}

export const questionCommentService = new Service();
