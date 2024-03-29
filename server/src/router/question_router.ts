import express from 'express';
import { questionService } from '../service/question_services';
import { User } from '../service/user_services';
import passport from 'passport';

/**
 * Express router containing task methods.
*/
const questionRouter = express.Router();


//Get all questions
questionRouter.get('/questions', (_request, response) => {
  questionService
    .getAllQuestions()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Get question by answer id
questionRouter.get('/answer/:id/question', (request, response) => {
  const answer_id = Number(request.params.id);
  questionService
    .getQuestionByAnswerId(answer_id)
    .then((question) => response.send(question))
    .catch((error) => response.status(500).send(error));
});


//Get question by id
questionRouter.get('/questions/:id', (request, response) => {
  const id = Number(request.params.id);
  questionService
    .getQuestion(id)
    .then((question) => question ? response.send(question) : response.status(404).send('Question not found'),
    )
    .catch((error) => response.status(500).send(error));
});


//get questions by user id
questionRouter.get('/user/:id/questions', (request, response) => {
  const user_id = Number(request.params.id);
  questionService
    .getQuestionsByUserId(user_id)
    .then((question) => response.send(question))
    .catch((error) => response.status(500).send(error))
});


//Get top five questions for user
questionRouter.get('/user/:id/topfivequestions/', (request, response) => {
  const user_id = Number(request.params.id);
  questionService
    .getUserTopFiveQuestions(user_id)
    .then((question) => response.send(question))
    .catch((error) => response.status(500).send(error));
});

//Get top five questions
questionRouter.get('/topfivequestions', (_request, response) => {
  questionService
    .getTopFiveQuestions()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Get unanswered questions
questionRouter.get('/unansweredquestions', (_request, response) => {
  questionService
    .getUnansweredQuestions()
    .then((question) => response.send(question))
    .catch((error) => response.status(500).send(error));
});

//Get unanswered questions for user
questionRouter.get('/user/:id/unansweredquestions/', (request, response) => {
  const user_id = Number(request.params.id);
  questionService
    .getUserUnansweredQuestions(user_id)
    .then((question) => response.send(question))
    .catch((error) => response.status(500).send(error));
});

//Create new question
questionRouter.post('/questions', passport.authenticate("session", {session: true}), (request, response) => {
  const data = request.body;
  const user:User = request.user as User;

  if (
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.text == 'string' &&
    data.text.length != 0
  )
    questionService
      .createQuestion(data.title, data.text, user.user_id)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing dobbeltsjekk mongo properties');
});

//Delete question
questionRouter.delete('/questions/:id', (request, response) => {
  const id = Number(request.params.id);

  questionService
    .deleteQuestion(id)
    .then(() => response.send())
    .catch((error) => {
      if(error.affectedRows == 0){ 
      response.status(400).send('Question does not exist');
    } else {
      response.status(500).send(error)}});
});

//Update question
questionRouter.put('/questions', (request, response) => {
  const data = request.body;
  if (
    typeof data.question_id == 'number' &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.text == 'string'
  ) {
    questionService
      .updateQuestion({
        question_id: data.question_id,
        title: data.title,
        text: data.text,
        view_count: data.view_count,
        has_answer: data.has_answer,
        user_id: data.user_id,
      })
      .then(() => response.send())
      .catch((error) => response.status(500).send(error));
  } else response.status(400).send('Missing question properties');
});



export default questionRouter;
