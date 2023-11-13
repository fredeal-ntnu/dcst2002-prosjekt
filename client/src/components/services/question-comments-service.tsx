import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Question = {
  question_id: number;
  title: string;
  text: string;
  view_count: number;
  has_answer: boolean;
  username: string;
};

export type QuestionComment = {
  question_comment_id: number;
  text: string;
  question_id: number;
};


class Service {

  // create question comment
  createQuestionComment(text: string, question_id: number) {
    return axios
      .post('/questions/' + question_id + '/comments', { text, question_id })
      .then((response) => response.data);
  }

  // update question comment
  updateQuestionComment(question_comment_id: number, text: string) {
    return axios
      .put('/questions/' + question_comment_id + '/comments', { question_comment_id, text })
      .then((response) => response.data);
  }
  // delete question comment
  deleteQuestionComment(question_comment_id: number) {
    return axios
      .delete('/questions/' + question_comment_id + '/comments')
      .then((response) => response.data);
  }

  // get all question comments by question id
  getQuestionCommentsForQuestion(id: number) {
    return axios.get('/questions/' + id + '/comments').then((response) => response.data);
  }


}

const questionCommentService = new Service();
export default questionCommentService;
