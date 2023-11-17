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
      .createQuestionComment(data.text, data.question_id,data.user_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing question comment router 400');
});

//Delete question comment

questionCommentRouter.delete('/comments/:id', (request, response) => {
  const commentId = Number(request.params.id);
  questionCommentService
    .deleteQuestionComment(commentId)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Update question comment

questionCommentRouter.put('/comments', (request, response) => {
  const data = request.body;
    questionCommentService
      .updateQuestionComment({question_comment_id: data.question_comment_id, text: data.text, question_id: data.question_id, user_id: data.user_id})
      .then(() => response.send())
      .catch((error) => response.status(500).send(error));
 
});

//Get question comment by id

questionCommentRouter.get('/comments/:id', (request, response) => {
  const commentId = Number(request.params.id);
  questionCommentService
    .getQuestionCommentById(commentId)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
})

export default questionCommentRouter;
