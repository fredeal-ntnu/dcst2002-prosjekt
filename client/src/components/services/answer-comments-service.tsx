import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Answer = {
  answer_id: number;
  text: string;
  confirmed_answer: boolean;
  question_id: number;
};

export type AnswerComment = {
  answer_comment_id: number;
  text: string;
  answer_id: number;
};

class Service {
  // create answer comment GANSKE SIKKER PÅ AT DENNE IKKE BRUKES
  // createAnswerComment(text: string, answer_id: number) {
  //   return axios
  //     .post('/answers/' + answer_id + '/comments', { text, answer_id })
  //     .then((response) => response.data);
  // }

  // update answer comment
  updateAnswerComment(answer_comment_id: number, text: string) {
    return axios
      .put('/answers/' + answer_comment_id + '/comments', { answer_comment_id, text })
      .then((response) => response.data);
  }

  // delete answer comment
  deleteAnswerComment(answer_comment_id: number) {
    return axios
      .delete('/answers/' + answer_comment_id + '/comments')
      .then((response) => response.data);
  }

  // get all answer comments by answer id
  getAnswerCommentsForAnswer(id: number) {
    return axios.get('/answers/' + id + '/comments').then((response) => response.data);
  }
}

const answerCommentService = new Service();
export default answerCommentService;
