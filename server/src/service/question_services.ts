//vi trenger getAllQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion

import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';



export type Question_Content = {
  question_id: number;
  title: string;
  text: string;
  view_count: number;
  has_answer: boolean;
  user_id: number;
};


class Service {

   /**
   * Get all questions.
   */
   getAllQuestions() {
    return new Promise<Question_Content[]>((resolve, reject) => {
      pool.query('SELECT * FROM Questions', (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Question_Content[]);
      });
    });
  }



    /**
   * Get all unanswered questions.
   */
    getUnansweredQuestions() {
      return new Promise<Question_Content[]>((resolve, reject) => {
        pool.query(
          'SELECT * FROM Questions WHERE has_answer=0 OR has_answer IS NULL',
          (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
  
            resolve(results as Question_Content[]);
          },
        );
      });
    }

   /**
   * Get the top 5 questions with most views in descending order
   */

   getTopFiveQuestions() {
    return new Promise<Question_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Questions ORDER BY view_count DESC LIMIT 5',
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question_Content[]);
        },
      );
    });
  }


    //get top 5 questions by user id
    getUserTopFiveQuestions(user_id: number) {
      return new Promise<Question_Content[]>((resolve, reject) => {
        pool.query(
          'SELECT * FROM Questions WHERE user_id=? ORDER BY view_count DESC LIMIT 5', [user_id],
          (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
  
            resolve(results as Question_Content[]);
          },
        );
      });
    }



  /**
   * Get question with given id.
   */

  getQuestion(question_id: number) {
    return new Promise<Question_Content | undefined>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Questions WHERE question_id=?',
        [question_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if(results.length === 0) return reject(error);


          this.incrementViewCount(results[0].question_id);

          resolve(results[0] as Question_Content);
        },
      );
    });
  }




   /**
   * Get all unanswered questions for user
   */
   getUserUnansweredQuestions(user_id: number) {
    return new Promise<Question_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Questions WHERE (has_answer = 0 OR has_answer IS NULL) AND user_id = ?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Question_Content[]);
        },
      );
    });
  }

  //get all questions by user id

  getQuestionsByUserId(user_id: number) {
    return new Promise<Question_Content[]>((resolve, reject) => {
      pool.query(
        'SELECT * FROM Questions WHERE user_id=?',
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if (results.length === 0) return reject(error);

          resolve(results as Question_Content[]);
        },
      );
    });
  }

    //Gets question title in favourte answers page
  
    getQuestionByAnswerId(answer_id: number) {
      return new Promise<Question_Content>((resolve, reject) => {
        pool.query(
          'SELECT Q.* FROM Questions Q JOIN Answers A ON Q.question_id = A.question_id JOIN answer_user_favourite AF ON A.answer_id = AF.answer_id WHERE AF.answer_id =?',
          [answer_id],
          (error, results: RowDataPacket[]) => {
            if (error) return reject(error);
  
            resolve(results[0] as Question_Content);
          },
        );
      });
    }


//Create new question

  createQuestion(title: string, text: string, user_id: number,
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        'INSERT INTO Questions (title,text,user_id) VALUES (?,?,?)',
        [title, text, user_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        },
      );
    });
  }

  /**
   * Delete question with given id.
   */

  deleteQuestion(id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query('DELETE FROM Questions WHERE question_id=?', [id], (error, results: ResultSetHeader) => {
        if (error) return reject(error);
        if(results.affectedRows === 0) return reject(results);
        
        resolve();
      });
    });
  }

  /**
   * Update question with given id.
   */

  updateQuestion(question: Question_Content) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Questions SET title=?, text=?, view_count=?, has_answer=?, user_id=? WHERE question_id=?',
        [
          question.title,
          question.text,
          question.view_count,
          question.has_answer,
          question.user_id,
          question.question_id,
        ],
        (error, _results) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }

  //increment view count for question

  incrementViewCount(question_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        'UPDATE Questions SET view_count=view_count+1 WHERE question_id=?',
        [question_id],
        (error) => {
          if (error) return reject(error);

          resolve();
        },
      );
    });
  }


  





}

export const questionService = new Service();
