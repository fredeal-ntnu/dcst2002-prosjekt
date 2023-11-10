import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';


export type Question = {
  question_id: number;
  title: string;
  text: string;
  view_count: number;
  confirmed_answer: boolean;
  user_name: string;
}; 


export type Tag = {
  tag_id: number;
  name: string;
  
};

export type Tag_Question_Relation = {
  tag_id: number;
  question_id: number;
};

export type User = {
  user_name: string;
  password: string;
};



class Service {

  /**
   * Get all questions. 
   */

  getAllQuestions() {
    return axios
    .get<Question[]>('/questions')
    .then((response) => response.data);
  }

  /**
   * Get a question by id.
   */


  getQuestion(id: number) {
    return axios
    .get<Question>('/questions/' + id)
    .then((response) => response.data);
  }

  /**
   * Get top five questions.
   */

  getTopFiveQuestions() {
    return axios
    .get<Question[]>('/topfive')
    .then((response) => response.data);
  }

  /**
   * Update a question.
   */

  updateQuestion(question: Question) {
    return axios
    .put('/questions',question)
    .then((response) => response.data)
  }

  /**
   * Create a question.
   */

  createQuestion(title: string, text: string) {
    return axios
      .post('/questions', {title, text})
      .then((response) => response.data.id);
  }

  /**
   * Delete a question.
   */
  
  deleteQuestion(question_id: number) {
    return axios
    .delete<Question>('/questions/' + question_id)
    .then((response) => response.data);
  }


  /**
   * Get tags for a question.
   */

  getTags(id: number) {
    return axios
    .get('/questions/' + id + '/tags')
    .then((response) => response.data);
  }

  /**
   * Get all tags.
   */

  getAllTags() {
    return axios
    .get('/tags')
    .then((response) => response.data);
  }

  createTagQuestionRelation(tag_id: number, question_id: number) {
    return axios
    .post('/questions/' + question_id, {tag_id, question_id})
  }




  /**
   * Get a tag by name.
   */

  getQuestionsByTag(tag: string) {
    return axios
    .get('/tags/' + tag + '/questions')
    .then((response) => response.data);
  }



//get all tags for a question by question id
  getTagsForQuestion(id: number) {
    return axios
    .get('/questions/' + id + '/tags')
    .then((response) => response.data);
  }

  getAllTagQuestionsRelations() {
    return axios
    .get('/question/:id')
    .then((response) => response.data);
  }


//get a user
getUser(user : User) {
  return axios.get<User>('/users/' + user.user_name).then((response) => response.data);
}







}






const service = new Service();
export default service;