import express from 'express';
import { answerCommentService } from '../service/answer-comment_services';

const answerCommentRouter = express.Router();

// Get all answer comments by answer id

answerCommentRouter.get(
  '/questions/:questionId/answers/:answerId/comments',
  (request, response) => {
    const answerId = Number(request.params.answerId);
    answerCommentService
      .getAnswerCommentByAnswerId(answerId)
      .then((rows) => response.send(rows))
      .catch((error) => response.status(500).send(error));
  },
);

//create new answer comment

answerCommentRouter.post(
  '/questions/:questionId/answers/:answerId/comments',
  (request, response) => {
    const data = request.body;
    if (typeof data.text == 'string' && data.text.length != 0)
      answerCommentService
        .createAnswerComment(data.text, data.answer_id)
        .then((id) => response.send({ id: id }))
        .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing answer comment router 400');
  },
);

// Delete answer comment

answerCommentRouter.delete(
  '/questions/:questionId/answers/:answerId/comments/:commentId',
  (request, response) => {
    const commentId = Number(request.params.commentId);
    answerCommentService
      .deleteAnswerComment(commentId)
      .then((rows) => response.send(rows))
      .catch((error) => response.status(500).send(error));
  },
);

// Update answer comment

answerCommentRouter.put(
  '/questions/:questionId/answers/:answerId/comments/:commentId',
  (request, response) => {
    const data = request.body;
    if (typeof data.text == 'string' && data.text.length != 0)
      answerCommentService
        .updateAnswerComment(data.text, Number(data.answer_comment_id))
        .then((id) => response.send({ id: id }))
        .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing answer comment router 400');
  },
);

export default answerCommentRouter;
