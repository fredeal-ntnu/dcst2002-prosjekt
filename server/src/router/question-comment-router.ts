import express from 'express';
import { questionCommentService } from '../service/question-comment_services';

const questionCommentRouter = express.Router();

//Get all question comments by question id

questionCommentRouter.get('/questions/:questionId/comments', (request, response) => {
  const questionId = Number(request.params.questionId);
  questionCommentService
    .getQuestionCommentByQuestionId(questionId)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Create new question comment

questionCommentRouter.post('/questions/:questionId/comments', (request, response) => {
  const data = request.body;
  if (typeof data.text == 'string' && data.text.length != 0)
    questionCommentService
      .createQuestionComment(data.text, data.question_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing question comment router 400');
});

//Delete question comment

questionCommentRouter.delete('/questions/:questionId/comments/:commentId', (request, response) => {
  const commentId = Number(request.params.commentId);
  questionCommentService
    .deleteQuestionComment(commentId)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Update question comment

questionCommentRouter.put('/questions/:questionId/comments/:commentId', (request, response) => {
  const data = request.body;
  if (typeof data.text == 'string' && data.text.length != 0)
    questionCommentService
      .updateQuestionComment(data.text, Number(data.question_comment_id))
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing question comment router 400');
});

export default questionCommentRouter;