
import pool from '../mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export type Answer_Comment_Content = {
  answer_comment_id: number;
  text: string;
  answer_id: number;
};

class Service {

    //getAnswerComment by answer id
    getAnswersCommentByQuestionId() {
    
    }

    


    createAnswerComment {

    }

    /**
     * Delete answer comment with answer id.
     */

    deleteAnswerComment(answer_id: number) {
           
    }

    /**
     * Update answer Comment with given id.
     */
    
    updateAnswerComment{

    }
    
}


export const answerCommentService = new Service(); 
