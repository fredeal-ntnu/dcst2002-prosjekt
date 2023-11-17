import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Answer_Content = {
  answer_id: number;
  text: string;
  confirmed_answer: boolean;
  last_updated: Date;
  question_id: number;
  user_id: number;
  score?: number;
  result?: any;
};

class Service {

  getVotesBs(question_id: number) {
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

  //get answers by question id

  getAnswersByQuestionId(question_id: number) {
    return new Promise<Answer_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Answers WHERE question_id = ?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Answer_Content[]);
        },
      );
    });
  }

  //get answers by user id
  getAllAnswersByUserId(user_id: number) {
    return new Promise<Answer_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Answers WHERE user_id = ?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Answer_Content[]);
        },
      );
    });
  }

getAllFavouriteAnswersByUserId(user_id: number){
    return new Promise<Answer_Content[]>((resolve, reject) => {
    // First query to get all answer_ids associated with the user_id
  pool.query(
    'SELECT * FROM answer_user_favourite WHERE user_id = ?',
    [user_id],
    (error, favoriteResults) => {
        if (error) return reject(error);
        // Extract answer_ids from the favoriteResults
        const answer_id = (favoriteResults as RowDataPacket[]).map(result => result.answer_id);

        // Second query to get answers based on the extracted answer_ids
        pool.query(
            'SELECT * FROM Answers WHERE answer_id IN (?)',
            [answer_id],
            (secondError, answerResults) => {
                if (secondError) return reject(secondError);
                  
                

                resolve(answerResults as Answer_Content[]);
            }
        );
    });
  });
}


  //create answer by question id

  createAnswer(text: string, question_id: number, user_id: number) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Answers SET text=?, question_id=?, user_id=?',
        [text, question_id, user_id],
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
        [answer.answer_id, answer.confirmed_answer, answer.question_id, answer.text, answer.user_id ,answer.last_updated],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          resolve(results as Answer_Content[]);
        })})
    }
}









export const answerService = new Service();
