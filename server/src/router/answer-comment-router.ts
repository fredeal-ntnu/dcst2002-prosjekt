import express from 'express';
import { answerCommentService } from '../service/answer-comment_services';

const answerCommentRouter = express.Router();

// Get all answer comments by answer id

answerCommentRouter.get(
  '/answers/:id/comments',
  (request, response) => {
    const answerId = Number(request.params.id);
    answerCommentService
      .getAnswerCommentsByAnswerId(answerId)
      .then((rows) => response.send(rows))
      .catch((error) => response.status(500).send(error));
  },
);

//create new answer comment

answerCommentRouter.post('/answers/:id/comments', (request, response) => {
  const data = request.body;
  if (typeof data.text == 'string' && data.text.length != 0)
    answerCommentService
      .createAnswerComment(data.text, data.answer_id, data.user_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing answer comment properties');
});











//Get answer comment by id

answerCommentRouter.get('/answer/comments/:id', (request, response) => {
  const commentId = Number(request.params.id);
  answerCommentService
    .getAnswerCommentById(commentId)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
})












//Delete answer comment

answerCommentRouter.delete('/answer/comments/:id', (request, response) => {
  const commentId = Number(request.params.id);
  answerCommentService
    .deleteAnswerComment(commentId)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Update answer comment

answerCommentRouter.put('/answers/:id/comments/:id', (request, response) => {
  const data = request.body;
    answerCommentService
      .updateAnswerComment(data)
      .then(() => response.send())
      .catch((error) => response.status(500).send(error));
 
});



export default answerCommentRouter;
