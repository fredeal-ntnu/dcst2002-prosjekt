
import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Question_Comment_Content = {
  question_comment_id: number;
  text: string;
  question_id: number;
};

class Service {

    //getAnswerComment by answer id
    getQuestionCommentByQuestionId() {
    
    }

    


    createQuestionComment {

    }

    /**
     * Delete answer comment with answer id.
     */

    deleteQuestionComment(answer_id: number) {
           
    }

    /**
     * Update answer Comment with given id.
     */
    
    updateQuestionComment{

    }
    
}


export const questionCommentService = new Service(); 
