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

export type Tag = {
  tag_id: number;
  name: string;
};

export type Tag_Question_Relation = {
  tag_id: number;
  question_id: number;
};



class Service {
 

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

  getAllQuestionsByTagId(tag: number) {
    return axios.get('/tag/' + tag + '/questions').then((response) => response.data);
  }

  //get all tags for a question by question id
  getTagsForQuestion(id: number) {
    return axios.get('/questions/' + id + '/tags').then((response) => response.data);
  }

  getAllTagQuestionRelations() {
    return axios.get('/question/:id').then((response) => response.data);
  }


}

const tagService = new Service();
export default tagService;
