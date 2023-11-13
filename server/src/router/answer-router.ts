import express from 'express';
import { answerService } from '../service/answer_services';

const answerRouter = express.Router();

//Get all answers by question id

answerRouter.get('/questions/:id/answers', (request, response) => {
  const id = Number(request.params.id);
  answerService
    .getAnswersByQuestionId(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Get answer by id

answerRouter.get('/answers/:id', (request, response) => {
  const id = Number(request.params.id);
  answerService
    .getAnswerById(id)
    .then((answer) =>
      answer ? response.send(answer) : response.status(404).send('Answer not found'),
    )
    .catch((error) => response.status(500).send(error));
});

//Create new answer

answerRouter.post('/questions/:id/answers', (request, response) => {
  const data = request.body;
  if (typeof data.text == 'string' && data.text.length != 0)
    answerService
      .createAnswer(data.text, data.question_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing dobbeltsjekk mongo properties');
});

//update answer

answerRouter.put('/answers', (request, response) => {
  const data = request.body;
  if (typeof data.answer_id == 'number' && typeof data.text == 'string' && data.text.length != 0) {
    console.log(data);
    answerService
      .updateAnswer({
        answer_id: data.answer_id,
        text: data.text,
        confirmed_answer: data.confirmed_answer,
        question_id: data.question_id,
      })
      .then(() => response.send())
      .catch((error) => response.status(500).send(error));
  } else response.status(400).send('Missing answer properties');
});

//Delete answer

answerRouter.delete('/answers/:id', (request, response) => {
  const id = Number(request.params.id);

  answerService
    .deleteAnswer(id)
    .then(() => response.send())
    .catch((error) => response.status(500).send('Error deleting answer'));
});

export default answerRouter;
