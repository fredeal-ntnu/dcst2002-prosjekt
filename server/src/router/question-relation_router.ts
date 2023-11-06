import express from 'express';
import {questionRelationService} from '../service/question-relation_service';

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
questionRelationRouter.post(`/questions/:id`, (request, response) => {
    const data = request.body;

    if (
      typeof data.question_id != null
    )
      questionRelationService
        .createTagQuestionRelation(data.tag_id, data.question_id)
        .catch((error) => response.status(500).send(error));
    else response.status(400).send('Missing asmfamsfsafa properties');
  });

  questionRelationRouter.get('/question/:id', (_request, response) => {
    questionRelationService
      .getAllTagQuestionRelations()
      .then((rows) => response.send(rows))
      .catch((error) => response.status(500).send(error));
  });
  
  export default questionRelationRouter;
