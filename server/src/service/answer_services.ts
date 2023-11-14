import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Answer_Content = {
  answer_id: number;
  text: string;
  confirmed_answer: boolean;
  last_edited: Date;
  question_id: number;
  user_id: number;
  score?: number;
};

class Service {
  //get answer by question idxxx
  // SELECT answer_id, SUM(CASE WHEN vote_type = 1 THEN 1 ELSE -1 END) AS total_votes FROM Votes WHERE answer_id = ? GROUP BY answer_id;

  getAnswersByQuestionId(question_id: number) {
    return new Promise<Answer_Content[]>((resolve, reject) => {
      const query = `
      SELECT
      a.*,
      COALESCE(SUM(
          CASE
              WHEN ap.vote_type = 1 THEN 1
              WHEN ap.vote_type = 0 THEN -1
              ELSE 0
          END
      ), 0) AS score
  FROM
      Answers AS a
  LEFT JOIN
      Votes AS ap ON a.answer_id = ap.answer_id
  GROUP BY
      a.answer_id;
      `;
      pool.query(
        query,
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Answer_Content[]);
        }, 
      );
    });
  }

  //get answer by answer id

  getAnswerById(answer_id: number) {
    return new Promise<Answer_Content>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Answers WHERE answer_id = ?',
        [answer_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if (results.length == 0) return reject(new Error('No answer found'));

          resolve(results[0] as Answer_Content);
        },
      );
    });
  }

  //create answer by question id

  createAnswer(text: string, question_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Answers SET text=?, question_id=?',
        [text, question_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  /**
   * Delete answer with given id.
   */

  deleteAnswer(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Answers WHERE answer_id=?', [id], (error) => {
        console.log(error);
        if (error) return reject(error);
        resolve();
      });
    });
  }
  /**
   * Update answer with given id.
   */

  updateAnswer(answer: Answer_Content) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Answers SET text=?, confirmed_answer=? WHERE answer_id=?',
        [answer.text, answer.confirmed_answer, answer.answer_id],


        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) return reject(new Error('No row updated'));

          resolve();
        },
      );
    });
  }
  
  sortByLastEdited(answer: Answer_Content) {
    return new Promise<Answer_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Answers ORDER BY last_edited DESC',
        [answer.answer_id, answer.confirmed_answer, answer.question_id, answer.text, answer.user_id ,answer.last_edited],
        (error, results: RowDataPacket[]) => {
          console.log(error);
          if (error) return reject(error);
          resolve(results as Answer_Content[]);
        })})
    }
}







export const answerService = new Service();
