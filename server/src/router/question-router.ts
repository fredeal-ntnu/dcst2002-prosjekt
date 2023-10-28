import express from 'express';
import {questionService} from '../service/question_services';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get('/questions', (_request, response) => {
  questionService
    .getAllQuestions()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/questions/:id', (request, response) => {
  const id = Number(request.params.id);
  questionService
    .getQuestion(id)
    .then((question) => (question ? response.send(question) : response.status(404).send('Question not found')))
    .catch((error) => response.status(500).send(error));
});

// Example request body: { title: "Ny oppgave" }
// Example response body: { id: 4 }
    
router.post('/questions', (request, response) => {
  const data = request.body;
  if (
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.text == 'string' &&
    data.text.length != 0 &&
    typeof data.views  == 'number' &&
    data.views == 0 &&
    typeof data.confirmed_answer == 'boolean' &&
    data.confirmed_answer == 0
  
  )
    questionService
      .createQuestion(data.title, data.text)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing question title');
});

router.delete('/questions/:id', (request, response) => {
  questionService
    .deleteQuestion(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

router.put('/tasks', (request, response) => {
  const data = request.body;
  if (
    typeof data.id == 'number' &&
    typeof data.title == 'string' &&
    data.title.length  != 0 &&
    typeof data.text == 'string' &&
    data.text.length ! == 0
  )
    questionService
      .updateQuestion({ question_id: data.id, title: data.title, text: data.text, confirmed_answer: data.confirmed_answer, views: data.views})
      .then(() => response.send())
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing task properties');
});

export default router;
