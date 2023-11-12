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

answerRouter.post('/questions/:id/answers', (request, response) => {
    const data = request.body;
    if (
        typeof data.text == 'string' &&
        data.text.length != 0
    )
        answerService
        .createAnswer(data.text, data.question_id)
        .then((id) => response.send({ id: id}))
        .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing dobbeltsjekk mongo properties');
});   

export default answerRouter;



