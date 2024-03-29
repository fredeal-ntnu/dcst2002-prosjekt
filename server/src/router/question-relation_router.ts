import express from 'express';
import { questionRelationService } from '../service/question-relation_service';

const questionRelationRouter = express.Router();

//Get all tags by question id
questionRelationRouter.get(`/questions/:id/tag`, (request, response) => {
  const id = Number(request.params.id);
  questionRelationService
    .getAllTagsByQuestionId(id)
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

//Create new tag_question_relation
questionRelationRouter.post(`/questiontagrelation`, (request, response) => {
  const data = request.body;

  if (data.question_id && data.tag_id)
    questionRelationService
      .createTagQuestionRelation(data.tag_id, data.question_id)
      .then((rows) => response.status(201).send(rows))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing properties');
});

//gets a list of all tag_question_relations
questionRelationRouter.get('/questiontagrelations', (request, response) => {
  questionRelationService
    .getAllTagQuestionRelations()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

// Get all questions by tag id
questionRelationRouter.get(`/tag/:id/questions`, (request, response) => {
  const id = Number(request.params.id);
  questionRelationService
    .getAllQuestionsByTagId(id)
    .then((rows) => {
      response.send(rows);
    })
    .catch((error) => response.status(500).send(error));
});

export default questionRelationRouter;
