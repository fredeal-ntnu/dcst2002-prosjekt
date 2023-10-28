//vi trenger getAllAnswers, getAnswer, createAnswer, updateAnswer, deleteAnswer

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Answer_Content = {
  answer_id: number;
  text: string;
  score: number;
  answer_question_id: number;
};

class Service {

    /**
     * Get answer with given id.
     */
    getAnswer(answer_id: number) { 
        return new Promise<Answer_Content | undefined>((resolve, reject) => {
            pool.query('SELECT * FROM Answer WHERE answer_id = ?', [answer_id], (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results[0] as Answer_Content);
            });
        });
    }

    /**
     * Get all answers.
     */
    getAllAnswers() {
        return new Promise<Answer_Content[]>((resolve, reject) => {
            pool.query('SELECT * FROM Answer', (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results as Answer_Content[]);
            });
        });
    }

    /**
     * Create new answer having the given text.
     *
     * Resolves the newly created answer id.
     */

    createAnswer(text: string, answer_question_id: number) {
        return new Promise<number>((resolve, reject) => {
            pool.query('INSERT INTO Answer SET text=?, answer_question_id=?', [text, answer_question_id], (error, results: ResultSetHeader) => {
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
            pool.query('DELETE FROM Answer WHERE answer_id = ?', [answer_id], (error, results: ResultSetHeader) => {
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
            pool.query('UPDATE Answer SET text=?, score=?, answer_question_id=? WHERE answer_id=?', [answer.text, answer.score, answer.answer_question_id, answer.answer_id], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row updated'));

            resolve();
            });
        }); 
    }
    
}
export const answer_contentService = new Service(); 
