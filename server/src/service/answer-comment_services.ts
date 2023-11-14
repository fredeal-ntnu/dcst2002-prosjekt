
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

    //Create answer comment

    createAnswerComment(text: string, answer_id: number) {
      return new Promise<number>((resolve, reject) => {
        pool.query(
          'INSERT INTO answer_comments SET text=?, answer_id=?',
          [text, answer_id],
          (error, results: ResultSetHeader) => {
            if (error) return reject(error);
  
            resolve(results.insertId);
          },
        );
      });
    }

  
  }
  
   

export const answerCommentService = new Service(); 
