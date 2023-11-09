//vi trenger getAllQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion


import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Question_Content = {
  question_id: number;
  title: string;
  text: string;
  view_count: number;
  confirmed_answer: boolean;
  user_name: string;
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
     * Get the top 5 questions with most views in descending order
     */
    
        getTopFiveQuestions() {
            return new Promise<Question_Content[]>((resolve, reject) => {
                pool.query('SELECT * FROM Question ORDER BY view_count DESC LIMIT 5', (error, results: RowDataPacket[]) => {
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

    createQuestion(title: string, text: string, view_count: number, confirmed_answer: boolean, user_name: string) {
        return new Promise<number>((resolve, reject) => {
            pool.query('INSERT INTO Question SET title=?, text=?, view_count=0, confirmed_answer=0, user_name=*',
            [title, text, view_count,confirmed_answer,user_name], (error, results: ResultSetHeader) => {
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

    // updateQuestion(question: Question_Content) {
    //     return new Promise<void>((resolve, reject) => {
    //         pool.query('UPDATE Question SET title=?, text=? WHERE question_id=?', [question.question_id, question.title, question.text], (error, results: ResultSetHeader) => {
    //         if (error) return reject(error);
    //         if (results.affectedRows == 0) return reject(new Error('No row updated'));
    
    //         resolve();
    //         });
    //     });
    // }


    updateQuestion(question: Question_Content) {
        return new Promise<void>((resolve, reject) => {
          pool.query(
            'UPDATE Question SET title=?, text=?, view_count=?, confirmed_answer, user_name WHERE id=?',
            [question.question_id,question.title, question.text, question.view_count, question.confirmed_answer, question.user_name     ],
            (error, _results) => {
              if(error) return reject(error)
    
              resolve() 
            }
          )
        })
      }

}
export const questionService = new Service(); 
