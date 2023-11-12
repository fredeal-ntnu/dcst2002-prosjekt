//vi trenger getAllAnswers, getAnswer, createAnswer, updateAnswer, deleteAnswer

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Answer_Content = {
  answer_id: number;
  text: string;
  confimed_answer: boolean;
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
            pool.query('UPDATE Answers SET confirmed_answer = true WHERE answer_id = ?', [answer_id], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row updated'));

            resolve();
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

    deleteAnswer(answer_id: number) {
        return new Promise<void>((resolve, reject) => {
            pool.query('DELETE FROM Answers WHERE answer_id = ?', [answer_id], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row deleted'));

            resolve();
            });
        });     
    }

    /**
     * Update answer with given id.
     */
    
    updateAnswer(answer: Answer_Content) {
        return new Promise<void>((resolve, reject) => {
            pool.query('UPDATE Answers SET text=?, confirmed_answer=?, question_id=? WHERE answer_id=?', 
            [answer.answer_id, answer.text, answer.confimed_answer,answer.question_id],
             (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row updated'));

            resolve();
            });
        }); 
    }
    
}
export const answerService = new Service(); 
