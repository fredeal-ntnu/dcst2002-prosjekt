import express from 'express';
import { answerService } from '../service/answer_services';

const answerRouter = express.Router();

//Gets vote scores for answers to a specific question

answerRouter.get('/questions/:id/answer/votes', (request, response) => {
  const id = Number(request.params.id);
  answerService
    .getAnswerScoresByQuestionId(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});


//Get all favourite answers by user id
answerRouter.get('/user/:id/favourites', (request, response) => {
  const id = Number(request.params.id);
  answerService
  .getAllFavouriteAnswersByUserId(id)
  .then((rows) => response.send(rows))
  .catch((error) => response.status(500).send(error));
});

//Get answer by answer id
answerRouter.get('/answers/:id', (request, response) => {
  const id = Number(request.params.id);
  answerService
    .getAnswerById(id)
    .then((answer) => response.send(answer))
    .catch((error) => response.status(500).send(error));
});

//Get answers by question id
//BRUKES IKKE ATM, SE KOMMENTAR I SERVICE PÅ CLIENT SIDE.
answerRouter.get('/questions/:id/answers', (request, response) => {
  const questionId = Number(request.params.id);
  
  answerService
  .getAnswersByQuestionId(questionId)
  .then((rows) => response.send(rows))
  .catch((error) => response.status(500).send(error))
  
});

//Create new answer
// testes av answer.test.ts
answerRouter.post('/questions/:id/answers', (request, response) => {
  const data = request.body;
  if (typeof data.text == 'string' && data.text.length != 0)
    answerService
      .createAnswer(data.text, data.question_id,data.user_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing required properties');
});

//update answer

answerRouter.put('/answers', (request, response) => {
  const data = request.body;
  if (typeof data.answer_id == 'number' && typeof data.text == 'string' && data.text.length != 0) {
    answerService
      .updateAnswer({
        answer_id: data.answer_id,
        text: data.text,
        confirmed_answer: data.confirmed_answer,
        last_updated: data.last_updated,
        question_id: data.question_id,
        user_id: data.user_id,
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
