import express from 'express';
import {answerService} from '../service/answer_services';

const answerRouter = express.Router();

//Get all answerse by question id

answerRouter.get('/questions/:id/answers', (request, response) => {
  const id = Number(request.params.id);
  answerService
    .getAnswersByQuestionId(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});


export default answerRouter;



