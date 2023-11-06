import express from 'express';
import {questionService} from '../service/question_services';

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
      .createQuestion(data.title, data.text,data.confirmed_answer, data.view_count, data.user_id)
      .then((id) => response.send({ id: id}))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing dobbeltsjekk mongo properties');
});

//Delete question
questionRouter.delete('/questions/:id', (request, response) => {
  questionService
    .deleteQuestion(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

//Update question
questionRouter.put('/questions', (request, response) => {
  const data = request.body;
  if (
    typeof data.id == 'number' &&
    typeof data.title == 'string' &&
    data.title.length  != 0 &&
    typeof data.text == 'string' &&
    data.text.length ! == 0
  )
    questionService
      .updateQuestion({ question_id: data.id, title: data.title, text: data.text, confirmed_answer: data.confirmed_answer, view_count: data.views, user_id: data.user_id})
      .then(() => response.send())
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing task properties');
});



export default questionRouter;
