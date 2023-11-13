
import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Answer_Content = {
  answer_id: number;
  text: string;
  confirmed_answer: boolean;
  question_id: number;
};

class Service {

    getAnswersByQuestionId(question_id: number) {
        return new Promise<Answer_Content[]>((resolve, reject) => {
            pool.query('SELECT * FROM Answers WHERE question_id = ?', [question_id], (error, results: RowDataPacket[]) => {
            if (error) return reject(error);

            resolve(results as Answer_Content[]);
            });
        });
    }

    setConfirmedAnswer(answer_id: number) {
        return new Promise<void>((resolve, reject) => {
            pool.query('UPDATE Answers SET confirmed_answer = 1 WHERE answer_id = ?', [answer_id], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row updated'));

            resolve();
            });
        }); 
    }

   getAnswerById(answer_id: number) {
    return new Promise<Answer_Content>((resolve, reject) => {
        pool.query('SELECT * FROM Answers WHERE answer_id = ?', [answer_id], (error, results: RowDataPacket[]) => {
        if (error) return reject(error);
        if (results.length == 0) return reject(new Error('No answer found'));

        resolve(results[0] as Answer_Content);
        });
    });
   }

    createAnswer(text: string, question_id: number) {
        return new Promise<number>((resolve, reject) => {
            pool.query('INSERT INTO Answers SET text=?, question_id=?', [text, question_id], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
    
            resolve(results.insertId);
            });
        });

    }

    /**
     * Delete answer with given id.
     */

    deleteAnswer(id: number) {
        return new Promise<void>((resolve, reject) => {
            pool.query('DELETE FROM Answers WHERE answer_id=?', [id], (error) => {
                console.log(error)
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
            pool.query('UPDATE Answers SET text=?, confirmed_answer=? WHERE answer_id=?', 
            [answer.text, answer.confirmed_answer, answer.answer_id],
             (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row updated'));

            resolve();
            });
        }); 
    }
    
}
export const answerService = new Service(); 
