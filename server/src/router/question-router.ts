import express from 'express';
import {questionService} from '../service/question_services';
import {Question_Content} from '../service/question_services'
/**
 * Express router containing task methods.
 */
const questionRouter = express.Router();

//Get all questions
questionRouter.get('/questions', (_request, response) => {
  questionService
    .getAllQuestions()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Get question by id
questionRouter.get('/questions/:id', (request, response) => {
  const id = Number(request.params.id);
  questionService
    .getQuestion(id)
    .then((question) => (question ? response.send(question) : response.status(404).send('Question not found')))
    .catch((error) => response.status(500).send(error));
});

//Get top five questions
questionRouter.get('/topfive', (_request, response) => {
  questionService
    .getTopFiveQuestions()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Create new question
questionRouter.post('/questions', (request, response) => {
  const data = request.body;
  if (
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.text == 'string' &&
    data.text.length != 0
  )
    questionService
      .createQuestion(data.title, data.text, data.view_count, data.confirmed_answer, data.user_name)
      .then((id) => response.send({ id: id}))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing dobbeltsjekk mongo properties');
});

//Delete question
questionRouter.delete('/questions/:id', (request, response) => {
  console.log(Number(request.params.id))
  questionService
    .deleteQuestion(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

//Update question
questionRouter.put('/questions', (request, response) => {
  const data = request.body;
  if (
    typeof data.question_id == 'number' &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.text == 'string'
  ){
    console.log(data);
    questionService
    // .updateQuestion(Question_Content: data.question)
      .updateQuestion({ question_id: data.question_id, title: data.title, text: data.text, view_count: data.view_count, confirmed_answer: data.confirmed_answer, user_name: data.user_name })
      .then(() => response.send())
      .catch((error) => response.status(500).send(error));}
  else response.status(400).send('Missing question properties');
});
export default questionRouter;
