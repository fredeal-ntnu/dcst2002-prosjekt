//vi trenger getAllQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion


import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Question_Content = {
  question_id: number;
  title: string;
  text: string;
  views: number;
  confirmed_answer: boolean;
};

class Service {

    /**
     * Get question with given id.
     */
    getQuestion(question_id: number) { 
        return new Promise<Question_Content | undefined>((resolve, reject) => {
            pool.query('SELECT * FROM Question WHERE question_id = ?', [question_id], (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results[0] as Question_Content);
            });
        });
    }

    /**
     * Get all questions.
     */
    getAllQuestions() {
        return new Promise<Question_Content[]>((resolve, reject) => {
            pool.query('SELECT * FROM Question', (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
    
            resolve(results as Question_Content[]);
            });
    });
    }
    
    /**
     * Create new question having the given title.
     *
     * Resolves the newly created question id.
     */

    createQuestion(title: string, text: string) {
        return new Promise<number>((resolve, reject) => {
            pool.query('INSERT INTO Question SET title=?, text=?', [title, text], (error, results: ResultSetHeader) => {
            if (error) return reject(error);

        
    
            resolve(results.insertId);
            });
        });
    }

    /**
     * Delete question with given id.
     */
    deleteQuestion(question_id: number) {
        return new Promise<void>((resolve, reject) => {
            pool.query('DELETE FROM Question WHERE question_id = ?', [question_id], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row deleted'));
    
            resolve();
            });
        });
}

    updateQuestion(question: Question_Content) {
        return new Promise<void>((resolve, reject) => {
            pool.query('UPDATE Question SET title=?, text=? WHERE question_id=?', [question.title, question.text, question.question_id], (error, results: ResultSetHeader) => {
            if (error) return reject(error);
            if (results.affectedRows == 0) return reject(new Error('No row updated'));
    
            resolve();
            });
        });
    }
}
export const question_contentService = new Service(); 
