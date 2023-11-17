import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Answer_Comment_Content = {
  answer_comment_id: number;
  text: string;
  answer_id: number;
  user_id: number;
};

class Service {
  //get answer comment by answer id
  getAnswerCommentsByAnswerId(answer_id: number) {
    return new Promise<Answer_Comment_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM answer_comments WHERE answer_id = ?',
        [answer_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Answer_Comment_Content[]);
        },
      );
    });
  }

  getAnswerCommentById(answer_comment_id: number) {
    return new Promise<Answer_Comment_Content>((resolve, reject) => {
      pool.query(
        'SELECT * FROM answer_comments WHERE answer_comment_id = ?',
        [answer_comment_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if (results.length === 0) return reject('No answer comment found');

          resolve(results[0] as Answer_Comment_Content);
        },
      );
    });
  }

  //Create answer comment

  createAnswerComment(text: string, answer_id: number, user_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO answer_comments SET text=?, answer_id=?, user_id=?',
        [text, answer_id, user_id],
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

  deleteAnswerComment(answer_comment_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'DELETE FROM answer_comments WHERE answer_comment_id = ?',
        [answer_comment_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) return reject('No row deleted');

          resolve();
        },
      );
    });
  }

  /**
   * Update answer Comment with given id.
   */

  updateAnswerComment(answer_comment: Answer_Comment_Content) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE answer_comments SET text=? WHERE answer_comment_id=?',
        [answer_comment.text, answer_comment.answer_comment_id],
        (error, _results) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }
}

export const answerCommentService = new Service();
