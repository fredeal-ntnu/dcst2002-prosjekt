import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Question = {
  question_id: number;
  title: string;
  text: string;
  view_count: number;
  has_answer: number;
  user_id: number;
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
  user_id: number;
  google_id: string;
  username: string;
  email: string;
};

export type Answer = {
  answer_id: number;
  text: string;
  confirmed_answer: Number;
  last_updated: Date;
  question_id: number;
  user_id: number;
  score?: number;
  result?: any;
};

export type QuestionComment = {
  question_comment_id: number;
  text: string;
  question_id: number;
  user_id: number;
};

export type AnswerComment = {
  answer_comment_id: number;
  text: string;
  answer_id: number;
  user_id: number;
};

export type Vote = {
  user_id: number;
  answer_id: number;
  vote_type: number;
};

export type Favourite = {
  answer_id: number;
  user_id: number;
};

class Service {
  //creates a vote relation with user_id, answer_id and vote_type
  createVote(user_id: number, answer_id: number, vote_type: number) {
    return axios.post('/vote', { user_id, answer_id, vote_type });
  }

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

  //get user top five questions
  getUserTopFiveQuestions(user_id: number) {
    return axios
      .get<Question[]>('/user/' + user_id + '/topfivequestions')
      .then((response) => response.data);
  }

  /**
   * Get all unaswered questions.
   */
  getUnansweredQuestions() {
    return axios.get<Question[]>('/unansweredquestions').then((response) => response.data);
  }

  //get user unanswered questions
  getUserUnansweredQuestions(user_id: number) {
    return axios
      .get<Question[]>('/user/' + user_id + '/unansweredquestions')
      .then((response) => response.data);
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
    return axios.delete('/questions/' + id).then((response) => response.data);
  }

  //get all questions for a user
  getQuestionsByUserid(user_id: number) {
    return axios.get('/user/' + user_id + '/questions').then((response) => response.data);
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

  // Creates a tag relation with tag_id and question_id
  createTagQuestionRelation(tag_id: number, question_id: number) {
    return axios.post('/questiontagrelation', { tag_id, question_id });
  }

  /**
   * Get a tag by name.
   */

  getAllQuestionsByTagId(tag: number) {
    return axios.get('/tag/' + tag + '/questions').then((response) => response.data);
  }

  //get all tags for a question by question id
  getTagsForQuestion(id: number) {
    return axios.get('/questions/' + id + '/tags').then((response) => response.data);
  }

  //get all relations between tags and questions
  getAllTagQuestionRelations() {
    return axios.get('/questiontagrelations').then((response) => response.data);
  }

  //get a user
  getUser(user: User) {
    return axios.get<User>('/users/' + user.user_id).then((response) => response.data);
  }

  //gets an answer by id
  getAnswerById(id: number) {
    return axios.get('/answers/' + id).then((response) => response.data);
  }

  //get answer scores by question id
  getAnswerScoresByQuestionId(id: number) {
    return axios.get('/questions/' + id + '/answer/votes').then((response) => response.data);
  }

  //create answer with text, question_id and user_id
  createAnswer(text: string, question_id: number, user_id: number) {
    return axios
      .post('/questions/' + question_id + '/answers', { text, question_id, user_id })
      .then((response) => response.data);
  }

  // get question comments by question id
  getQuestionCommentById(id: number) {
    return axios.get('/comments/' + id).then((response) => response.data);
  }

  // create question comment with text, question_id and user_id
  createQuestionComment(text: string, question_id: number, user_id: number) {
    return axios
      .post('/questions/' + question_id + '/comments', { text, question_id, user_id })
      .then((response) => response.data);
  }

  // update question comment
  updateQuestionComment(questionComment: QuestionComment) {
    return axios.put('/comments/', questionComment).then((response) => response.data);
  }

  // delete question comment
  deleteQuestionComment(id: number) {
    return axios.delete('/comments/' + id).then((response) => response.data);
  }

  // question comments for question with question id
  getQuestionCommentsForQuestion(id: number) {
    return axios.get('/questions/' + id + '/comments').then((response) => response.data);
  }

  //get question by answer id
  getQuestionByAnswerId(answer_id: number) {
    return axios
      .get<Question>('/answer/' + answer_id + '/question')
      .then((response) => response.data);
  }

  // answercomments for answer with answer id
  getAnswerCommentsForAnswer(id: number) {
    return axios.get('/answers/' + id + '/comments').then((response) => response.data);
  }

  // creates new answer comment with text, answer_id and user_id
  createAnswerComment(text: string, answer_id: number, user_id: number) {
    return axios
      .post('/answers/' + answer_id + '/comments', { text, answer_id, user_id })
      .then((response) => response.data);
  }

  // get answer comment by id
  getAnswerCommentById(id: number) {
    return axios.get('/answer/comments/' + id).then((response) => response.data);
  }

  // update answer comment
  updateAnswerComment(answerComment: AnswerComment) {
    return axios
      .put('/comments/' + answerComment.answer_comment_id, answerComment)
      .then((response) => response.data);
  }

  // delete answer comment
  deleteAnswerComment(id: number) {
    return axios.delete('/answer/comments/' + id).then((response) => response.data);
  }

  // update answer
  updateAnswer(answer: Answer) {
    return axios.put('/answers', answer).then((response) => response.data);
  }

  // delete answer
  deleteAnswer(id: number) {
    return axios.delete('/answers/' + id).then((response) => response.data);
  }

  // get votes by answer id
  getVotesByAnswerId(id: number) {
    return axios.get('/answers/' + id + '/votes').then((response) => response.data);
  }

  // gets current logged in user
  async getMe() {
    try {
      const response = await axios.get('/user/me');
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('getMe failed');
      }
    } catch (error) {
      throw error;
    }
  }

  // logs out user
  async logOut() {
    try {
      const response = await axios.post('/logout');
      if (response.status === 200) {
        return response.status;
      } else {
        throw new Error('logout failed');
      }
    } catch (error) {
      throw error;
    }
  }

  // get all favourite answers with user id
  getAllFavouriteAnswersByUserId(user_id: number) {
    return axios
      .get<Answer[]>('/user/' + user_id + '/favourites')
      .then((response) => response.data);
  }

  //creates/deletes favourite relation
  handleFavouriteRelation(answer_id: number, user_id: number) {
    return axios
      .post('/users/' + user_id + '/favourites/' + answer_id, { answer_id, user_id })
      .then((response) => response.data);
  }

  //gets a relation by questionid
  getFavouriteByAnswerId(answer_id: number) {
    return axios.get('/favourites/' + answer_id).then((response) => response.data);
  }

  //deletes a relation with user_id and question_id
  deleteFavouriteRelation(answer_id: number, user_id: number) {
    return axios
      .delete('/user/' + user_id + '/favourites/' + answer_id)
      .then((response) => response.data);
  }
}

const service = new Service();
export default service;
