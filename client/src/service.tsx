import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Question = {
  question_id: number;
  title: string;
  text: string;
  view_count: number;
  has_answer: boolean;
  user_id: string;
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

export type Answer = {
  answer_id: number;
  text: string;
  confirmed_answer: boolean;
  question_id: number;
  score?: number;
};

export type QuestionComment = {
  question_comment_id: number;
  text: string;
  question_id: number;
};

export type AnswerComment = {
  answer_comment_id: number;
  text: string;
  answer_id: number;
};

export type Vote = {
  user_id: number;
  answer_id: number;
  vote_type: boolean;
}

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

  createQuestion(title: string, text: string, user_id: number) {
    return axios.post('/questions', { title, text, user_id }).then((response) => response.data.id);
  }

  /**
   * Delete a question.
   */

  deleteQuestion(id: number) {
    console.log(typeof id);
    return axios.delete('/questions/' + id).then((response) => response.data);
  }

  /**
   * Get tags for a question.
   */

  getTags(id: number) {
    return axios.get('/questions/' + id + '/tags').then((response) => response.data);
  }

  /**
   * Get all tags.
   */

  getAllTags() {
    return axios.get('/tags').then((response) => response.data);
  }

  createTagQuestionRelation(tag_id: number, question_id: number) {
    return axios.post('/questions/' + question_id, { tag_id, question_id });
  }

  /**
   * Get a tag by name.
   */

  getQuestionsByTagId(tag: number) {
    return axios.get('/tag/' + tag + '/questions').then((response) => response.data);
  }

  //get all tags for a question by question id
  getTagsForQuestion(id: number) {
    return axios.get('/questions/' + id + '/tags').then((response) => response.data);
  }

  getAllTagQuestionsRelations() {
    return axios.get('/question/:id').then((response) => response.data);
  }

  //get a user
  getUser(user: User) {
    return axios.get<User>('/users/' + user.user_name).then((response) => response.data);
  }

  getAnswerById(id: number) {
    return axios.get('/answers/' + id).then((response) => response.data);
  }

  getAnswersForQuestion(id: number) {
    return axios.get('/questions/' + id + '/answers').then((response) => response.data);
  }

  createAnswer(text: string, question_id: number) {
    return axios
      .post('/questions/' + question_id + '/answers', { text, question_id })
      .then((response) => response.data);
  }

  // ALLE SERVICES FOR QUESTION COMMENTS

  getQuestionCommentById(id: number) {
    return axios
    .get('/comments/'+ id)
    .then((response) => response.data);
  }

  createQuestionComment(text: string, question_id: number) {
    return axios
      .post('/questions/' + question_id + '/comments', { text, question_id })
      .then((response) => response.data);
  }

updateQuestionComment(questionComment: QuestionComment) {
  return axios
  .put('/comments/', questionComment)
  .then((response) => response.data);
}

  deleteQuestionComment(id: number) {
    return axios
      .delete('/comments/' + id)
      .then((response) => response.data);
  }

  getQuestionCommentsForQuestion(id: number) {
    return axios
    .get('/questions/' + id + '/comments')
    .then((response) => response.data);
  }

  // ALLE SERVICES FOR ANSWER COMMENTS
  

  getAnswerCommentsForAnswer(id: number) {
    return axios.get('/answers/' + id + '/comments')
    .then((response) => response.data);
  }

  createAnswerComment(text: string, answer_id: number) {
    return axios
      .post('/answers/' + answer_id + '/comments', { text, answer_id })
      .then((response) => response.data);
  }

  getAnswerCommentById(id: number) {
    console.log('andre')
    return axios
    .get('/answer/comments/' + id)
    .then((response) => response.data);
  }

  updateAnswerComment(answerComment: AnswerComment) {
    return axios
    .put('/comments/', answerComment)
    .then((response) => response.data);
  }

  deleteAnswerComment(id: number) {
    return axios
      .delete('/answer/comments/' + id)
      .then((response) => response.data);
  }

  


  
  updateAnswer(answer: Answer) {
    return axios.put('/answers', answer)
    .then((response) => response.data);
  }

deleteAnswer(id: number) {
  return axios
  .delete('/answers/' + id)
  .then((response) => response.data);
}



// alle services for votes

getVotesByAnswerId(id: number) {
  return axios
  .get('/answers/' + id + '/votes')
  .then((response) => response.data);

}

createVoteForAnswer(user_id: number, answer_id: string, vote_type: boolean) {
  return axios
  .post(answer_id + '/votes', { user_id, answer_id, vote_type })
  .then((response) => response.data);
}


}

const service = new Service();
export default service;
