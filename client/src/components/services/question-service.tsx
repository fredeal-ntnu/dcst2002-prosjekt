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

export type Tag_Question_Relation = {
  tag_id: number;
  question_id: number;
};




class Service {
  /**
   * Get all questions.
   */

  getAllQuestions() {
    return axios.get<Question[]>('/questions').then((response) => response.data);
  }

  /**
   * Get a question by id.
   */

  getQuestion(id: number) {
    return axios.get<Question>('/questions/' + id).then((response) => response.data);
  }

  /**
   * Get top five questions.
   */

  getTopFiveQuestions() {
    return axios.get<Question[]>('/topfivequestions').then((response) => response.data);
  }

  /**
   * Get all unaswered questions.
   */
  getUnansweredQuestions() {
    return axios.get<Question[]>('/unansweredquestions').then((response) => response.data);
  }

  /**
   * Update a question.
   */

  updateQuestion(question: Question) {
    return axios.put('/questions', question).then((response) => response.data);
  }

  /**
   * Create a question.
   */

  createQuestion(title: string, text: string) {
    return axios.post('/questions', { title, text }).then((response) => response.data.id);
  }

  /**
   * Delete a question.
   */

  deleteQuestion(id: number) {
    return axios.delete('/questions/' + id).then((response) => response.data);
  }

}

const questionService = new Service();
export default questionService;
