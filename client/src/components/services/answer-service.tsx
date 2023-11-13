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

export type Answer = {
  answer_id: number;
  text: string;
  confirmed_answer: boolean;
  question_id: number;
};

class Service {
  //get answer by id
  getAnswerById(id: number) {
    return axios.get('/answers/' + id).then((response) => response.data);
  }

  // get all answers for a question
  getAnswersForQuestion(id: number) {
    return axios.get('/questions/' + id + '/answers').then((response) => response.data);
  }

  //create answer
  createAnswer(text: string, question_id: number) {
    return axios
      .post('/questions/' + question_id + '/answers', { text, question_id })
      .then((response) => response.data);
  }

  //update answer
  updateAnswer(answer: Answer) {
    return axios.put('/answers', answer).then((response) => response.data);
  }

  //delete answer
  deleteAnswer(id: number) {
    return axios.delete('/answers/' + id).then((response) => response.data);
  }
}

const answerService = new Service();
export default answerService;
