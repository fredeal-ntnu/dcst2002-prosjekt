
import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Answer_Comment_Content = {
  answer_comment_id: number;
  text: string;
  answer_id: number;
};

class Service {
    //get answer comment by answer id
    getAnswerCommentByAnswerId(answer_id: number) {
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

  

    //create answer comment by question id

    createAnswerComment(text: string, question_id: number) {
        return new Promise<number>((resolve, reject) => {
            pool.query(
            'INSERT INTO answer_comments SET text=?, question_id=?',
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
  
    deleteAnswerComment(answer_comment_id: number) {
        return new Promise<void>((resolve, reject) => {
            pool.query(
            'DELETE FROM answer_comments WHERE answer_comment_id = ?',
            [answer_comment_id],
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
  
    updateAnswerComment(text: string, answer_comment_id: number) {
      return new Promise<void>((resolve, reject) => {
        pool.query(
          'UPDATE answer_comments SET text=? WHERE answer_comment_id=?',
          [text, answer_comment_id],
          (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row updated'));
  
            resolve();
          },
        );
      });
    }
}


export const answerCommentService = new Service(); 
