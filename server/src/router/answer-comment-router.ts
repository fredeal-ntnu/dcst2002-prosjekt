import express from 'express';
import { answerCommentService } from '../service/answer-comment_services';

const answerCommentRouter = express.Router();

// Get all answer comments by answer id

answerCommentRouter.get(
  '/answers/:id/comments',
  (request, response) => {
    const answerId = Number(request.params.id);
    answerCommentService
      .getAnswerCommentByAnswerId(answerId)
      .then((rows) => response.send(rows))
      .catch((error) => response.status(500).send(error));
  },
);

//create new answer comment

answerCommentRouter.post('/answers/:id/comments', (request, response) => {
  const data = request.body;
  if (typeof data.text == 'string' && data.text.length != 0)
    answerCommentService
      .createAnswerComment(data.text, data.answer_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing answer comment properties');
});



export default answerCommentRouter;
