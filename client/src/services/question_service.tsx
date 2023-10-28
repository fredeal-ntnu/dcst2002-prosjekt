import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Question = {
  question_id: number;
  title: string;
  text: string;
  view_count: number;
  confirmed_answer: boolean;
};

class TaskService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return axios.get<Question>('/questions/' + id).then((response) => response.data);
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return axios.get<Question[]>('/questions').then((response) => response.data);
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string, description: string) {
    return axios
      .post<{ id: number }>('/tasks', { title: title, description: description})
      .then((response) => response.data.id);
  }

  delete(id: number) {
    return axios.delete('/tasks/' + id).then((response) => response.data)
  }

  update(task: Task) {
    return axios.put('/tasks',task).then((response) => response.data)
  }
}

const taskService = new TaskService();
export default taskService;
